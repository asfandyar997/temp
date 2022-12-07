export default class {

    static validate = {
        postcode(value) {
            return /[A-Z]{1,2}[0-9]{1,2}[A-Z]? ?[0-9][A-Z]{2}/i.test(value);
        }
    };

    static noop = () => {
    };

    static empty(obj) {
        return (!obj || typeof obj === 'undefined' || String(obj).trim() === '');
    }

    static emptyObject(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    static isObject(obj) {
        return obj === Object(obj);
    }

    static debounce(func, wait, immediate) {
        let timeout;
        return function () {
            let context = this, args = arguments;
            let later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    static guid() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
    }

    static guids(...keys) {
        let obj = {};
        keys.forEach(function (value) {
            obj[value] = guid();
        });
        return obj;
    }

    static extract(obj, context) {
        context = context || window;
        for (const key in obj) context[key] = obj[key];
    }

    static get(obj, str) {
        str = str || '';
        try {
            return str.split('.').reduce(function (o, x) {
                return o[x]
            }, obj);
        } catch (e) {
            console.warn(obj, e.message + ' 🠒 ' + str);
        }
    }

    static format(str, ...args) {
        for (const k in args) {
            str = str.replace(new RegExp("\\{" + k + "\\}", 'g'), args[k]);
        }
        return str
    }

    static br2nl(string) {
        return string.replace(/<br\s*\/?>/mg, "\n");
    }

    static nl2br(string) {
        return string.replace(/(?:\r\n|\r|\n)/g, '<br>');
    }

    static decodeEntities(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    static capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * Deep copy of object. Shallow copy can be made by using spread operator {...a}
     *
     * @param o Object.
     * @returns {{}|*[]|*}
     */
    static deepCopy(o) {
        let newO,
            i;

        if (typeof o !== 'object') {
            return o;
        }
        if (!o) {
            return o;
        }

        if ('[object Array]' === Object.prototype.toString.apply(o)) {
            newO = [];
            for (i = 0; i < o.length; i += 1) {
                newO[i] = this.deepCopy(o[i]);
            }
            return newO;
        }

        newO = {};
        for (i in o) {
            if (o.hasOwnProperty(i)) {
                newO[i] = this.deepCopy(o[i]);
            }
        }
        return newO;
    }

    static clone(o) {
        return this.deepCopy(o);
    }

    static toPlainObject(o) {
        return JSON.parse(JSON.stringify(o));
    }

    static move(arr, from, to) {
        arr.splice(to, 0, arr.splice(from, 1)[0]);
    }

    static stripTags(str) {
        return str.replace(/<\/?[^>]+(>|$)/g, '');
    }

    /**
     * Remove query string parameters (silently)
     */
    static clearUrl() {
        window.history.replaceState({}, document.title, location.hash.split('?')[0]);
    }

    static ip() {
        return new Promise(r => {
            var w = window,
                a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({iceServers: []}),
                b = () => {
                };
            a.createDataChannel("");
            a.createOffer(c => a.setLocalDescription(c, b, b), b);
            a.onicecandidate = c => {
                try {
                    c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)
                } catch (e) {
                }
            }
        })
    }

    static scrollTo(destination, duration = 200, easing = 'linear', callback) {

        const easings = {
            linear(t) {
                return t;
            },
            easeInQuad(t) {
                return t * t;
            },
            easeOutQuad(t) {
                return t * (2 - t);
            },
            easeInOutQuad(t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            },
            easeInCubic(t) {
                return t * t * t;
            },
            easeOutCubic(t) {
                return (--t) * t * t + 1;
            },
            easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            },
            easeInQuart(t) {
                return t * t * t * t;
            },
            easeOutQuart(t) {
                return 1 - (--t) * t * t * t;
            },
            easeInOutQuart(t) {
                return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
            },
            easeInQuint(t) {
                return t * t * t * t * t;
            },
            easeOutQuint(t) {
                return 1 + (--t) * t * t * t * t;
            },
            easeInOutQuint(t) {
                return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
            }
        };

        const
            start = window.pageYOffset,
            startTime = 'now' in window.performance ? performance.now() : new Date().getTime(),
            documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight),
            windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight,
            destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop,
            destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

        if ('requestAnimationFrame' in window === false || duration === 0) {
            window.scroll(0, destinationOffsetToScroll);
            if (callback) {
                callback();
            }
            return;
        }

        function scroll() {
            const now = 'now' in window.performance ? performance.now() : new Date().getTime();
            const time = Math.min(1, ((now - startTime) / duration));
            const timeFunction = easings[easing](time);
            window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

            if (window.pageYOffset === destinationOffsetToScroll) {
                if (callback) {
                    callback();
                }
                return;
            }

            requestAnimationFrame(scroll);
        }

        scroll();
    }

    static isMobile() {
        let check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    static isSafari() {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }

    static urlBase64ToUint8Array(base64String) {
        let padding = '='.repeat((4 - base64String.length % 4) % 4),
            base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

        let rawData = window.atob(base64),
            outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    static trimHtml(html, options) {

        options = options || {};

        const
            limit = options.limit || 100,
            preserveTags = (typeof options.preserveTags !== 'undefined') ? options.preserveTags : true,
            wordBreak = (typeof options.wordBreak !== 'undefined') ? options.wordBreak : false,
            suffix = options.suffix || '...',
            moreLink = options.moreLink || '';

        let arr = html.replace(/</g, "\n<")
            .replace(/>/g, ">\n")
            .replace(/\n\n/g, "\n")
            .replace(/^\n/g, "")
            .replace(/\n$/g, "")
            .split("\n");

        let sum = 0,
            row, cut, add,
            rowCut,
            tagMatch,
            tagName,
            tagStack = [],
            more = false;

        for (let i = 0; i < arr.length; i++) {

            row = arr[i];
            // count multiple spaces as one character
            rowCut = row.replace(/[ ]+/g, ' ');

            if (!row.length) {
                continue;
            }

            if (row[0] !== '<') {

                if (sum >= limit) {
                    row = '';
                } else if ((sum + rowCut.length) >= limit) {

                    cut = limit - sum;

                    if (row[cut - 1] === ' ') {
                        while (cut) {
                            cut -= 1;
                            if (row[cut - 1] !== ' ') {
                                break;
                            }
                        }
                    } else {

                        add = row.substring(cut).split('').indexOf(' ');

                        // break on halh of word
                        if (!wordBreak) {
                            if (add !== -1) {
                                cut += add;
                            } else {
                                cut = row.length;
                            }
                        }
                    }

                    row = row.substring(0, cut) + suffix;

                    if (moreLink) {
                        row += moreLink;
                    }

                    sum = limit;
                    more = true;
                } else {
                    sum += rowCut.length;
                }
            } else if (!preserveTags) {
                row = '';
            } else if (sum >= limit) {

                tagMatch = row.match(/[a-zA-Z]+/);
                tagName = tagMatch ? tagMatch[0] : '';

                if (tagName) {
                    if (row.substring(0, 2) !== '</') {

                        tagStack.push(tagName);
                        row = '';
                    } else {

                        while (tagStack[tagStack.length - 1] !== tagName && tagStack.length) {
                            tagStack.pop();
                        }

                        if (tagStack.length) {
                            row = '';
                        }

                        tagStack.pop();
                    }
                } else {
                    row = '';
                }
            }

            arr[i] = row;
        }

        return {
            html: arr.join("\n").replace(/\n/g, ""),
            more: more
        };
    }

    /**
     * Check whether the node is visible / inside the viewport
     *
     * @param el
     * @param entire
     * @returns {boolean}
     */
    static isElementInViewport(el, entire = false) {
        const rect = el.getBoundingClientRect();

        if (entire) {
            return rect.bottom > 0 &&
                rect.right > 0 &&
                rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
                rect.top < (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */;
        } else {
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    }

    static objectEntries(obj) {
        const ownProps = Object.keys(obj);
        let i = ownProps.length;
        const resArray = new Array(i); // preallocate the Array
        while (i--) {
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
        }

        return resArray;
    }

    static toUrlParams(obj) {
        if (obj instanceof FormData) {
            const arr = [];
            obj.forEach(((value, key) => {
                arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`);
            }));
            return arr.join("&");
        }
        const getPairs = (ob, keys = []) =>
            this.objectEntries(ob).reduce((pairs, [key, value]) => {
                if (typeof value === "object") {
                    pairs.push(...getPairs(value, [...keys, key]));
                } else {
                    pairs.push([[...keys, key], value]);
                }
                return pairs;
            }, []);
        const x = getPairs(obj)
            .map(([[key0, ...keysRest], value]) =>
                `${key0}${keysRest.map((a) => `[${a}]`).join("")}=${value}`)
            .join("&");
        return x;
    }
}
