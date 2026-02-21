import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import sq from './locales/sq.json';
import be from './locales/be.json';
import bs from './locales/bs.json';
import bg from './locales/bg.json';
import hr from './locales/hr.json';
import cs from './locales/cs.json';
import da from './locales/da.json';
import nl from './locales/nl.json';
import en from './locales/en.json';
import et from './locales/et.json';
import fi from './locales/fi.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import el from './locales/el.json';
import hu from './locales/hu.json';
import is from './locales/is.json';
import it from './locales/it.json';
import lv from './locales/lv.json';
import lt from './locales/lt.json';
import lb from './locales/lb.json';
import mk from './locales/mk.json';
import mt from './locales/mt.json';
import cnr from './locales/cnr.json';
import nb from './locales/nb.json';
import pl from './locales/pl.json';
import pt from './locales/pt.json';
import ro from './locales/ro.json';
import ru from './locales/ru.json';
import sr from './locales/sr.json';
import sk from './locales/sk.json';
import sl from './locales/sl.json';
import es from './locales/es.json';
import sv from './locales/sv.json';
import tr from './locales/tr.json';
import uk from './locales/uk.json';

const AVAILABLE_LOCALE_CODES = [
  'sq', 'be', 'bs', 'bg', 'hr', 'cs', 'da', 'nl', 'en', 'et',
  'fi', 'fr', 'de', 'el', 'hu', 'is', 'it', 'lv', 'lt', 'lb',
  'mk', 'mt', 'cnr', 'nb', 'pl', 'pt', 'ro', 'ru', 'sr', 'sk',
  'sl', 'es', 'sv', 'tr', 'uk',
];

function getSystemLocale(): string {
  const browserLangs = navigator.languages || [navigator.language];
  for (const lang of browserLangs) {
    const code = lang.split('-')[0].toLowerCase();
    if (AVAILABLE_LOCALE_CODES.includes(code)) {
      return code;
    }
  }
  return 'en';
}

function getStoredLocale(): string {
  const stored = localStorage.getItem('locale');
  if (stored && AVAILABLE_LOCALE_CODES.includes(stored)) {
    return stored;
  }
  return getSystemLocale();
}

i18n.use(initReactI18next).init({
  resources: {
    sq: { translation: sq },
    be: { translation: be },
    bs: { translation: bs },
    bg: { translation: bg },
    hr: { translation: hr },
    cs: { translation: cs },
    da: { translation: da },
    nl: { translation: nl },
    en: { translation: en },
    et: { translation: et },
    fi: { translation: fi },
    fr: { translation: fr },
    de: { translation: de },
    el: { translation: el },
    hu: { translation: hu },
    is: { translation: is },
    it: { translation: it },
    lv: { translation: lv },
    lt: { translation: lt },
    lb: { translation: lb },
    mk: { translation: mk },
    mt: { translation: mt },
    cnr: { translation: cnr },
    nb: { translation: nb },
    pl: { translation: pl },
    pt: { translation: pt },
    ro: { translation: ro },
    ru: { translation: ru },
    sr: { translation: sr },
    sk: { translation: sk },
    sl: { translation: sl },
    es: { translation: es },
    sv: { translation: sv },
    tr: { translation: tr },
    uk: { translation: uk },
  },
  lng: getStoredLocale(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
