import _ from './utilities';
import DateTime from './date';

export default {
    empty(value, replacement = '--') {
        return _.empty(value) ? replacement : value;
    },
    dateTime(value, replacement = '--', format = 'd mmmm yyyy hh:MM TT') {
        return _.empty(value) ? replacement : new DateTime(value).format(format);
    },
    /**
     * Format date as follow:
     *
     * - less than 1 minute = ’Just now’
     * - greater than 1 minute, less than 60 minutes = ’x mins ago’
     * - greater than 60 minutes, less than 24 hours = ’x hrs ago’
     * - greater than 24 hours, less than 7 days = ’x days ago’
     * - greater than 7 days ago = display date and time of post ’HH:MM DD/MM/YY’
     *
     * @returns {string}
     * @param date
     * @param map
     */
    prettyDate(date = new Date(), map = {
        's': 'Sent',
        'n': 'Just now',
        'm': ' mins ago',
        'h': ' hrs ago',
        'd': ' days ago',
        'e': 'HH:MM dd/mm/yy'
    }) {
        let now = DateTime.ts(),
            dt = new DateTime(date),
            ts = dt.ts(),
            diff = now - ts;
        if (diff < 0) {
            return map.s;
        } else if (diff >= 0 && diff <= 60) {
            return map.n;
        } else if (diff > 60 && diff <= 3600) {
            return Math.ceil(diff / 60) + map.m;
        } else if (diff > 3600 && diff <= 3600 * 24) {
            return Math.ceil(diff / 3600) + map.h;
        } else if (diff > 3600 * 24 && diff <= 3600 * 24 * 7) {
            return Math.ceil(diff / (3600 * 24)) + map.d;
        } else {
            return dt.format(map.e)
        }
    },
    prettyTime(time = new Date()) {
        return new DateTime(time).format(DateTime.FORMATS.shortTime);
    },
    price(value, locale = "en-UK", options = {
        style: 'currency',
        currency: 'GBP'
    }) {
        return new Intl.NumberFormat(locale, options).format(value);
    }
}
