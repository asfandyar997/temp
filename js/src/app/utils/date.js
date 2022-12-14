let dateFormat = function () {
    const token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        let dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length === 1 && Object.prototype.toString.call(date) === "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date();
        if (isNaN(date)) {
            date = new Date();
        }

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) === "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        const _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d: d,
                dd: pad(d),
                ddd: dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m: m + 1,
                mm: pad(m + 1),
                mmm: dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy: String(y).slice(2),
                yyyy: y,
                h: H % 12 || 12,
                hh: pad(H % 12 || 12),
                H: H,
                HH: pad(H),
                M: M,
                MM: pad(M),
                s: s,
                ss: pad(s),
                l: pad(L, 3),
                L: pad(L > 99 ? Math.round(L / 10) : L),
                t: H < 12 ? "a" : "p",
                tt: H < 12 ? "am" : "pm",
                T: H < 12 ? "A" : "P",
                TT: H < 12 ? "AM" : "PM",
                Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 !== 10) * d % 10]
            };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoFullDateTime: "yyyy-mm-dd HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
    ukDateTime: "d/mm/yyyy hh:MM TT"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

let timezoneOffset = function () {
    let date = new Date(),
        timezoneOffset = date.getTimezoneOffset(),
        hours = ('00' + Math.floor(Math.abs(timezoneOffset / 60))).slice(-2),
        minutes = ('00' + Math.abs(timezoneOffset % 60)).slice(-2);

    return (timezoneOffset >= 0 ? '-' : '+') + hours + ':' + minutes;
};

export default class {

    static FORMATS = dateFormat.masks;

    constructor(date) {
        this.date = date;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        if (value instanceof Date) {
            this._date = value;
        } else {
            this._date = new Date(value.replace(/ /g, 'T') + (value.indexOf('+') === -1 ? timezoneOffset() : ''));
        }
    }

    static timezoneOffset() {
        return timezoneOffset();
    }

    static format(date, mask, utc) {
        return dateFormat(date, mask, utc);
    }

    static ts() {
        return ~~(Date.now() / 1000);
    }

    static week(dt) {
        return (new this(dt)).week();
    }

    static startOfWeek(dt) {
        return (new this(dt)).startOfWeek();
    }

    static timeComponents(ms, pad = false) {
        let cd = 24 * 60 * 60 * 1000,
            ch = 60 * 60 * 1000,
            cm = 60 * 1000,
            cs = 1000,
            d = Math.floor(ms / cd),
            h = Math.floor((ms - d * cd) / ch),
            m = Math.floor((ms - d * cd - h * ch) / cm),
            s = Math.round((ms - d * cd - h * ch - m * cm) / cs),
            leadingZero = function (n) {
                return n < 10 ? '0' + n : n;
            };
        if (m === 60) {
            h++;
            m = 0;
        }
        if (h === 24) {
            d++;
            h = 0;
        }
        return {
            days: pad ? leadingZero(d) : d,
            hours: pad ? leadingZero(h) : h,
            minutes: pad ? leadingZero(m) : m,
            seconds: pad ? leadingZero(s) : s
        };
    }

    format(mask, utc) {
        return dateFormat(this.date, mask, utc);
    }

    ts(noTime = false) {
        if (noTime) {
            let t = new Date(this.date.getTime());
            t.setHours(0, 0, 0, 0);
            return ~~(t.getTime() / 1e3);
        }
        return ~~(this.date.getTime() / 1e3);
    }

    week() {
        const d = new Date(Date.UTC(this.date.getFullYear(), this.date.getMonth(), this.date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }

    startOfWeek() {
        const diff = this.date.getDate() - this.date.getDay() + (this.date.getDay() === 0 ? -6 : 1);
        return new Date(this.date.setDate(diff));
    }
}
