import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../stores/useAppStore';
import { speakText } from '../../utils/tts';
import type { HistoryItem as HistoryItemType } from '../../types';
import styles from './HistoryItem.module.css';

interface HistoryItemProps {
  item: HistoryItemType;
  isHighlighted: boolean;
}

export function HistoryItem({ item, isHighlighted }: HistoryItemProps) {
  const { t, i18n } = useTranslation();
  const { deleteHistoryItem, setInputLine } = useAppStore();

  const handleRead = async () => {
    await speakText(
      item.text,
      i18n.language === 'pl' ? 'pl-PL' : 'en-US',
    );
  };

  const handleRestore = () => {
    setInputLine(item.text);
  };

  const handleDelete = () => {
    deleteHistoryItem(item.id);
  };

  return (
    <div
      className={`${styles.historyItem} ${isHighlighted ? styles.highlighted : ''}`}
    >
      <span className={styles.text}>{item.text}</span>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={handleRead}
          title={t('read')}
        >
          {t('read')}
        </button>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={handleRestore}
          title={t('restore')}
        >
          {t('restore')}
        </button>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={handleDelete}
          title={t('delete')}
        >
          {t('delete')}
        </button>
      </div>
    </div>
  );
}
