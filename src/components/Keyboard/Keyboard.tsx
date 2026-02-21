import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../stores/useAppStore';
import { speakText } from '../../utils/tts';
import { NUMBER_ROW, getKeyboardRowsForLocale, type RowKey } from '../../data/keyboardLayout';
import type { Locale } from '../../types';
import { RowKeyComponent } from './Key';
import styles from './Keyboard.module.css';

export function Keyboard() {
  const { t, i18n } = useTranslation();
  const inputLine = useAppStore((s) => s.inputLine);
  const acceptLine = useAppStore((s) => s.acceptLine);
  const handleClearButton = useAppStore((s) => s.handleClearButton);
  const handleRestoreButton = useAppStore((s) => s.handleRestoreButton);
  const isInSetNameEditMode = useAppStore((s) => s.isInSetNameEditMode);
  const clearSetNameInput = useAppStore((s) => s.clearSetNameInput);
  const appendToSetNameInput = useAppStore((s) => s.appendToSetNameInput);
  const appendToInputLine = useAppStore((s) => s.appendToInputLine);

  const locale = i18n.language as Locale;

  const { row1, row2, row3 } = useMemo(
    () => getKeyboardRowsForLocale(locale),
    [locale]
  );

  const inSetEditMode = isInSetNameEditMode();

  const handleClear = () => {
    if (inSetEditMode) {
      clearSetNameInput();
    } else {
      handleClearButton();
    }
  };

  const handleRead = async () => {
    if (inSetEditMode) return;
    if (!inputLine.trim()) return;
    const text = inputLine;
    acceptLine();
    await speakText(text, locale);
  };

  const handleAccept = () => {
    if (inSetEditMode) return;
    acceptLine();
  };

  const handleRestore = () => {
    if (inSetEditMode) return;
    handleRestoreButton();
  };

  const handleSpace = () => {
    if (inSetEditMode) {
      appendToSetNameInput(' ');
    } else {
      appendToInputLine(' ');
    }
  };

  const renderRow = (keys: RowKey[]) =>
    keys.map((key, idx) => (
      <RowKeyComponent key={`${key.main}-${idx}`} rowKey={key} />
    ));

  return (
    <div className={styles.keyboard}>
      <div className={styles.rows}>
        {/* Row 1: Numbers + Clear (Backspace position) */}
        <div className={styles.row}>
          {NUMBER_ROW.map((char) => (
            <RowKeyComponent
              key={char}
              rowKey={{ type: 'normal', main: char }}
            />
          ))}
          <button
            type="button"
            className={`${styles.key} ${styles.clearKey}`}
            onClick={handleClear}
          >
            {t('clear')}
          </button>
        </div>
        {/* Row 2: Restore (Tab) + first letter row */}
        <div className={styles.row}>
          <button
            type="button"
            className={`${styles.key} ${styles.restoreKey}`}
            onClick={handleRestore}
            disabled={inSetEditMode}
          >
            {t('restore')}
          </button>
          {renderRow(row1)}
        </div>
        {/* Row 3: second letter row + Read (Enter) */}
        <div className={styles.row}>
          {renderRow(row2)}
          <button
            type="button"
            className={`${styles.key} ${styles.readKey}`}
            onClick={handleRead}
            disabled={inSetEditMode}
          >
            {t('read')}
          </button>
        </div>
        {/* Row 4: third letter row + Accept (Right Shift position) */}
        <div className={styles.row}>
          {renderRow(row3)}
          <button
            type="button"
            className={`${styles.key} ${styles.acceptKey}`}
            onClick={handleAccept}
            disabled={inSetEditMode}
          >
            {t('accept')}
          </button>
        </div>
        {/* Row 5: Space */}
        <div className={styles.row}>
          <button
            type="button"
            className={`${styles.key} ${styles.spaceKey}`}
            onClick={handleSpace}
            aria-label="Space"
          >
            {' '}
          </button>
        </div>
      </div>
    </div>
  );
}
