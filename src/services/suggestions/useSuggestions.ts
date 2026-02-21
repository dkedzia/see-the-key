import { useState, useEffect, useMemo } from 'react';
import { getSuggestions, loadDictionary } from './suggestionService';
import type { Locale } from '../../types';

const DEBOUNCE_MS = 180;

function extractCurrentWordPrefix(inputLine: string): string {
  if (!inputLine || inputLine.endsWith(' ')) return '';
  const lastSpace = inputLine.lastIndexOf(' ');
  return lastSpace >= 0 ? inputLine.slice(lastSpace + 1) : inputLine;
}

export function useSuggestions(inputLine: string, locale: Locale) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    loadDictionary(locale);
  }, [locale]);

  const prefix = useMemo(() => extractCurrentWordPrefix(inputLine), [inputLine]);

  useEffect(() => {
    if (!prefix) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      getSuggestions(prefix, locale)
        .then(setSuggestions)
        .catch(() => setSuggestions([]));
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [prefix, locale]);

  return { suggestions };
}
