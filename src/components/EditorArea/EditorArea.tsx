import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../stores/useAppStore';
import { useSuggestions } from '../../services/suggestions/useSuggestions';
import { HistoryItem } from '../HistoryItem/HistoryItem';
import styles from './EditorArea.module.css';

const ITEM_HEIGHT_ESTIMATE = 78;
const COLUMN_WIDTH_ESTIMATE = 508;

function InlineSuggestions() {
  const inputLine = useAppStore((s) => s.inputLine);
  const locale = useAppStore((s) => s.locale);
  const replaceCurrentWord = useAppStore((s) => s.replaceCurrentWord);
  const { suggestions } = useSuggestions(inputLine, locale);

  if (!inputLine || suggestions.length === 0) return null;

  return (
    <div className={styles.suggestionsRow}>
      {suggestions.map((word) => (
        <button
          key={word}
          type="button"
          className={styles.suggestionBtn}
          onClick={() => replaceCurrentWord(word)}
        >
          {word}
        </button>
      ))}
    </div>
  );
}

export function EditorArea() {
  const { t } = useTranslation();
  const { inputLine, history, highlightedHistoryId, handleClearButton } = useAppStore();
  const [rowsPerColumn, setRowsPerColumn] = useState(1);
  const [columnsCount, setColumnsCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const prevHistoryRef = useRef(history);

  useEffect(() => {
    if (prevHistoryRef.current !== history) {
      setCurrentPage(1);
      prevHistoryRef.current = history;
    }
  }, [history]);

  const itemsPerPage = rowsPerColumn * columnsCount;
  const totalPages = Math.max(1, Math.ceil(history.length / itemsPerPage));
  const clampedPage = Math.min(Math.max(1, currentPage), totalPages);
  const pageStartIndex = (clampedPage - 1) * itemsPerPage;
  const pageEndIndex = Math.min(pageStartIndex + itemsPerPage, history.length);
  const visibleHistory = history.slice(pageStartIndex, pageEndIndex);

  const updateGridDimensions = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const height = container.clientHeight;
    const width = container.clientWidth;
    const newRowsPerColumn = Math.max(1, Math.floor(height / ITEM_HEIGHT_ESTIMATE));
    const newColumnsCount = Math.max(1, Math.floor(width / COLUMN_WIDTH_ESTIMATE));
    
    setRowsPerColumn(newRowsPerColumn);
    setColumnsCount(newColumnsCount);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateGridDimensions();
    const observer = new ResizeObserver(updateGridDimensions);
    observer.observe(container);

    return () => observer.disconnect();
  }, [updateGridDimensions]);

  useEffect(() => {
    const list = listRef.current;
    if (list) {
      list.style.setProperty('--rows-count', String(rowsPerColumn));
    }
  }, [rowsPerColumn]);

  useEffect(() => {
    if (itemsPerPage > 0) {
      const newTotalPages = Math.max(1, Math.ceil(history.length / itemsPerPage));
      setCurrentPage((prev) => Math.min(prev, newTotalPages));
    }
  }, [history.length, itemsPerPage]);

  const goToNewerPage = () => {
    if (clampedPage <= 1) return;
    setCurrentPage(clampedPage - 1);
  };

  const goToOlderPage = () => {
    if (clampedPage >= totalPages) return;
    setCurrentPage(clampedPage + 1);
  };

  return (
    <div className={styles.editorArea}>
      <div className={styles.historySection}>
        <div ref={containerRef} className={styles.historyListWrapper}>
          <div ref={listRef} className={styles.historyList}>
            {visibleHistory.map((item) => (
              <HistoryItem
                key={item.id}
                item={item}
                isHighlighted={highlightedHistoryId === item.id}
              />
            ))}
          </div>
        </div>
        <div className={styles.paginationControls}>
          <button
            type="button"
            className={styles.pageBtn}
            onClick={goToNewerPage}
            disabled={clampedPage <= 1}
            aria-label="Newer messages"
          >
            ▲
          </button>
          <span className={styles.pageCounter} aria-live="polite">
            {clampedPage} / {totalPages}
          </span>
          <button
            type="button"
            className={styles.pageBtn}
            onClick={goToOlderPage}
            disabled={clampedPage >= totalPages}
            aria-label="Older messages"
          >
            ▼
          </button>
        </div>
      </div>
      <div className={styles.inputSection}>
        <div className={styles.inputLine} aria-label="Current input">
          <div className={styles.inputContent}>
            <span className={styles.inputText}>{inputLine || '\u00A0'}</span>
            <InlineSuggestions />
          </div>
          <button
            type="button"
            className={styles.clearBtn}
            onClick={handleClearButton}
            aria-label={t('clear')}
          >
            {t('clear')}
          </button>
        </div>
      </div>
    </div>
  );
}
