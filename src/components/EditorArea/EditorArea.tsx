import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { HistoryItem } from '../HistoryItem/HistoryItem';
import styles from './EditorArea.module.css';

const ITEM_HEIGHT_ESTIMATE = 70;

export function EditorArea() {
  const { inputLine, history, highlightedHistoryId } = useAppStore();
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorMessageId, setAnchorMessageId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.max(1, Math.ceil(history.length / itemsPerPage));
  const clampedPage = Math.min(Math.max(1, currentPage), totalPages);
  const pageStartIndex = (clampedPage - 1) * itemsPerPage;
  const pageEndIndex = Math.min(pageStartIndex + itemsPerPage, history.length);
  const visibleHistory = history.slice(pageStartIndex, pageEndIndex);

  const updateItemsPerPage = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const height = container.clientHeight;
    const newItemsPerPage = Math.max(1, Math.floor(height / ITEM_HEIGHT_ESTIMATE));
    setItemsPerPage(newItemsPerPage);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateItemsPerPage();
    const observer = new ResizeObserver(updateItemsPerPage);
    observer.observe(container);

    return () => observer.disconnect();
  }, [updateItemsPerPage]);

  useEffect(() => {
    const newTotalPages = Math.max(1, Math.ceil(history.length / itemsPerPage));
    setCurrentPage((prev) => Math.min(prev, newTotalPages));
  }, [history.length, itemsPerPage]);

  useEffect(() => {
    if (anchorMessageId && itemsPerPage > 0 && history.length > 0) {
      const idx = history.findIndex((h) => h.id === anchorMessageId);
      if (idx >= 0) {
        const maxPageStart = Math.max(0, history.length - itemsPerPage);
        const pageStart = Math.max(
          0,
          Math.min(idx - itemsPerPage + 1, maxPageStart),
        );
        const newPage = Math.floor(pageStart / itemsPerPage) + 1;
        setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
      }
    }
  }, [itemsPerPage, anchorMessageId, history, totalPages]);

  const handlePageUp = () => {
    if (clampedPage >= totalPages) return;
    const newPage = clampedPage + 1;
    setCurrentPage(newPage);
    if (newPage === totalPages) {
      setAnchorMessageId(history[0]?.id ?? null);
    }
  };

  const handlePageDown = () => {
    if (clampedPage <= 1) return;
    const newPage = clampedPage - 1;
    setCurrentPage(newPage);
    if (newPage === 1) {
      setAnchorMessageId(history[0]?.id ?? null);
    }
  };

  const bottomMessageId =
    visibleHistory.length > 0
      ? visibleHistory[visibleHistory.length - 1].id
      : null;

  useEffect(() => {
    if (bottomMessageId && clampedPage > 1 && clampedPage < totalPages) {
      setAnchorMessageId(bottomMessageId);
    }
  }, [bottomMessageId, clampedPage, totalPages]);

  return (
    <div className={styles.editorArea}>
      <div className={styles.historySection}>
        <div ref={containerRef} className={styles.historyListWrapper}>
          <div className={styles.historyList}>
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
            onClick={handlePageUp}
            disabled={clampedPage >= totalPages}
            aria-label="Older messages"
          >
            ▲
          </button>
          <span className={styles.pageCounter} aria-live="polite">
            {clampedPage} / {totalPages}
          </span>
          <button
            type="button"
            className={styles.pageBtn}
            onClick={handlePageDown}
            disabled={clampedPage <= 1}
            aria-label="Newer messages"
          >
            ▼
          </button>
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
