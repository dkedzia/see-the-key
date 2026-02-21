import { useAppStore } from '../../stores/useAppStore';
import type { RowKey } from '../../data/keyboardLayout';
import styles from './Key.module.css';

interface RowKeyComponentProps {
  rowKey: RowKey;
}

export function RowKeyComponent({ rowKey }: RowKeyComponentProps) {
  const appendToInputLine = useAppStore((s) => s.appendToInputLine);
  const appendToSetNameInput = useAppStore((s) => s.appendToSetNameInput);
  const isInSetNameEditMode = useAppStore((s) => s.isInSetNameEditMode);

  const handleAppend = (char: string) => {
    if (isInSetNameEditMode()) {
      appendToSetNameInput(char);
    } else {
      appendToInputLine(char);
    }
  };

  if (rowKey.type === 'normal' || !rowKey.alt) {
    return (
      <button
        type="button"
        className={styles.key}
        onClick={() => handleAppend(rowKey.main)}
        aria-label={`Key ${rowKey.main}`}
      >
        {rowKey.main.toUpperCase()}
      </button>
    );
  }

  const alt = rowKey.alt;
  return (
    <div className={styles.splitKey}>
      <button
        type="button"
        className={styles.splitKeyTop}
        onClick={() => handleAppend(rowKey.main)}
        aria-label={`Key ${rowKey.main} or ${alt}`}
      >
        {rowKey.main.toUpperCase()}
      </button>
      <button
        type="button"
        className={styles.splitKeyBottom}
        onClick={() => handleAppend(alt)}
        aria-label={`Key ${alt}`}
      >
        {alt.toUpperCase()}
      </button>
    </div>
  );
}
