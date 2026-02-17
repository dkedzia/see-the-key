import { useAppStore } from '../../stores/useAppStore';
import { POLISH_SPLIT_KEYS } from '../../data/keyboardLayout';
import styles from './Key.module.css';

interface KeyProps {
  char: string;
  isPolishLayout: boolean;
}

export function Key({ char, isPolishLayout }: KeyProps) {
  const appendToInputLine = useAppStore((s) => s.appendToInputLine);
  const splitKey = isPolishLayout ? POLISH_SPLIT_KEYS[char] : null;

  if (splitKey) {
    return (
      <div className={styles.splitKey}>
        <button
          type="button"
          className={styles.splitKeyTop}
          onClick={() => appendToInputLine(splitKey.main)}
          aria-label={`Key ${splitKey.main} or ${splitKey.alt}`}
        >
          {splitKey.main.toUpperCase()}
        </button>
        <button
          type="button"
          className={styles.splitKeyBottom}
          onClick={() => appendToInputLine(splitKey.alt)}
          aria-label={`Key ${splitKey.alt}`}
        >
          {splitKey.alt.toUpperCase()}
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={styles.key}
      onClick={() => appendToInputLine(char)}
      aria-label={`Key ${char}`}
    >
      {char.toUpperCase()}
    </button>
  );
}
