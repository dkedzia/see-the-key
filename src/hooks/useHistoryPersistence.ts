import { useEffect, useRef } from 'react';
import { load, type Store } from '@tauri-apps/plugin-store';
import { useAppStore } from '../stores/useAppStore';
import type { HistoryItem } from '../types';

const HISTORY_KEY = 'history';
const STORE_PATH = 'history.json';

let storeInstance: Store | null = null;
let storeLoadPromise: Promise<Store> | null = null;

async function getStore(): Promise<Store> {
  if (storeInstance) {
    return storeInstance;
  }
  if (!storeLoadPromise) {
    storeLoadPromise = load(STORE_PATH).then((store) => {
      storeInstance = store;
      return store;
    });
  }
  return storeLoadPromise;
}

export function useHistoryPersistence() {
  const { history, setHistory } = useAppStore();
  const isInitialized = useRef(false);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const store = await getStore();
        const saved = await store.get<HistoryItem[]>(HISTORY_KEY);
        if (saved && Array.isArray(saved)) {
          setHistory(saved);
        }
      } catch {
        // Store not available or failed to load
      } finally {
        isInitialized.current = true;
      }
    };

    loadHistory();
  }, [setHistory]);

  useEffect(() => {
    if (!isInitialized.current) return;

    const saveHistory = async () => {
      try {
        const store = await getStore();
        await store.set(HISTORY_KEY, history);
        await store.save();
      } catch {
        // Store not available or failed to save
      }
    };

    saveHistory();
  }, [history]);
}
