import React, { useState, useEffect } from 'react';
import type { UserProfile, AppViewMode, AppLanguage, Devotional, LevelInfo, DuolingoLesson } from './types';
import { StorageService } from './services/storageService';
import { Navbar } from './components/Navbar';
import { OnboardingModal } from './components/OnboardingModal';
import { FeedView } from './components/FeedView';
import { DuolingoPathView } from './components/DuolingoPathView';
import { BibleReader } from './components/BibleReader';
import { QuizModal } from './components/QuizModal';
import { DuolingoQuizModal } from './components/DuolingoQuizModal';
import { ImpactPanel } from './components/ImpactPanel';
import { EarlyAccessModal } from './components/EarlyAccessModal';
import { BadgesModal } from './components/BadgesModal';
import { ShopModal } from './components/ShopModal';
import { QuestsModal } from './components/QuestsModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import './App.css';

export const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(StorageService.loadProfile());
  const [viewMode, setViewMode] = useState<AppViewMode>('FEED');
  const [activeQuizDevotional, setActiveQuizDevotional] = useState<Devotional | null>(null);
  const [activeDuolingoLesson, setActiveDuolingoLesson] = useState<DuolingoLesson | null>(null);
  const [earlyAccessLevel, setEarlyAccessLevel] = useState<LevelInfo | null>(null);
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
        {viewMode === 'FEED' && (
          <FeedView
            profile={profile}
            onSaveProfile={handleSaveProfile}
            onOpenQuiz={(dev) => setActiveQuizDevotional(dev)}
            onGoToBible={() => setViewMode('BIBLE')}
            onGoToMap={() => setViewMode('MAP')}
          />
        )}

        {viewMode === 'MAP' && (
          <DuolingoPathView
            profile={profile}
            onSaveProfile={handleSaveProfile}
            onStartLesson={(lesson) => setActiveDuolingoLesson(lesson)}
            onOpenShop={() => setIsShopOpen(true)}
          />
        )}

        {viewMode === 'BIBLE' && (
          <BibleReader
            profile={profile}
            onSaveProfile={handleSaveProfile}
          />
        )}

        {viewMode === 'IMPACT' && (
          <ImpactPanel
            profile={profile}
          />
        )}
      </main>

      {/* Duolingo Quiz Modal for Path Lessons */}
      {activeDuolingoLesson && (
        <DuolingoQuizModal
          lesson={activeDuolingoLesson}
          profile={profile}
          onSaveProfile={handleSaveProfile}
          onClose={() => setActiveDuolingoLesson(null)}
          onOpenShop={() => setIsShopOpen(true)}
        />
      )}

      {/* Devotional Quiz Modal */}
      {activeQuizDevotional && (
        <QuizModal
          devotional={activeQuizDevotional}
          profile={profile}
          onSaveProfile={handleSaveProfile}
          onClose={() => setActiveQuizDevotional(null)}
        />
      )}

      {/* Early Access Modal */}
      {earlyAccessLevel && (
        <EarlyAccessModal
          level={earlyAccessLevel}
          profile={profile}
          onSaveProfile={handleSaveProfile}
          onClose={() => setEarlyAccessLevel(null)}
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
        <p>Jornada da Palavra &copy; 2026 G&G Tecnologia — Uma jornada diária de crescimento na Palavra.</p>
        <a href="/" style={{ color: '#fbbf24', textDecoration: 'none', marginTop: 6, display: 'inline-block' }}>
          &larr; Voltar ao site principal (ggondimtecnologia.com.br)
        </a>
      </footer>
    </div>
  );
};
