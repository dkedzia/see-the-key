/**
 * Suggestion service using a Web Worker for dictionary parsing and prefix search.
 * The main thread is never blocked -- keyboard stays responsive.
 */

export type DictLang = 'pl' | 'en';

const worker = new Worker(
  new URL('./suggestion.worker.ts', import.meta.url),
  { type: 'module' }
);

let nextRequestId = 0;
const pendingRequests = new Map<number, (words: string[]) => void>();
const loadedLanguages = new Set<DictLang>();
const loadingLanguages = new Set<DictLang>();

worker.onmessage = (e: MessageEvent) => {
  const msg = e.data;

  if (msg.type === 'loaded') {
    loadedLanguages.add(msg.lang);
    loadingLanguages.delete(msg.lang);
  }

  if (msg.type === 'suggestions') {
    const resolve = pendingRequests.get(msg.requestId);
    if (resolve) {
      pendingRequests.delete(msg.requestId);
      resolve(msg.words);
    }
  }
};

export function loadDictionary(lang: DictLang): void {
  if (loadedLanguages.has(lang) || loadingLanguages.has(lang)) return;
  loadingLanguages.add(lang);
  worker.postMessage({ type: 'loadDictionary', lang });
}

export function getSuggestions(
  prefix: string,
  lang: DictLang,
  limit: number = 30
): Promise<string[]> {
  if (!loadedLanguages.has(lang)) return Promise.resolve([]);

  const trimmed = prefix.trim().toLowerCase();
  if (!trimmed) return Promise.resolve([]);

  const requestId = nextRequestId++;
  return new Promise((resolve) => {
    pendingRequests.set(requestId, resolve);
    worker.postMessage({ type: 'getSuggestions', prefix: trimmed, lang, requestId, limit });
  });
}
