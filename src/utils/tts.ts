import { speak } from 'tauri-plugin-tts-api';
import type { Locale } from '../types';

const LOCALE_TO_TTS: Record<Locale, string> = {
  sq: 'sq-AL',
  be: 'be-BY',
  bs: 'bs-BA',
  bg: 'bg-BG',
  hr: 'hr-HR',
  cs: 'cs-CZ',
  da: 'da-DK',
  nl: 'nl-NL',
  en: 'en-US',
  et: 'et-EE',
  fi: 'fi-FI',
  fr: 'fr-FR',
  de: 'de-DE',
  el: 'el-GR',
  hu: 'hu-HU',
  is: 'is-IS',
  it: 'it-IT',
  lv: 'lv-LV',
  lt: 'lt-LT',
  lb: 'lb-LU',
  mk: 'mk-MK',
  mt: 'mt-MT',
  cnr: 'sr-ME',
  nb: 'nb-NO',
  pl: 'pl-PL',
  pt: 'pt-PT',
  ro: 'ro-RO',
  ru: 'ru-RU',
  sr: 'sr-RS',
  sk: 'sk-SK',
  sl: 'sl-SI',
  es: 'es-ES',
  sv: 'sv-SE',
  tr: 'tr-TR',
  uk: 'uk-UA',
};

export async function speakText(text: string, locale: Locale) {
  const language = LOCALE_TO_TTS[locale] || 'en-US';
  await speak({
    text,
    language,
    voiceId: null,
    rate: null,
    pitch: null,
    volume: null,
    queueMode: 'flush',
  });
}
