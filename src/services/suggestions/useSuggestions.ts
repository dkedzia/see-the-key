import { useState, useEffect, useMemo } from 'react';
import { getSuggestions, loadDictionary, type DictLang } from './suggestionService';
import type { Locale } from '../../types';

const LOCALE_TO_DICT: Record<Locale, DictLang> = {
  pl: 'pl',
  en: 'en',
};

const DEBOUNCE_MS = 180;

function extractCurrentWordPrefix(inputLine: string): string {
  if (!inputLine || inputLine.endsWith(' ')) return '';
  const lastSpace = inputLine.lastIndexOf(' ');
  return lastSpace >= 0 ? inputLine.slice(lastSpace + 1) : inputLine;
}

export function useSuggestions(inputLine: string, locale: Locale) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const dictLang = LOCALE_TO_DICT[locale];

  useEffect(() => {
    loadDictionary(dictLang);
  }, [dictLang]);

  const prefix = useMemo(() => extractCurrentWordPrefix(inputLine), [inputLine]);

  useEffect(() => {
    if (!prefix) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      getSuggestions(prefix, dictLang)
        .then(setSuggestions)
        .catch(() => setSuggestions([]));
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [prefix, dictLang]);

  return { suggestions };
}
