import React, { useState, useEffect } from 'react';
import type { UserProfile, AppViewMode, AppLanguage, BibleTerritory, RankingShiftInfo } from './types';
import { StorageService } from './services/storageService';
import { BibleJourneyService, BIBLE_TERRITORIES } from './services/bibleJourneyService';
import { audioService } from './services/audioService';
import { Navbar } from './components/Navbar';
import { OnboardingModal } from './components/OnboardingModal';
import { BibleJourneyPathView } from './components/BibleJourneyPathView';
import { BibleReader } from './components/BibleReader';
import { ChapterStudyModal } from './components/ChapterStudyModal';
import { ChapterCelebrationModal } from './components/ChapterCelebrationModal';
import { BookCompletionModal } from './components/BookCompletionModal';
import { ShopModal } from './components/ShopModal';
import { QuestsModal } from './components/QuestsModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { BadgesModal } from './components/BadgesModal';
import './App.css';

export const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(StorageService.loadProfile());
  const [viewMode, setViewMode] = useState<AppViewMode>('JOURNEY_PATH');

  // Study Modal state
  const [activeChapterStudy, setActiveChapterStudy] = useState<{ bookId: string; chapterNum: number } | null>(null);
  
  // Celebration Modals state
  const [celebrationData, setCelebrationData] = useState<{
    bookName: string;
    chapterNum: number;
    xpGained: number;
    quizCorrect: boolean;
    rankingShift: RankingShiftInfo;
  } | null>(null);

  const [bookCompletionTerritory, setBookCompletionTerritory] = useState<BibleTerritory | null>(null);

  // General Modals
  const [isBadgesOpen, setIsBadgesOpen] = useState<boolean>(false);
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const [isQuestsOpen, setIsQuestsOpen] = useState<boolean>(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [pwaDeferredPrompt, setPwaDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setPwaDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallPWA = () => {
    if (pwaDeferredPrompt) {
      pwaDeferredPrompt.prompt();
      pwaDeferredPrompt.userChoice.then(() => setPwaDeferredPrompt(null));
    }
  };

  const handleSaveProfile = (updated: UserProfile) => {
    setProfile(updated);
    StorageService.saveProfile(updated);
  };

  const handleChangeLanguage = (lang: AppLanguage) => {
    const updated = { ...profile, language: lang };
    handleSaveProfile(updated);
  };

  const handleOpenChapter = (bookId: string, chapterNum: number) => {
    setActiveChapterStudy({ bookId, chapterNum });
  };

  const handleCompleteChapter = (bookId: string, chapterNum: number, quizCorrect: boolean) => {
    setActiveChapterStudy(null);

    const territory = BIBLE_TERRITORIES.find(t => t.id.toLowerCase() === bookId.toLowerCase()) || BIBLE_TERRITORIES[0];
    const chapterKey = BibleJourneyService.getChapterKey(bookId, chapterNum);

    const prevXP = profile.stats.xp;
    const prevRank = profile.stats.currentRank || 7;

    const gainedXP = 20 + (quizCorrect ? 10 : 0);
    const updated = { ...profile };

    if (!updated.stats.completedChapterKeys.includes(chapterKey)) {
      updated.stats.completedChapterKeys.push(chapterKey);
    }

    // Advance active chapter to the next sequential chapter
    if (chapterNum < territory.chaptersCount) {
      updated.stats.currentBookId = territory.id;
      updated.stats.currentChapterNum = chapterNum + 1;
    } else {
      const tIdx = BIBLE_TERRITORIES.findIndex(t => t.id === territory.id);
      if (tIdx >= 0 && tIdx < BIBLE_TERRITORIES.length - 1) {
        const nextTerritory = BIBLE_TERRITORIES[tIdx + 1];
        updated.stats.currentBookId = nextTerritory.id;
        updated.stats.currentChapterNum = 1;
      }
    }

    updated.stats.xp += gainedXP;
    updated.stats.dailyXP += gainedXP;
    updated.stats.readToday = true;

    // Update quest progress
    const q1 = updated.quests.find(q => q.id === 'q1');
    if (q1 && !q1.completed) {
      q1.current += gainedXP;
      if (q1.current >= q1.target) q1.completed = true;
    }

    const q2 = updated.quests.find(q => q.id === 'q2');
    if (q2 && !q2.completed) {
      q2.current = 1;
      q2.completed = true;
    }

    // Calculate ranking shift & league update
    const shiftInfo = BibleJourneyService.calculateRankingShift(prevXP, updated.stats.xp, prevRank);
    updated.stats.currentRank = shiftInfo.newRank;
    const newLeague = BibleJourneyService.getLeagueTier(updated.stats.xp);
    updated.stats.currentLeagueId = newLeague.id;

    handleSaveProfile(updated);

    // Check if book was completed with this chapter
    let completedInBook = 0;
    for (let ch = 1; ch <= territory.chaptersCount; ch++) {
      const key = BibleJourneyService.getChapterKey(territory.id, ch);
      if (updated.stats.completedChapterKeys.includes(key)) completedInBook++;
    }

    audioService.playHarpChime();

    if (completedInBook >= territory.chaptersCount && chapterNum === territory.chaptersCount) {
      setBookCompletionTerritory(territory);
    } else {
      setCelebrationData({
        bookName: territory.name,
        chapterNum,
        xpGained: gainedXP,
        quizCorrect,
        rankingShift: shiftInfo
      });
    }
  };

  const handleClaimBookChest = (territory: BibleTerritory) => {
    audioService.playLevelUp();
    const updated = { ...profile };
    if (!updated.stats.claimedChestBookIds) updated.stats.claimedChestBookIds = [];

    if (!updated.stats.claimedChestBookIds.includes(territory.id)) {
      updated.stats.claimedChestBookIds.push(territory.id);
      updated.stats.xp += 200;
      handleSaveProfile(updated);
      setBookCompletionTerritory(territory);
    }
  };

  return (
    <div className="app-container">
      {/* Onboarding Dialog if not completed */}
      {!profile.hasOnboarded && (
        <OnboardingModal
          initialProfile={profile}
          onComplete={handleSaveProfile}
        />
      )}

      {/* Top Navbar Header */}
      <Navbar
        profile={profile}
        currentMode={viewMode}
        setMode={setViewMode}
        onChangeLanguage={handleChangeLanguage}
        onOpenBadges={() => setIsBadgesOpen(true)}
        onOpenShop={() => setIsShopOpen(true)}
        onOpenQuests={() => setIsQuestsOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        pwaDeferredPrompt={pwaDeferredPrompt}
        onInstallPwa={handleInstallPWA}
      />

      {/* Main Content Body */}
      <main className="main-content">
        {viewMode === 'JOURNEY_PATH' && (
          <BibleJourneyPathView
            profile={profile}
            onOpenChapter={handleOpenChapter}
            onClaimBookChest={handleClaimBookChest}
            onOpenShop={() => setIsShopOpen(true)}
          />
        )}

        {viewMode === 'BIBLE_READER' && (
          <BibleReader
            profile={profile}
            onSaveProfile={handleSaveProfile}
          />
        )}
      </main>

      {/* Chapter Study Modal */}
      {activeChapterStudy && (
        <ChapterStudyModal
          bookId={activeChapterStudy.bookId}
          chapterNum={activeChapterStudy.chapterNum}
          onCompleteChapter={handleCompleteChapter}
          onClose={() => setActiveChapterStudy(null)}
        />
      )}

      {/* Chapter Completion Celebration Modal with Ranking Shift */}
      {celebrationData && (
        <ChapterCelebrationModal
          bookName={celebrationData.bookName}
          chapterNum={celebrationData.chapterNum}
          xpGained={celebrationData.xpGained}
          quizCorrect={celebrationData.quizCorrect}
          rankingShift={celebrationData.rankingShift}
          onClose={() => setCelebrationData(null)}
        />
      )}

      {/* Book Completion Celebration Modal */}
      {bookCompletionTerritory && (
        <BookCompletionModal
          territory={bookCompletionTerritory}
          onClose={() => setBookCompletionTerritory(null)}
        />
      )}

      {/* Badges Modal */}
      {isBadgesOpen && (
        <BadgesModal
          badges={profile.badges}
          onClose={() => setIsBadgesOpen(false)}
        />
      )}

      {/* Shop Modal */}
      {isShopOpen && (
        <ShopModal
          profile={profile}
          onSaveProfile={handleSaveProfile}
          onClose={() => setIsShopOpen(false)}
        />
      )}

      {/* Quests Modal */}
      {isQuestsOpen && (
        <QuestsModal
          profile={profile}
          onSaveProfile={handleSaveProfile}
          onClose={() => setIsQuestsOpen(false)}
        />
      )}

      {/* Leaderboard Modal */}
      {isLeaderboardOpen && (
        <LeaderboardModal
          profile={profile}
          onClose={() => setIsLeaderboardOpen(false)}
        />
      )}

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '24px 16px',
        color: '#6b7280',
        fontSize: '0.85rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        marginTop: 'auto'
      }}>
        <p>Jornada Bíblica &copy; 2026 G&G Tecnologia — Uma jornada diária através de toda a Bíblia Sagrada.</p>
        <a href="/" style={{ color: '#fbbf24', textDecoration: 'none', marginTop: 6, display: 'inline-block' }}>
          &larr; Voltar ao site principal (ggondimtecnologia.com.br)
        </a>
      </footer>
    </div>
  );
};
