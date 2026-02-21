import { useEffect, useRef } from 'react';
import { load, type Store } from '@tauri-apps/plugin-store';
import { useAppStore, DEFAULT_SET_ID } from '../stores/useAppStore';
import type { HistoryItem, MessageSet } from '../types';

const SETS_KEY = 'sets';
const SETS_STORE_PATH = 'sets.json';
const LEGACY_HISTORY_KEY = 'history';
const LEGACY_STORE_PATH = 'history.json';

let setsStoreInstance: Store | null = null;
let setsStoreLoadPromise: Promise<Store> | null = null;

let legacyStoreInstance: Store | null = null;
let legacyStoreLoadPromise: Promise<Store> | null = null;

async function getSetsStore(): Promise<Store> {
  if (setsStoreInstance) {
    return setsStoreInstance;
  }
  if (!setsStoreLoadPromise) {
    setsStoreLoadPromise = load(SETS_STORE_PATH).then((store) => {
      setsStoreInstance = store;
      return store;
    });
  }
  return setsStoreLoadPromise;
}

async function getLegacyStore(): Promise<Store> {
  if (legacyStoreInstance) {
    return legacyStoreInstance;
  }
  if (!legacyStoreLoadPromise) {
    legacyStoreLoadPromise = load(LEGACY_STORE_PATH).then((store) => {
      legacyStoreInstance = store;
      return store;
    });
  }
  return legacyStoreLoadPromise;
}

function createDefaultSet(history: HistoryItem[] = []): MessageSet {
  return {
    id: DEFAULT_SET_ID,
    name: 'Default Set',
    history,
  };
}

export function useSetsPersistence() {
  const sets = useAppStore((s) => s.sets);
  const setSets = useAppStore((s) => s.setSets);
  const setCurrentSetId = useAppStore((s) => s.setCurrentSetId);
  const isInitialized = useRef(false);

  useEffect(() => {
    const loadSets = async () => {
      try {
        const setsStore = await getSetsStore();
        const savedSets = await setsStore.get<MessageSet[]>(SETS_KEY);

        if (savedSets && Array.isArray(savedSets) && savedSets.length > 0) {
          setSets(savedSets);
          setCurrentSetId(savedSets[0].id);
        } else {
          const legacyStore = await getLegacyStore();
          const legacyHistory = await legacyStore.get<HistoryItem[]>(LEGACY_HISTORY_KEY);

          if (legacyHistory && Array.isArray(legacyHistory) && legacyHistory.length > 0) {
            const migratedSets = [createDefaultSet(legacyHistory)];
            setSets(migratedSets);
            setCurrentSetId(DEFAULT_SET_ID);

            await setsStore.set(SETS_KEY, migratedSets);
            await setsStore.save();
          } else {
            const defaultSets = [createDefaultSet()];
            setSets(defaultSets);
            setCurrentSetId(DEFAULT_SET_ID);
          }
        }
      } catch {
        const defaultSets = [createDefaultSet()];
        setSets(defaultSets);
        setCurrentSetId(DEFAULT_SET_ID);
      } finally {
        isInitialized.current = true;
      }
    };

    loadSets();
  }, [setSets, setCurrentSetId]);

  useEffect(() => {
    if (!isInitialized.current) return;

    const saveSets = async () => {
      try {
        const store = await getSetsStore();
        await store.set(SETS_KEY, sets);
        await store.save();
      } catch {
        // Store not available or failed to save
      }
    };

    saveSets();
  }, [sets]);
}
