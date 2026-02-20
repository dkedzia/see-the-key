import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../stores/useAppStore';
import { AVAILABLE_LOCALES } from '../../i18n/locales';
import { ThemeSwitcher } from '../ThemeSwitcher';
import type { Locale } from '../../types';
import styles from './Header.module.css';

export function Header() {
  const { t, i18n } = useTranslation();
  const { locale, setLocale } = useAppStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsPopupOpen(false);
      }
    }
    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPopupOpen]);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    i18n.changeLanguage(newLocale);
    setIsPopupOpen(false);
  };

  const currentLocaleLabel =
    AVAILABLE_LOCALES.find((l) => l.code === locale)?.labelKey ?? 'polish';

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{t('appTitle')}</h1>
      <div className={styles.controls}>
        <ThemeSwitcher />
        <div className={styles.langSwitcher} ref={popupRef}>
          <button
            type="button"
            className={styles.langTrigger}
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            aria-expanded={isPopupOpen}
            aria-haspopup="listbox"
            aria-label={t('language')}
          >
            {t(currentLocaleLabel)}
          </button>
          {isPopupOpen && (
            <div
              className={styles.langPopup}
              role="listbox"
              aria-label={t('language')}
            >
              {AVAILABLE_LOCALES.map(({ code, labelKey }) => (
                <button
                  key={code}
                  type="button"
                  role="option"
                  aria-selected={locale === code}
                  className={`${styles.langOption} ${
                    locale === code ? styles.active : ''
                  }`}
                  onClick={() => handleLocaleChange(code)}
                >
                  {t(labelKey)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
