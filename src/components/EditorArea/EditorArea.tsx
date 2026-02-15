import { useAppStore } from '../../stores/useAppStore';
import { HistoryItem } from '../HistoryItem/HistoryItem';
import styles from './EditorArea.module.css';

export function EditorArea() {
  const { inputLine, history, highlightedHistoryId } = useAppStore();

  return (
    <div className={styles.editorArea}>
      <div className={styles.historySection}>
        <div className={styles.historyList}>
          {history.map((item) => (
            <HistoryItem
              key={item.id}
              item={item}
              isHighlighted={highlightedHistoryId === item.id}
            />
          ))}
        </div>
      </div>
      <div className={styles.inputSection}>
        <div className={styles.inputLine} aria-label="Current input">
          {inputLine || '\u00A0'}
        </div>
      </div>
    </div>
  );
}
