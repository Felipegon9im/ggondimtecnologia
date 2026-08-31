import React, { useState, useEffect } from 'react';
import type { UserProgress, AppViewMode, Module, Lesson } from './types';
import { StorageService } from './services/storageService';
import { MODULES } from './data/modulesData';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { PathView } from './components/PathView';
import { LessonModal } from './components/LessonModal';
import { SpeedTrainMode } from './components/SpeedTrainMode';
import { ExamMode } from './components/ExamMode';
import { TruthTableTool } from './components/TruthTableTool';
import { DiagramTool } from './components/DiagramTool';
import { SRSReviewMode } from './components/SRSReviewMode';
import { BadgesModal } from './components/BadgesModal';
import './App.css';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(StorageService.loadProgress());
  const [viewMode, setViewMode] = useState<AppViewMode>('DASHBOARD');
  const [activeLesson, setActiveLesson] = useState<{ module: Module; lesson: Lesson } | null>(null);
  const [isBadgesOpen, setIsBadgesOpen] = useState<boolean>(false);
  const [pwaDeferredPrompt, setPwaDeferredPrompt] = useState<any>(null);

  // Listen for PWA Install prompt
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

  const handleSaveProgress = (updated: UserProgress) => {
    if (updated.stats.questionsAnswered >= 1) {
      const badge = updated.badges.find(b => b.id === 'first_step');
      if (badge && !badge.unlocked) badge.unlocked = true;
    }
    if (updated.stats.streakDays >= 3) {
      const badge = updated.badges.find(b => b.id === 'streak_3');
      if (badge && !badge.unlocked) badge.unlocked = true;
    }
    if (updated.stats.streakDays >= 7) {
      const badge = updated.badges.find(b => b.id === 'streak_7');
      if (badge && !badge.unlocked) badge.unlocked = true;
    }

    setProgress(updated);
    StorageService.saveProgress(updated);
  };

  const handleStartLesson = (module: Module, lesson: Lesson) => {
    setActiveLesson({ module, lesson });
  };

  const handleSelectModuleFromDashboard = (moduleId: number) => {
    const mod = MODULES.find(m => m.id === moduleId);
    if (mod && mod.lessons.length > 0) {
      setActiveLesson({ module: mod, lesson: mod.lessons[0] });
    } else {
      setViewMode('MODULES_PATH');
    }
  };

  return (
    <div className="app-container">
      <Navbar
        progress={progress}
        currentMode={viewMode}
        setMode={setViewMode}
        onOpenBadges={() => setIsBadgesOpen(true)}
        pwaDeferredPrompt={pwaDeferredPrompt}
        onInstallPwa={handleInstallPWA}
      />

      <main className="main-content">
        {viewMode === 'DASHBOARD' && (
          <Dashboard
            progress={progress}
            setMode={setViewMode}
            onSelectModule={handleSelectModuleFromDashboard}
          />
        )}

        {viewMode === 'MODULES_PATH' && (
          <PathView
            progress={progress}
            onStartLesson={handleStartLesson}
          />
        )}

        {viewMode === 'SPEED_TRAIN' && (
          <SpeedTrainMode
            progress={progress}
            onSaveProgress={handleSaveProgress}
            onBack={() => setViewMode('DASHBOARD')}
          />
        )}

        {viewMode === 'EXAM_SIMULATOR' && (
          <ExamMode
            progress={progress}
            onSaveProgress={handleSaveProgress}
            onBack={() => setViewMode('DASHBOARD')}
          />
        )}

        {viewMode === 'TRUTH_TABLE' && (
          <TruthTableTool
            onBack={() => setViewMode('DASHBOARD')}
          />
        )}

        {viewMode === 'DIAGRAMS' && (
          <DiagramTool
            onBack={() => setViewMode('DASHBOARD')}
          />
        )}

        {viewMode === 'SRS_REVIEW' && (
          <SRSReviewMode
            progress={progress}
            onSaveProgress={handleSaveProgress}
            onBack={() => setViewMode('DASHBOARD')}
          />
        )}
      </main>

      {/* Microlesson Modal Viewer */}
      {activeLesson && (
        <LessonModal
          module={activeLesson.module}
          lesson={activeLesson.lesson}
          progress={progress}
          onSaveProgress={handleSaveProgress}
          onClose={() => setActiveLesson(null)}
        />
      )}

      {/* Badges & Medals Modal */}
      {isBadgesOpen && (
        <BadgesModal
          badges={progress.badges}
          onClose={() => setIsBadgesOpen(false)}
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
        <p>Lógica na Cabeça &copy; 2026 G&G Tecnologia — Todos os direitos reservados.</p>
        <a href="/" style={{ color: '#8b5cf6', textDecoration: 'none', marginTop: 6, display: 'inline-block' }}>
          &larr; Voltar ao site principal (ggondimtecnologia.com.br)
        </a>
      </footer>
    </div>
  );
};
