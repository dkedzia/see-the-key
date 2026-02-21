import type { Locale } from '../types';

export interface SplitKey {
  main: string;
  alt: string;
}

export type AlphabetType = 'latin' | 'cyrillic' | 'greek';

export interface LanguageKeyboardConfig {
  alphabet: AlphabetType;
  splitKeys?: Record<string, string[]>;
  customLayout?: { row1: string[]; row2: string[]; row3: string[] };
}

export const LATIN_ROW1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
export const LATIN_ROW2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
export const LATIN_ROW3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
export const NUMBER_ROW = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export const KEYBOARD_CONFIGS: Record<Locale, LanguageKeyboardConfig> = {
  // Albanian
  sq: {
    alphabet: 'latin',
    splitKeys: {
      c: ['ç'],
      e: ['ë'],
    },
  },

  // Belarusian (Cyrillic)
  be: {
    alphabet: 'cyrillic',
    customLayout: {
      row1: ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'ў', 'з', 'х'],
      row2: ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
      row3: ['я', 'ч', 'с', 'м', 'і', 'т', 'ь', 'б', 'ю', 'ё'],
    },
  },

  // Bosnian
  bs: {
    alphabet: 'latin',
    splitKeys: {
      c: ['č', 'ć'],
      d: ['đ'],
      s: ['š'],
      z: ['ž'],
    },
  },

  // Bulgarian (Cyrillic)
  bg: {
    alphabet: 'cyrillic',
    customLayout: {
      row1: ['я', 'в', 'е', 'р', 'т', 'ъ', 'у', 'и', 'о', 'п', 'ш', 'щ'],
      row2: ['а', 'с', 'д', 'ф', 'г', 'х', 'й', 'к', 'л', 'ю'],
      row3: ['з', 'ь', 'ц', 'ж', 'б', 'н', 'м', 'ч'],
    },
  },

  // Croatian
  hr: {
    alphabet: 'latin',
    splitKeys: {
      c: ['č', 'ć'],
      d: ['đ'],
      s: ['š'],
      z: ['ž'],
    },
  },

  // Czech
  cs: {
    alphabet: 'latin',
    splitKeys: {
      a: ['á'],
      c: ['č'],
      d: ['ď'],
      e: ['é', 'ě'],
      i: ['í'],
      n: ['ň'],
      o: ['ó'],
      r: ['ř'],
      s: ['š'],
      t: ['ť'],
      u: ['ú', 'ů'],
      y: ['ý'],
      z: ['ž'],
    },
  },

  // Danish
  da: {
    alphabet: 'latin',
    splitKeys: {
      a: ['æ', 'å'],
      o: ['ø'],
    },
  },

  // Dutch
  nl: {
    alphabet: 'latin',
    splitKeys: {},
  },

  // English
  en: {
    alphabet: 'latin',
    splitKeys: {},
  },

  // Estonian
  et: {
    alphabet: 'latin',
    splitKeys: {
      a: ['ä'],
      o: ['ö', 'õ'],
      u: ['ü'],
      s: ['š'],
      z: ['ž'],
    },
  },

  // Finnish
  fi: {
    alphabet: 'latin',
    splitKeys: {
      a: ['ä', 'å'],
      o: ['ö'],
    },
  },

  // French
  fr: {
    alphabet: 'latin',
    splitKeys: {
      a: ['à', 'â', 'æ'],
      c: ['ç'],
      e: ['é', 'è', 'ê', 'ë'],
      i: ['î', 'ï'],
      o: ['ô', 'œ'],
      u: ['ù', 'û', 'ü'],
      y: ['ÿ'],
    },
  },

  // German
  de: {
    alphabet: 'latin',
    splitKeys: {
      a: ['ä'],
      o: ['ö'],
      u: ['ü'],
      s: ['ß'],
    },
  },

  // Greek
  el: {
    alphabet: 'greek',
    customLayout: {
      row1: ['ς', 'ε', 'ρ', 'τ', 'υ', 'θ', 'ι', 'ο', 'π'],
      row2: ['α', 'σ', 'δ', 'φ', 'γ', 'η', 'ξ', 'κ', 'λ'],
      row3: ['ζ', 'χ', 'ψ', 'ω', 'β', 'ν', 'μ'],
    },
  },

  // Hungarian
  hu: {
    alphabet: 'latin',
    splitKeys: {
      a: ['á'],
      e: ['é'],
      i: ['í'],
      o: ['ó', 'ö', 'ő'],
      u: ['ú', 'ü', 'ű'],
    },
  },

  // Icelandic
  is: {
    alphabet: 'latin',
    splitKeys: {
      a: ['á', 'æ'],
      d: ['ð'],
      e: ['é'],
      i: ['í'],
      o: ['ó', 'ö'],
      u: ['ú'],
      y: ['ý'],
      t: ['þ'],
    },
  },

  // Italian
  it: {
    alphabet: 'latin',
    splitKeys: {
      a: ['à'],
      e: ['è', 'é'],
      i: ['ì'],
      o: ['ò'],
      u: ['ù'],
    },
  },

  // Latvian
  lv: {
    alphabet: 'latin',
    splitKeys: {
      a: ['ā'],
      c: ['č'],
      e: ['ē'],
      g: ['ģ'],
      i: ['ī'],
      k: ['ķ'],
      l: ['ļ'],
      n: ['ņ'],
      s: ['š'],
      u: ['ū'],
      z: ['ž'],
    },
  },

  // Lithuanian
  lt: {
    alphabet: 'latin',
    splitKeys: {
      a: ['ą'],
      c: ['č'],
      e: ['ę', 'ė'],
      i: ['į'],
      s: ['š'],
      u: ['ų', 'ū'],
      z: ['ž'],
    },
  },

  // Luxembourgish
  lb: {
    alphabet: 'latin',
    splitKeys: {
      a: ['ä'],
      e: ['ë', 'é'],
    },
  },

  // Macedonian (Cyrillic)
  mk: {
    alphabet: 'cyrillic',
    customLayout: {
      row1: ['љ', 'њ', 'е', 'р', 'т', 'ѕ', 'у', 'и', 'о', 'п', 'ш'],
      row2: ['а', 'с', 'д', 'ф', 'г', 'х', 'ј', 'к', 'л', 'ч', 'ќ'],
      row3: ['з', 'џ', 'ц', 'в', 'б', 'н', 'м', 'ѓ', 'ж'],
    },
  },

  // Maltese
  mt: {
    alphabet: 'latin',
    splitKeys: {
      c: ['ċ'],
      g: ['ġ'],
      h: ['ħ'],
      z: ['ż'],
    },
  },

  // Montenegrin
  cnr: {
    alphabet: 'latin',
    splitKeys: {
      c: ['č', 'ć'],
      d: ['đ'],
      s: ['š', 'ś'],
      z: ['ž', 'ź'],
    },
  },

  // Norwegian
  nb: {
    alphabet: 'latin',
    splitKeys: {
      a: ['æ', 'å'],
      o: ['ø'],
    },
  },

  // Polish
  pl: {
    alphabet: 'latin',
    splitKeys: {
      a: ['ą'],
      c: ['ć'],
      e: ['ę'],
      l: ['ł'],
      n: ['ń'],
      o: ['ó'],
      s: ['ś'],
      x: ['ź'],
      z: ['ż'],
    },
  },

  // Portuguese
  pt: {
    alphabet: 'latin',
    splitKeys: {
      a: ['á', 'â', 'ã', 'à'],
      c: ['ç'],
      e: ['é', 'ê'],
      i: ['í'],
      o: ['ó', 'ô', 'õ'],
      u: ['ú'],
    },
  },

  // Romanian
  ro: {
    alphabet: 'latin',
    splitKeys: {
      a: ['ă', 'â'],
      i: ['î'],
      s: ['ș'],
      t: ['ț'],
    },
  },

  // Russian (Cyrillic)
  ru: {
    alphabet: 'cyrillic',
    customLayout: {
      row1: ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
      row2: ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
      row3: ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ё'],
    },
  },

  // Serbian (Cyrillic)
  sr: {
    alphabet: 'cyrillic',
    customLayout: {
      row1: ['љ', 'њ', 'е', 'р', 'т', 'з', 'у', 'и', 'о', 'п', 'ш'],
      row2: ['а', 'с', 'д', 'ф', 'г', 'х', 'ј', 'к', 'л', 'ч', 'ћ'],
      row3: ['ѕ', 'џ', 'ц', 'в', 'б', 'н', 'м', 'ђ', 'ж'],
    },
  },

  // Slovak
  sk: {
    alphabet: 'latin',
    splitKeys: {
      a: ['á', 'ä'],
      c: ['č'],
      d: ['ď'],
      e: ['é'],
      i: ['í'],
      l: ['ĺ', 'ľ'],
      n: ['ň'],
      o: ['ó', 'ô'],
      r: ['ŕ'],
      s: ['š'],
      t: ['ť'],
      u: ['ú'],
      y: ['ý'],
      z: ['ž'],
    },
  },

  // Slovenian
  sl: {
    alphabet: 'latin',
    splitKeys: {
      c: ['č'],
      s: ['š'],
      z: ['ž'],
    },
  },

  // Spanish
  es: {
    alphabet: 'latin',
    splitKeys: {
      a: ['á'],
      e: ['é'],
      i: ['í'],
      n: ['ñ'],
      o: ['ó'],
      u: ['ú', 'ü'],
    },
  },

  // Swedish
  sv: {
    alphabet: 'latin',
    splitKeys: {
      a: ['ä', 'å'],
      o: ['ö'],
    },
  },

  // Turkish
  tr: {
    alphabet: 'latin',
    splitKeys: {
      c: ['ç'],
      g: ['ğ'],
      i: ['ı'],
      o: ['ö'],
      s: ['ş'],
      u: ['ü'],
    },
  },

  // Ukrainian (Cyrillic)
  uk: {
    alphabet: 'cyrillic',
    customLayout: {
      row1: ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ї'],
      row2: ['ф', 'і', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'є'],
      row3: ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ґ'],
    },
  },
};

export interface RowKey {
  type: 'normal' | 'split';
  main: string;
  alt?: string;
}

function expandRowWithExtras(row: string[], splitKeys: Record<string, string[]> | undefined): RowKey[] {
  if (!splitKeys) {
    return row.map((char) => ({ type: 'normal', main: char }));
  }

  const result: RowKey[] = [];
  for (const char of row) {
    const alts = splitKeys[char];
    if (!alts || alts.length === 0) {
      result.push({ type: 'normal', main: char });
    } else {
      result.push({ type: 'split', main: char, alt: alts[0] });
      for (let i = 1; i < alts.length; i += 2) {
        result.push({
          type: 'split',
          main: alts[i],
          alt: alts[i + 1] || '',
        });
      }
    }
  }
  return result;
}

export function getKeyboardRowsForLocale(locale: Locale): { row1: RowKey[]; row2: RowKey[]; row3: RowKey[] } {
  const config = KEYBOARD_CONFIGS[locale];

  if (config.customLayout) {
    return {
      row1: config.customLayout.row1.map((char) => ({ type: 'normal', main: char })),
      row2: config.customLayout.row2.map((char) => ({ type: 'normal', main: char })),
      row3: config.customLayout.row3.map((char) => ({ type: 'normal', main: char })),
    };
  }

  return {
    row1: expandRowWithExtras(LATIN_ROW1, config.splitKeys),
    row2: expandRowWithExtras(LATIN_ROW2, config.splitKeys),
    row3: expandRowWithExtras(LATIN_ROW3, config.splitKeys),
  };
}
