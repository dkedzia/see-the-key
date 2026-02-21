type DictLang = string;

interface LoadDictionaryMsg {
  type: 'loadDictionary';
  lang: DictLang;
}

interface GetSuggestionsMsg {
  type: 'getSuggestions';
  prefix: string;
  lang: DictLang;
  requestId: number;
  limit: number;
}

type WorkerMessage = LoadDictionaryMsg | GetSuggestionsMsg;

const wordLists = new Map<DictLang, string[]>();

function parseDicForPrefixIndex(dicText: string): string[] {
  const lines = dicText.split(/\r?\n/);
  const words: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line || line.charCodeAt(0) === 9) continue;

    const slashIdx = line.indexOf('/');
    const hashIdx = line.indexOf('#');
    const word = slashIdx > -1
      ? line.slice(0, slashIdx).trim()
      : hashIdx > -1
        ? line.slice(0, hashIdx).trim()
        : line.trim();

    if (word.length > 0 && /\p{L}/u.test(word)) {
      words.push(word.toLowerCase());
    }
  }

  return [...new Set(words)].sort();
}

function binarySearchPrefixRange(
  words: string[],
  prefix: string
): [number, number] {
  const lower = prefix.toLowerCase();
  const upper = lower + '\uffff';
  let lo = 0;
  let hi = words.length;

  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (words[mid] < lower) lo = mid + 1;
    else hi = mid;
  }
  const start = lo;
  hi = words.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (words[mid] < upper) lo = mid + 1;
    else hi = mid;
  }
  return [start, lo];
}

async function handleLoadDictionary(lang: DictLang) {
  if (wordLists.has(lang)) {
    self.postMessage({ type: 'loaded', lang });
    return;
  }

  const res = await fetch(`/dictionaries/${lang}.dic`);
  if (!res.ok) {
    self.postMessage({ type: 'error', lang, error: `Failed to load dictionary: ${res.status}` });
    return;
  }

  const text = await res.text();
  const words = parseDicForPrefixIndex(text);
  wordLists.set(lang, words);
  self.postMessage({ type: 'loaded', lang });
}

function handleGetSuggestions(prefix: string, lang: DictLang, requestId: number, limit: number) {
  const words = wordLists.get(lang);
  if (!words) {
    self.postMessage({ type: 'suggestions', words: [], requestId });
    return;
  }

  const trimmed = prefix.trim().toLowerCase();
  if (!trimmed) {
    self.postMessage({ type: 'suggestions', words: [], requestId });
    return;
  }

  const [start, end] = binarySearchPrefixRange(words, trimmed);
  const result = words.slice(start, Math.min(end, start + limit));
  self.postMessage({ type: 'suggestions', words: result, requestId });
}

self.onmessage = (e: MessageEvent<WorkerMessage>) => {
  const msg = e.data;
  switch (msg.type) {
    case 'loadDictionary':
      handleLoadDictionary(msg.lang);
      break;
    case 'getSuggestions':
      handleGetSuggestions(msg.prefix, msg.lang, msg.requestId, msg.limit);
      break;
  }
};
