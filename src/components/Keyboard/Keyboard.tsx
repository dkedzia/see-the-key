import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../stores/useAppStore';
import { speakText } from '../../utils/tts';
import { ROW1, ROW2, ROW3, ROW4 } from '../../data/keyboardLayout';
import { Key } from './Key';
import styles from './Keyboard.module.css';

export function Keyboard() {
  const { t, i18n } = useTranslation();
  const { inputLine, acceptLine, handleClearButton, handleRestoreButton } =
    useAppStore();

  const isPolish = i18n.language === 'pl';

  const handleRead = async () => {
    if (!inputLine.trim()) return;
    const text = inputLine;
    acceptLine();
    await speakText(text, isPolish ? 'pl-PL' : 'en-US');
  };

  const handleAccept = () => {
    acceptLine();
  };

  return (
    <div className={styles.keyboard}>
      <div className={styles.rows}>
        <div className={styles.row}>
          {ROW1.map((char) => (
            <Key key={char} char={char} isPolishLayout={isPolish} />
          ))}
        </div>
        <div className={styles.row}>
          {ROW2.map((char) => (
            <Key key={char} char={char} isPolishLayout={isPolish} />
          ))}
        </div>
        <div className={styles.row}>
          {ROW3.map((char) => (
            <Key key={char} char={char} isPolishLayout={isPolish} />
          ))}
        </div>
        <div className={styles.row}>
          {ROW4.map((char) => (
            <Key key={char} char={char} isPolishLayout={false} />
          ))}
          <button
            type="button"
            className={`${styles.key} ${styles.spaceKey}`}
            onClick={() => useAppStore.getState().appendToInputLine(' ')}
            aria-label="Space"
          >
            {' '}
          </button>
        </div>
        <div className={styles.row}>
          <button
            type="button"
            className={`${styles.key} ${styles.specialKey}`}
            onClick={handleRead}
          >
            {t('read')}
          </button>
          <button
            type="button"
            className={`${styles.key} ${styles.specialKey}`}
            onClick={handleAccept}
          >
            {t('accept')}
          </button>
          <button
            type="button"
            className={`${styles.key} ${styles.specialKey}`}
            onClick={handleClearButton}
          >
            {t('clear')}
          </button>
          <button
            type="button"
            className={`${styles.key} ${styles.specialKey}`}
            onClick={handleRestoreButton}
          >
            {t('restore')}
          </button>
        </div>
      </div>
    </div>
  );
}
