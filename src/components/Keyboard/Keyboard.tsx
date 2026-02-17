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
        {/* Row 1: Numbers + Clear (Backspace position) */}
        <div className={styles.row}>
          {ROW4.map((char) => (
            <Key key={char} char={char} isPolishLayout={false} />
          ))}
          <button
            type="button"
            className={`${styles.key} ${styles.clearKey}`}
            onClick={handleClearButton}
          >
            {t('clear')}
          </button>
        </div>
        {/* Row 2: Restore (Tab) + Q-P */}
        <div className={styles.row}>
          <button
            type="button"
            className={`${styles.key} ${styles.restoreKey}`}
            onClick={handleRestoreButton}
          >
            {t('restore')}
          </button>
          {ROW1.map((char) => (
            <Key key={char} char={char} isPolishLayout={isPolish} />
          ))}
        </div>
        {/* Row 3: A-L + Read (Enter) */}
        <div className={styles.row}>
          {ROW2.map((char) => (
            <Key key={char} char={char} isPolishLayout={isPolish} />
          ))}
          <button
            type="button"
            className={`${styles.key} ${styles.readKey}`}
            onClick={handleRead}
          >
            {t('read')}
          </button>
        </div>
        {/* Row 4: Z-M + Accept (Right Shift position) */}
        <div className={styles.row}>
          {ROW3.map((char) => (
            <Key key={char} char={char} isPolishLayout={isPolish} />
          ))}
          <button
            type="button"
            className={`${styles.key} ${styles.acceptKey}`}
            onClick={handleAccept}
          >
            {t('accept')}
          </button>
        </div>
        {/* Row 5: Space */}
        <div className={styles.row}>
          <button
            type="button"
            className={`${styles.key} ${styles.spaceKey}`}
            onClick={() => useAppStore.getState().appendToInputLine(' ')}
            aria-label="Space"
          >
            {' '}
          </button>
        </div>
      </div>
    </div>
  );
}
