import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useAppStore } from '../../stores/useAppStore';
import { UpdateStatus } from './UpdateStatus';
import styles from './Header.module.css';

export function Header() {
  const { t } = useTranslation();
  const isSettingsOpen = useAppStore((s) => s.isSettingsOpen);
  const setSettingsOpen = useAppStore((s) => s.setSettingsOpen);
  const isSetsViewOpen = useAppStore((s) => s.isSetsViewOpen);
  const setSetsViewOpen = useAppStore((s) => s.setSetsViewOpen);
  const isKeyboardVisible = useAppStore((s) => s.isKeyboardVisible);
  const setKeyboardVisible = useAppStore((s) => s.setKeyboardVisible);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    getCurrentWindow().isFullscreen().then(setIsFullscreen);
  }, []);

  const toggleFullscreen = async () => {
    const appWindow = getCurrentWindow();
    const newState = !isFullscreen;
    await appWindow.setFullscreen(newState);
    setIsFullscreen(newState);
  };

  const toggleSetsView = () => {
    setSetsViewOpen(!isSetsViewOpen);
  };

  const toggleKeyboard = () => {
    setKeyboardVisible(!isKeyboardVisible);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{t('appTitle')}</h1>
      <div className={styles.headerRight}>
        <UpdateStatus />
        <div className={styles.controls}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={toggleSetsView}
          aria-label={isSetsViewOpen ? t('closeSets') : t('sets')}
          aria-expanded={isSetsViewOpen}
        >
          {isSetsViewOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          className={styles.iconButton}
          onClick={toggleKeyboard}
          aria-label={isKeyboardVisible ? t('hideKeyboard') : t('showKeyboard')}
          aria-pressed={isKeyboardVisible}
        >
          {isKeyboardVisible ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
              <path d="M6 8h.001M10 8h.001M14 8h.001M18 8h.001M6 12h.001M10 12h.001M14 12h.001M18 12h.001M8 16h8" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
              <path d="M6 8h.001M10 8h.001M14 8h.001M18 8h.001M6 12h.001M10 12h.001M14 12h.001M18 12h.001M8 16h8" />
              <line x1="2" y1="2" x2="22" y2="22" />
            </svg>
          )}
        </button>
        <button
          type="button"
          className={styles.iconButton}
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? t('exitFullscreen') : t('fullscreen')}
        >
          {isFullscreen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          )}
        </button>
        <button
          type="button"
          className={styles.settingsButton}
          onClick={() => setSettingsOpen(!isSettingsOpen)}
          aria-label={isSettingsOpen ? t('closeSettings') : t('settings')}
          aria-expanded={isSettingsOpen}
        >
          {isSettingsOpen ? (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <span>{t('closeSettings')}</span>
            </>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          )}
        </button>
        </div>
      </div>
    </header>
  );
}
