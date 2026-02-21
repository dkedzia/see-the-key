export interface HistoryItem {
  id: string;
  text: string;
  createdAt: number;
}

export type Locale =
  | 'sq'   // Albanian
  | 'be'   // Belarusian
  | 'bs'   // Bosnian
  | 'bg'   // Bulgarian
  | 'hr'   // Croatian
  | 'cs'   // Czech
  | 'da'   // Danish
  | 'nl'   // Dutch
  | 'en'   // English
  | 'et'   // Estonian
  | 'fi'   // Finnish
  | 'fr'   // French
  | 'de'   // German
  | 'el'   // Greek
  | 'hu'   // Hungarian
  | 'is'   // Icelandic
  | 'it'   // Italian
  | 'lv'   // Latvian
  | 'lt'   // Lithuanian
  | 'lb'   // Luxembourgish
  | 'mk'   // Macedonian
  | 'mt'   // Maltese
  | 'cnr'  // Montenegrin
  | 'nb'   // Norwegian
  | 'pl'   // Polish
  | 'pt'   // Portuguese
  | 'ro'   // Romanian
  | 'ru'   // Russian
  | 'sr'   // Serbian
  | 'sk'   // Slovak
  | 'sl'   // Slovenian
  | 'es'   // Spanish
  | 'sv'   // Swedish
  | 'tr'   // Turkish
  | 'uk';  // Ukrainian

export type Theme = 'auto' | 'light' | 'dark';
