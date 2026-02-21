import { create } from 'zustand';
import type { HistoryItem, Locale, Theme } from '../types';
import { AVAILABLE_LOCALES } from '../i18n/locales';

const AVAILABLE_LOCALE_CODES = AVAILABLE_LOCALES.map((l) => l.code);

interface AppState {
  inputLine: string;
  history: HistoryItem[];
  highlightedHistoryId: string | null;
  restoreIndex: number;
  locale: Locale;
  theme: Theme;
  isSettingsOpen: boolean;

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

export const useAppStore = create<AppState>((set, get) => ({
  inputLine: '',
  history: [],
  highlightedHistoryId: null,
  restoreIndex: 0,
  locale: getInitialLocale(),
  theme: getInitialTheme(),
  isSettingsOpen: false,

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
    const { inputLine, history, highlightedHistoryId } = get();
    if (inputLine.length > 0) {
      set({ inputLine: '', restoreIndex: 0 });
      return;
    }
    if (highlightedHistoryId) {
      set({
        history: history.filter((h) => h.id !== highlightedHistoryId),
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
    const { inputLine, history } = get();
    if (!inputLine.trim()) return;

    const item: HistoryItem = {
      id: generateId(),
      text: inputLine,
      createdAt: Date.now(),
    };

    set({
      inputLine: '',
      history: [item, ...history],
      restoreIndex: 0,
      highlightedHistoryId: null,
    });
  },

  deleteHistoryItem: (id) => {
    set((state) => ({
      history: state.history.filter((h) => h.id !== id),
      highlightedHistoryId: state.highlightedHistoryId === id ? null : state.highlightedHistoryId,
      restoreIndex: 0,
    }));
  },

  highlightHistoryItem: (id) => {
    set({ highlightedHistoryId: id });
  },


  setHistory: (history) => {
    set({ history });
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
    set({ isSettingsOpen: open });
  },
}));
