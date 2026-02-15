import { useEffect } from 'react';
import { Store } from '@tauri-apps/plugin-store';
import { useAppStore } from '../stores/useAppStore';
import type { HistoryItem } from '../types';

const HISTORY_KEY = 'history';

function isTauri(): boolean {
  return typeof window !== 'undefined' && '__TAURI__' in window;
}

export function useHistoryPersistence() {
  const { history, setHistory } = useAppStore();

  useEffect(() => {
    if (!isTauri()) return;

    const load = async () => {
      try {
        const store = await Store.load('history.dat');
        const saved = await store.get<HistoryItem[]>(HISTORY_KEY);
        if (saved && Array.isArray(saved)) {
          setHistory(saved);
        }
      } catch (err) {
        console.error('Failed to load history:', err);
      }
    };

    load();
  }, [setHistory]);

  useEffect(() => {
    if (!isTauri()) return;

    const save = async () => {
      try {
        const store = await Store.load('history.dat');
        await store.set(HISTORY_KEY, history);
        await store.save();
      } catch (err) {
        console.error('Failed to save history:', err);
      }
    };

    save();
  }, [history]);
}
