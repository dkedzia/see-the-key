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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (splitKey) {
      const rect = e.currentTarget.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const isTop = y < rect.height / 2;
      appendToInputLine(isTop ? splitKey.main : splitKey.alt);
    } else {
      appendToInputLine(char);
    }
  };

  if (splitKey) {
    return (
      <button
        type="button"
        className={styles.key}
        onClick={handleClick}
        aria-label={`Key ${char} or ${splitKey.alt}`}
      >
        <span className={styles.topChar}>{splitKey.main}</span>
        <span className={styles.bottomChar}>{splitKey.alt}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={styles.key}
      onClick={() => appendToInputLine(char)}
      aria-label={`Key ${char}`}
    >
      {char}
    </button>
  );
}
