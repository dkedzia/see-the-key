import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../stores/useAppStore';
import type { Locale } from '../../types';
import styles from './Header.module.css';

export function Header() {
  const { t, i18n } = useTranslation();
  const { locale, setLocale } = useAppStore();

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    i18n.changeLanguage(newLocale);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{t('appTitle')}</h1>
      <div className={styles.langSwitcher}>
        <span className={styles.langLabel}>{t('language')}:</span>
        <button
          type="button"
          className={`${styles.langBtn} ${locale === 'pl' ? styles.active : ''}`}
          onClick={() => handleLocaleChange('pl')}
        >
          {t('polish')}
        </button>
        <button
          type="button"
          className={`${styles.langBtn} ${locale === 'en' ? styles.active : ''}`}
          onClick={() => handleLocaleChange('en')}
        >
          {t('english')}
        </button>
      </div>
    </header>
  );
}
