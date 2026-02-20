import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../stores/useAppStore';
import type { Theme } from '../../types';
import styles from './ThemeSwitcher.module.css';

const THEME_OPTIONS: { value: Theme; labelKey: string; icon: React.ReactNode }[] = [
  {
    value: 'auto',
    labelKey: 'themeAuto',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
  },
  {
    value: 'light',
    labelKey: 'themeLight',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
  },
  {
    value: 'dark',
    labelKey: 'themeDark',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
];

export function ThemeSwitcher() {
  const { t } = useTranslation();
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);

  return (
    <div className={styles.themeSwitcher} role="group" aria-label={t('theme')}>
      {THEME_OPTIONS.map(({ value, labelKey, icon }) => (
        <button
          key={value}
          type="button"
          className={`${styles.themeButton} ${theme === value ? styles.active : ''}`}
          onClick={() => setTheme(value)}
          aria-pressed={theme === value}
          title={t(labelKey)}
        >
          {icon}
          <span className={styles.label}>{t(labelKey)}</span>
        </button>
      ))}
    </div>
  );
}
