import { create } from 'zustand';
import type { HistoryItem, Locale, MessageSet, Theme } from '../types';
import { AVAILABLE_LOCALES } from '../i18n/locales';

const AVAILABLE_LOCALE_CODES = AVAILABLE_LOCALES.map((l) => l.code);
export const DEFAULT_SET_ID = 'default';

interface AppState {
  inputLine: string;
  history: HistoryItem[];
  highlightedHistoryId: string | null;
  restoreIndex: number;
  locale: Locale;
  theme: Theme;
  isSettingsOpen: boolean;

  sets: MessageSet[];
  currentSetId: string;
  isSetsViewOpen: boolean;
  isKeyboardVisible: boolean;
  setNameInput: string;
  editingSetId: string | null;
  isAddingNewSet: boolean;

  setInputLine: (text: string) => void;
  appendToInputLine: (char: string) => void;
  replaceCurrentWord: (suggestion: string, appendSpace?: boolean) => void;
  clearInputLine: () => void;
  handleClearButton: () => void;
  handleRestoreButton: () => void;
  acceptLine: () => void;
  deleteHistoryItem: (id: string) => void;
  highlightHistoryItem: (id: string | null) => void;
  setHistory: (history: HistoryItem[]) => void;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: Theme) => void;
  setSettingsOpen: (open: boolean) => void;

  setSets: (sets: MessageSet[]) => void;
  setCurrentSetId: (id: string) => void;
  setSetsViewOpen: (open: boolean) => void;
  setKeyboardVisible: (visible: boolean) => void;
  selectSet: (id: string) => void;
  addSet: (name: string) => void;
  deleteSet: (id: string) => void;
  renameSet: (id: string, name: string) => void;
  setSetNameInput: (text: string) => void;
  startEditingSetName: (id: string | null) => void;
  cancelEditingSetName: () => void;
  getCurrentSet: () => MessageSet | undefined;
  startAddingNewSet: () => void;
  appendToSetNameInput: (char: string) => void;
  clearSetNameInput: () => void;
  isInSetNameEditMode: () => boolean;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark' || stored === 'auto') {
    return stored;
  }
  return 'auto';
}

function getSystemLocale(): Locale {
  const browserLangs = navigator.languages || [navigator.language];
  for (const lang of browserLangs) {
    const code = lang.split('-')[0].toLowerCase();
    if (AVAILABLE_LOCALE_CODES.includes(code as Locale)) {
      return code as Locale;
    }
  }
  return 'en';
}

function getInitialLocale(): Locale {
  const stored = localStorage.getItem('locale');
  if (stored && AVAILABLE_LOCALE_CODES.includes(stored as Locale)) {
    return stored as Locale;
  }
  return getSystemLocale();
}

function createDefaultSet(): MessageSet {
  return {
    id: DEFAULT_SET_ID,
    name: 'Default Set',
    history: [],
  };
}

export const useAppStore = create<AppState>((set, get) => ({
  inputLine: '',
  history: [],
  highlightedHistoryId: null,
  restoreIndex: 0,
  locale: getInitialLocale(),
  theme: getInitialTheme(),
  isSettingsOpen: false,

  sets: [createDefaultSet()],
  currentSetId: DEFAULT_SET_ID,
  isSetsViewOpen: false,
  isKeyboardVisible: true,
  setNameInput: '',
  editingSetId: null,
  isAddingNewSet: false,

  setInputLine: (text) => {
    set({ inputLine: text, highlightedHistoryId: null });
  },

  appendToInputLine: (char) => {
    set((state) => ({
      inputLine: state.inputLine + char,
      highlightedHistoryId: null,
    }));
  },

  replaceCurrentWord: (suggestion, appendSpace = true) => {
    const { inputLine } = get();
    const trimmed = inputLine.trimEnd();
    const lastSpace = trimmed.lastIndexOf(' ');
    const prefixEnd = lastSpace >= 0 ? lastSpace + 1 : 0;
    const before = trimmed.slice(0, prefixEnd);
    const after = appendSpace ? suggestion + ' ' : suggestion;
    set({
      inputLine: before + after,
      highlightedHistoryId: null,
    });
  },

  clearInputLine: () => {
    set({ inputLine: '', highlightedHistoryId: null, restoreIndex: 0 });
  },

  handleClearButton: () => {
    const { inputLine, history, highlightedHistoryId, sets, currentSetId } = get();
    if (inputLine.length > 0) {
      set({ inputLine: '', restoreIndex: 0 });
      return;
    }
    if (highlightedHistoryId) {
      const newHistory = history.filter((h) => h.id !== highlightedHistoryId);
      const updatedSets = sets.map((s) =>
        s.id === currentSetId ? { ...s, history: newHistory } : s
      );
      set({
        history: newHistory,
        sets: updatedSets,
        highlightedHistoryId: null,
        restoreIndex: 0,
      });
      return;
    }
    if (history.length > 0) {
      set({ highlightedHistoryId: history[0].id });
    }
  },

  handleRestoreButton: () => {
    const { history, restoreIndex } = get();
    if (restoreIndex >= history.length) return;
    const text = history[restoreIndex].text;
    set({
      inputLine: text,
      highlightedHistoryId: null,
      restoreIndex: Math.min(restoreIndex + 1, history.length - 1),
    });
  },

  acceptLine: () => {
    const { inputLine, history, sets, currentSetId } = get();
    if (!inputLine.trim()) return;

    const item: HistoryItem = {
      id: generateId(),
      text: inputLine,
      createdAt: Date.now(),
    };

    const newHistory = [item, ...history];
    const updatedSets = sets.map((s) =>
      s.id === currentSetId ? { ...s, history: newHistory } : s
    );

    set({
      inputLine: '',
      history: newHistory,
      sets: updatedSets,
      restoreIndex: 0,
      highlightedHistoryId: null,
    });
  },

  deleteHistoryItem: (id) => {
    set((state) => {
      const newHistory = state.history.filter((h) => h.id !== id);
      const updatedSets = state.sets.map((s) =>
        s.id === state.currentSetId ? { ...s, history: newHistory } : s
      );
      return {
        history: newHistory,
        sets: updatedSets,
        highlightedHistoryId: state.highlightedHistoryId === id ? null : state.highlightedHistoryId,
        restoreIndex: 0,
      };
    });
  },

  highlightHistoryItem: (id) => {
    set({ highlightedHistoryId: id });
  },


  setHistory: (history) => {
    const { sets, currentSetId } = get();
    const updatedSets = sets.map((s) =>
      s.id === currentSetId ? { ...s, history } : s
    );
    set({ history, sets: updatedSets });
  },

  setLocale: (locale) => {
    localStorage.setItem('locale', locale);
    set({ locale });
  },

  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    set({ theme });
  },

  setSettingsOpen: (open) => {
    set({ isSettingsOpen: open, isSetsViewOpen: false });
  },

  setSets: (sets) => {
    const { currentSetId } = get();
    const currentSet = sets.find((s) => s.id === currentSetId);
    set({
      sets,
      history: currentSet?.history ?? [],
    });
  },

  setCurrentSetId: (id) => {
    const { sets } = get();
    const targetSet = sets.find((s) => s.id === id);
    if (targetSet) {
      set({
        currentSetId: id,
        history: targetSet.history,
        inputLine: '',
        highlightedHistoryId: null,
        restoreIndex: 0,
      });
    }
  },

  setSetsViewOpen: (open) => {
    set({
      isSetsViewOpen: open,
      isSettingsOpen: false,
      setNameInput: '',
      editingSetId: null,
      isAddingNewSet: false,
    });
  },

  setKeyboardVisible: (visible) => {
    set({ isKeyboardVisible: visible });
  },

  selectSet: (id) => {
    const { sets } = get();
    const targetSet = sets.find((s) => s.id === id);
    if (targetSet) {
      set({
        currentSetId: id,
        history: targetSet.history,
        inputLine: '',
        highlightedHistoryId: null,
        restoreIndex: 0,
        isSetsViewOpen: false,
        setNameInput: '',
        editingSetId: null,
        isAddingNewSet: false,
      });
    }
  },

  addSet: (name) => {
    const { sets } = get();
    const newSet: MessageSet = {
      id: generateId(),
      name: name.trim() || 'New Set',
      history: [],
    };
    set({
      sets: [...sets, newSet],
      setNameInput: '',
      editingSetId: null,
      isAddingNewSet: false,
    });
  },

  deleteSet: (id) => {
    const { sets, currentSetId } = get();
    if (id === DEFAULT_SET_ID) return;
    const filteredSets = sets.filter((s) => s.id !== id);
    if (filteredSets.length === 0) return;

    if (currentSetId === id) {
      const newCurrentSet = filteredSets[0];
      set({
        sets: filteredSets,
        currentSetId: newCurrentSet.id,
        history: newCurrentSet.history,
        inputLine: '',
        highlightedHistoryId: null,
        restoreIndex: 0,
      });
    } else {
      set({ sets: filteredSets });
    }
  },

  renameSet: (id, name) => {
    const { sets } = get();
    const updatedSets = sets.map((s) =>
      s.id === id ? { ...s, name: name.trim() || s.name } : s
    );
    set({
      sets: updatedSets,
      setNameInput: '',
      editingSetId: null,
    });
  },

  setSetNameInput: (text) => {
    set({ setNameInput: text });
  },

  startEditingSetName: (id) => {
    const { sets } = get();
    if (id === null) {
      set({ editingSetId: null, setNameInput: '', isAddingNewSet: false });
    } else {
      const targetSet = sets.find((s) => s.id === id);
      set({
        editingSetId: id,
        setNameInput: targetSet?.name ?? '',
        isAddingNewSet: false,
      });
    }
  },

  cancelEditingSetName: () => {
    set({ editingSetId: null, setNameInput: '', isAddingNewSet: false });
  },

  getCurrentSet: () => {
    const { sets, currentSetId } = get();
    return sets.find((s) => s.id === currentSetId);
  },

  startAddingNewSet: () => {
    set({
      isAddingNewSet: true,
      editingSetId: null,
      setNameInput: '',
    });
  },

  appendToSetNameInput: (char) => {
    set((state) => ({
      setNameInput: state.setNameInput + char,
    }));
  },

  clearSetNameInput: () => {
    set({ setNameInput: '' });
  },

  isInSetNameEditMode: () => {
    const { editingSetId, isAddingNewSet, isSetsViewOpen } = get();
    return isSetsViewOpen && (editingSetId !== null || isAddingNewSet);
  },
}));
