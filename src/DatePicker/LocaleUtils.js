import assign_ from 'lodash/assign';
import setDay from 'date-fns/set_day';
import format from 'date-fns/format';
import en from 'date-fns/locale/en';
import es from 'date-fns/locale/es';
import pt from 'date-fns/locale/pt';
import fr from 'date-fns/locale/fr';
import de from 'date-fns/locale/de';
import pl from 'date-fns/locale/pl';
import it from 'date-fns/locale/it';
import ru from 'date-fns/locale/ru';
import ja from 'date-fns/locale/ja';
import ko from 'date-fns/locale/ko';
import tr from 'date-fns/locale/tr';
import sv from 'date-fns/locale/sv';
import nl from 'date-fns/locale/nl';
import da from 'date-fns/locale/da';
import * as no from 'date-fns/locale/nb';

const predefinedLocales = {
  en,
  es,
  pt,
  fr,
  de,
  pl,
  it,
  ru,
  ja,
  ko,
  tr,
  sv,
  no,
  nl,
  da
};

const getLocales = extLocales => assign_(predefinedLocales, extLocales);

export function formatDate(date, dateFormat, locale, extLocales) {
  return format(date, dateFormat, {locale: getLocales(extLocales)[locale]});
}

export default (locale, extLocales) => {
  const locales = getLocales(extLocales);
  return {
    formatMonthTitle: date => format(date, 'MMMM YYYY', {
      locale: locales[locale]
    }),

    formatWeekdayShort: index => format(setDay(new Date(), index), 'dd', {
      locale: locales[locale]
    }),

    formatWeekdayLong: index => format(setDay(new Date(), index), 'dddd', {
      locale: locales[locale]
    }),

    formatDay: date =>
      format(date, 'ddd ll', {
        locale: locales[locale]
      }),

    getMonths: () =>
      [...Array(12).keys()].map(i =>
        format(new Date(2018, i), 'MMMM', {locale: locales[locale]})
      )
  };
};
