import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore, DEFAULT_SET_ID } from '../../stores/useAppStore';
import { speakText } from '../../utils/tts';
import type { Locale } from '../../types';
import styles from './SetsView.module.css';

const SETS_PER_PAGE = 2;

export function SetsView() {
  const { t, i18n } = useTranslation();
  const sets = useAppStore((s) => s.sets);
  const currentSetId = useAppStore((s) => s.currentSetId);
  const setNameInput = useAppStore((s) => s.setNameInput);
  const editingSetId = useAppStore((s) => s.editingSetId);
  const isAddingNewSet = useAppStore((s) => s.isAddingNewSet);
  const selectSet = useAppStore((s) => s.selectSet);
  const addSet = useAppStore((s) => s.addSet);
  const deleteSet = useAppStore((s) => s.deleteSet);
  const renameSet = useAppStore((s) => s.renameSet);
  const startEditingSetName = useAppStore((s) => s.startEditingSetName);
  const cancelEditingSetName = useAppStore((s) => s.cancelEditingSetName);
  const startAddingNewSet = useAppStore((s) => s.startAddingNewSet);

  const [currentPage, setCurrentPage] = useState(1);

  const reversedSets = [...sets].reverse();
  const totalPages = Math.max(1, Math.ceil(reversedSets.length / SETS_PER_PAGE));
  const startIndex = (currentPage - 1) * SETS_PER_PAGE;
  const visibleSets = reversedSets.slice(startIndex, startIndex + SETS_PER_PAGE);

  const isEditing = editingSetId !== null || isAddingNewSet;

  const handlePageUp = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageDown = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSelectSet = (id: string) => {
    if (!isEditing) {
      selectSet(id);
    }
  };

  const handleStartRename = (id: string) => {
    startEditingSetName(id);
  };

  const handleStartAdd = () => {
    startAddingNewSet();
  };

  const handleCancel = () => {
    cancelEditingSetName();
  };

  const handleAccept = () => {
    if (isAddingNewSet) {
      if (setNameInput.trim()) {
        addSet(setNameInput.trim());
      } else {
        cancelEditingSetName();
      }
    } else if (editingSetId) {
      if (setNameInput.trim()) {
        renameSet(editingSetId, setNameInput.trim());
      } else {
        cancelEditingSetName();
      }
    }
  };

  const handleRead = async () => {
    if (setNameInput.trim()) {
      await speakText(setNameInput.trim(), i18n.language as Locale);
    }
    handleAccept();
  };

  const handleDelete = (id: string) => {
    if (id !== DEFAULT_SET_ID) {
      deleteSet(id);
    }
  };

  const getSetDisplayName = (set: { id: string; name: string }) => {
    if (set.id === DEFAULT_SET_ID) {
      return t('defaultSet');
    }
    return set.name;
  };

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('sets')}</h2>

        {isEditing && (
          <div className={styles.editSection}>
            <span className={styles.editLabel}>
              {isAddingNewSet ? t('addSet') : t('rename')}
            </span>
            <div className={styles.editInput} aria-label={t('setNamePlaceholder')}>
              {setNameInput || '\u00A0'}
            </div>
            <div className={styles.editActions}>
              <button
                type="button"
                className={`${styles.editBtn} ${styles.cancel}`}
                onClick={handleCancel}
              >
                {t('clear')}
              </button>
              <button
                type="button"
                className={styles.editBtn}
                onClick={handleRead}
              >
                {t('read')}
              </button>
              <button
                type="button"
                className={`${styles.editBtn} ${styles.primary}`}
                onClick={handleAccept}
              >
                {t('accept')}
              </button>
            </div>
          </div>
        )}

        <div className={styles.setsSection}>
          <div className={styles.setsList}>
            {!isEditing && currentPage === 1 && (
              <button
                type="button"
                className={styles.addSetBtn}
                onClick={handleStartAdd}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>{t('addSet')}</span>
              </button>
            )}
            {visibleSets.map((set) => (
              <div
                key={set.id}
                className={`${styles.setItem} ${currentSetId === set.id ? styles.active : ''}`}
              >
                <span
                  className={styles.setName}
                  onClick={() => handleSelectSet(set.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSelectSet(set.id);
                    }
                  }}
                >
                  {getSetDisplayName(set)}
                </span>
                <div className={styles.setActions}>
                  <button
                    type="button"
                    className={styles.actionBtn}
                    onClick={() => handleStartRename(set.id)}
                    title={t('rename')}
                    aria-label={t('rename')}
                    disabled={isEditing}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  {set.id !== DEFAULT_SET_ID && (
                    <button
                      type="button"
                      className={`${styles.actionBtn} ${styles.danger}`}
                      onClick={() => handleDelete(set.id)}
                      title={t('delete')}
                      aria-label={t('delete')}
                      disabled={isEditing}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.paginationControls}>
            <button
              type="button"
              className={styles.pageBtn}
              onClick={handlePageUp}
              disabled={currentPage <= 1}
              aria-label="Previous page"
            >
              ▲
            </button>
            <span className={styles.pageCounter} aria-live="polite">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              className={styles.pageBtn}
              onClick={handlePageDown}
              disabled={currentPage >= totalPages}
              aria-label="Next page"
            >
              ▼
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
