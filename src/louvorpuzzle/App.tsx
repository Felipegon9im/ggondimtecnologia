import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Song, DifficultyLevel, GameModeType, UserStats, SongProgress, FloatingCard, LyricPhrase } from './types';
import { storageService } from './services/storageService';
import { DISTRACTOR_POOL } from './services/defaultSongs';

import { Navbar } from './components/Navbar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PhraseBoard } from './components/PhraseBoard';
import { DropZone } from './components/DropZone';
import { CompletedLyricsList } from './components/CompletedLyricsList';
import { LyricPasteCard } from './components/LyricPasteCard';

import { SongLibraryModal } from './components/SongLibraryModal';
import { NewSongModal } from './components/NewSongModal';
import { AiSongModal } from './components/AiSongModal';
import { SyncEditorModal } from './components/SyncEditorModal';
import { MemorizationSettingsModal } from './components/MemorizationSettingsModal';
import { VictoryModal } from './components/VictoryModal';
import { StatsModal } from './components/StatsModal';

export const App: React.FC = () => {
  const [viewState, setViewState] = useState<'WELCOME' | 'PLAYING'>('WELCOME');

  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, SongProgress>>({});

  const [difficulty, setDifficulty] = useState<DifficultyLevel>('NORMAL');
  const [gameMode, setGameMode] = useState<GameModeType>('STANDARD');
  const [userStats, setUserStats] = useState<UserStats>(storageService.getUserStats());

  const [currentTime] = useState<number>(0);
  const [duration] = useState<number>(180);

  const [currentPhraseIdx, setCurrentPhraseIdx] = useState<number>(0);
  const [completedPhrases, setCompletedPhrases] = useState<LyricPhrase[]>([]);
  const [streakCombo, setStreakCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [sessionXp, setSessionXp] = useState<number>(0);
  const [totalAcertos, setTotalAcertos] = useState<number>(0);
  const [totalErros, setTotalErros] = useState<number>(0);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'SUCCESS' | 'WRONG' } | null>(null);
  const [dropZoneRect, setDropZoneRect] = useState<DOMRect | null>(null);

  const [showLibraryModal, setShowLibraryModal] = useState<boolean>(false);
  const [showNewSongModal, setShowNewSongModal] = useState<boolean>(false);
  const [showAiSongModal, setShowAiSongModal] = useState<boolean>(false);
  const [showSyncEditorModal, setShowSyncEditorModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [showStatsModal, setShowStatsModal] = useState<boolean>(false);

  const handleUpdateDropZoneRect = useCallback((rect: DOMRect) => {
    setDropZoneRect(prev => {
      if (!prev || prev.top !== rect.top || prev.left !== rect.left || prev.width !== rect.width || prev.height !== rect.height) {
        return rect;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const loadedSongs = storageService.getAllSongs();
    setAllSongs(loadedSongs);
    if (loadedSongs.length > 0) {
      setActiveSong(loadedSongs[0]);
    }
    setProgressMap(storageService.getAllProgress());
  }, []);

  const phraseBoardCards = useMemo(() => {
    if (!activeSong) return [];

    const expectedPhrase = activeSong.phrases[currentPhraseIdx];
    if (!expectedPhrase) return [];

    const remainingPhrases = activeSong.phrases.filter(p => !completedPhrases.some(cp => cp.id === p.id));

    const getDisplayText = (p: LyricPhrase) => {
      if (gameMode === 'MEMORIZATION' && p.clozeText) return p.clozeText;
      return p.text;
    };

    const mainCards: FloatingCard[] = remainingPhrases.map(p => ({
      id: `card-${p.id}`,
      phraseId: p.id,
      text: p.text,
      displayText: getDisplayText(p),
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      angle: 0,
      vAngle: 0,
      width: 200,
      height: 54,
      isDragging: false,
      status: 'IDLE'
    }));

    let numDistractors = 2;
    if (difficulty === 'EASY') numDistractors = 1;
    if (difficulty === 'HARD') numDistractors = 4;

    const distractorCards: FloatingCard[] = DISTRACTOR_POOL.slice(0, numDistractors).map((dText, idx) => ({
      id: `distractor-${idx}`,
      phraseId: `dist-id-${idx}`,
      text: dText,
      displayText: dText,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      angle: 0,
      vAngle: 0,
      width: 200,
      height: 54,
      isDragging: false,
      status: 'IDLE',
      isDistractor: true
    }));

    const combined = [...mainCards, ...distractorCards];
    return combined.sort(() => Math.sin(combined.length * 1.5) - 0.5);
  }, [activeSong, currentPhraseIdx, completedPhrases, difficulty, gameMode]);

  const handleDropMatch = (_card: FloatingCard, isCorrect: boolean) => {
    if (isCorrect && activeSong) {
      const currentPhrase = activeSong.phrases[currentPhraseIdx];
      if (currentPhrase && !completedPhrases.some(p => p.id === currentPhrase.id)) {
        const newCompleted = [...completedPhrases, currentPhrase];
        setCompletedPhrases(newCompleted);

        const newStreak = streakCombo + 1;
        setStreakCombo(newStreak);
        setMaxCombo(prev => Math.max(prev, newStreak));

        const basePoint = 10;
        const streakBonus = Math.min(20, newStreak * 2);
        const gainedXp = basePoint + streakBonus;

        setSessionXp(prev => prev + gainedXp);
        setTotalAcertos(prev => prev + 1);

        const updatedStats: UserStats = {
          ...userStats,
          xp: userStats.xp + gainedXp,
          totalAcertos: userStats.totalAcertos + 1,
          currentStreak: newStreak,
          bestStreak: Math.max(userStats.bestStreak, newStreak)
        };
        setUserStats(updatedStats);
        storageService.saveUserStats(updatedStats);

        setFeedbackMessage({ text: newStreak >= 5 ? `🔥 COMBO ${newStreak}x INCRÍVEL!` : '🟩 PERFEITO! +15 XP', type: 'SUCCESS' });
        setTimeout(() => setFeedbackMessage(null), 1800);

        if (newCompleted.length >= activeSong.phrases.length) {
          setTimeout(() => handleSongVictory(), 600);
        } else {
          setCurrentPhraseIdx(prev => prev + 1);
        }
      }
    } else {
      setStreakCombo(0);
      setTotalErros(prev => prev + 1);

      const updatedStats: UserStats = {
        ...userStats,
        totalErros: userStats.totalErros + 1,
        currentStreak: 0
      };
      setUserStats(updatedStats);
      storageService.saveUserStats(updatedStats);

      setFeedbackMessage({ text: 'Ainda não! Procure a frase correta.', type: 'WRONG' });
      setTimeout(() => setFeedbackMessage(null), 1800);
    }
  };

  const handleSongVictory = () => {
    if (!activeSong) return;

    const total = activeSong.phrases.length;
    const accuracy = Math.round((total / Math.max(1, totalAcertos + totalErros)) * 100);

    const songProg: SongProgress = {
      songId: activeSong.id,
      completed: true,
      bestXp: sessionXp,
      bestCombo: maxCombo,
      accuracy,
      playCount: 1,
      lastPlayedAt: new Date().toISOString()
    };

    storageService.saveSongProgress(songProg);
    setProgressMap(storageService.getAllProgress());

    const updatedUser: UserStats = {
      ...userStats,
      totalSongsCompleted: userStats.totalSongsCompleted + 1
    };
    setUserStats(updatedUser);
    storageService.saveUserStats(updatedUser);

    setShowVictoryModal(true);
  };

  const resetGameSession = () => {
    setCurrentPhraseIdx(0);
    setCompletedPhrases([]);
    setStreakCombo(0);
    setMaxCombo(0);
    setSessionXp(0);
    setTotalAcertos(0);
    setTotalErros(0);
  };

  const formatTimeStr = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalPhrases = activeSong?.phrases.length || 1;
  const progressPercent = (completedPhrases.length / totalPhrases) * 100;
  const currentExpectedText = activeSong?.phrases[currentPhraseIdx]?.text || 'Tu és Santo';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-main flex flex-col selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden">
      <Navbar
        songTitle={activeSong?.title || 'Louvor'}
        currentTimeFormatted={formatTimeStr(currentTime)}
        durationFormatted={formatTimeStr(duration)}
        streakCombo={streakCombo}
        xp={userStats.xp}
        progressPercent={progressPercent}
        onOpenLibrary={() => setShowLibraryModal(true)}
        onOpenAiSearch={() => setShowAiSongModal(true)}
        onOpenSettings={() => setShowSettingsModal(true)}
        onOpenStats={() => setShowStatsModal(true)}
        onOpenSyncEditor={() => setShowSyncEditorModal(true)}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 flex flex-col gap-5 justify-between">
        {viewState === 'WELCOME' ? (
          <WelcomeScreen
            onStartGame={() => {
              resetGameSession();
              setViewState('PLAYING');
            }}
            onOpenLibrary={() => setShowLibraryModal(true)}
            onOpenStats={() => setShowStatsModal(true)}
            onOpenSettings={() => setShowSettingsModal(true)}
          />
        ) : (
          <>
            {/* Inline Lyric Paste Card (Replaces the big Audio Player) */}
            <LyricPasteCard
              currentSongTitle={activeSong?.title || 'Santo Pra Sempre'}
              onApplyLyrics={newSong => {
                setAllSongs(storageService.getAllSongs());
                setActiveSong(newSong);
                resetGameSession();
              }}
            />

            <CompletedLyricsList
              completedPhrases={completedPhrases}
              currentPhraseIndex={currentPhraseIdx}
              totalPhrases={totalPhrases}
            />

            {/* Static Phrase Board (Quadro Estático de Peças) */}
            <PhraseBoard
              cards={phraseBoardCards}
              targetPhraseId={activeSong?.phrases[currentPhraseIdx]?.id || ''}
              difficulty={difficulty}
              dropZoneRect={dropZoneRect}
              onDropMatch={handleDropMatch}
            />

            <DropZone
              currentPhraseIndex={currentPhraseIdx}
              totalPhrases={totalPhrases}
              expectedTextHint={gameMode === 'MEMORIZATION' ? '???' : currentExpectedText}
              gameMode={gameMode}
              feedbackMessage={feedbackMessage}
              onUpdateRect={handleUpdateDropZoneRect}
            />
          </>
        )}
      </main>

      {showLibraryModal && (
        <SongLibraryModal
          songs={allSongs}
          activeSongId={activeSong?.id || ''}
          progressMap={progressMap}
          onSelectSong={song => {
            setActiveSong(song);
            resetGameSession();
            setViewState('PLAYING');
          }}
          onOpenNewSongModal={() => setShowNewSongModal(true)}
          onClose={() => setShowLibraryModal(false)}
        />
      )}

      {showNewSongModal && (
        <NewSongModal
          onSongCreated={newSong => {
            setAllSongs(storageService.getAllSongs());
            setActiveSong(newSong);
            resetGameSession();
            setViewState('PLAYING');
          }}
          onClose={() => setShowNewSongModal(false)}
        />
      )}

      {showAiSongModal && (
        <AiSongModal
          onSongGenerated={aiSong => {
            setAllSongs(storageService.getAllSongs());
            setActiveSong(aiSong);
            resetGameSession();
            setViewState('PLAYING');
          }}
          onClose={() => setShowAiSongModal(false)}
        />
      )}

      {showSyncEditorModal && activeSong && (
        <SyncEditorModal
          song={activeSong}
          onSongUpdated={updated => {
            setActiveSong(updated);
            setAllSongs(storageService.getAllSongs());
          }}
          onClose={() => setShowSyncEditorModal(false)}
        />
      )}

      {showSettingsModal && (
        <MemorizationSettingsModal
          difficulty={difficulty}
          gameMode={gameMode}
          onChangeDifficulty={setDifficulty}
          onChangeGameMode={setGameMode}
          onClose={() => setShowSettingsModal(false)}
        />
      )}

      {showVictoryModal && activeSong && (
        <VictoryModal
          songTitle={activeSong.title}
          xpEarned={sessionXp}
          accuracy={Math.round((totalPhrases / Math.max(1, totalAcertos + totalErros)) * 100)}
          maxCombo={maxCombo}
          totalAcertos={totalAcertos}
          totalErros={totalErros}
          onReplay={() => {
            setShowVictoryModal(false);
            resetGameSession();
          }}
          onOpenLibrary={() => {
            setShowVictoryModal(false);
            setShowLibraryModal(true);
          }}
        />
      )}

      {showStatsModal && (
        <StatsModal
          stats={userStats}
          onClose={() => setShowStatsModal(false)}
        />
      )}
    </div>
  );
};
