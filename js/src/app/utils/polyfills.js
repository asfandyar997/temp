/**
 * Global JS extensions/polyfills
 */
(function () {
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                // closest thing possible to the ECMAScript 5 internal IsCallable function
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            let aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {
                },
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        }
    }

    /**
     * Delay a function call for `timeout' milliseconds.  You can optionally bind the function using a different
     * context as well.
     *
     * @param _this {Object} - the context to bind to the function when calling (defaults to the function if null)
     * @param timeout {Number} - the time to wait before calling the function in milliseconds
     * @returns id to use with clearTimeout for clearing the timeout
     * Any other arguments are passed as standard arguments to the function when called.
     */
    if (!Function.prototype.delay) {
        Function.prototype.delay = Function.prototype.delay || function (/* context, timeout, arguments */) {
            if (typeof this !== 'function') {
                throw new TypeError("Function.prototype.delay - being called on a non-function object");
            }

            let has_context = (typeof arguments[0] == 'object'),
                args = [].slice.call(arguments, has_context ? 1 : 0),
                timeout = parseInt(args.shift(), 10),
                func = this,
                context = has_context ? arguments[0] : func;

            return window.setTimeout(function () {
                func.apply(context, args)
            }, timeout);
        }
    }

    /**
     * Repeat a function on a periodic interval, with an optional upper limit to the number of times to repeat
     * the function call.  You can optionally bind the function using a different context as well.
     *
     * @param {Object} context - the context to bind to the function when calling (defaults to the function if null)
     * @param {Number} timeout - the time to wait before calling the function in milliseconds
     * @param {Number} max - the number of calls to limit this too (null or 0 means no limit)
     * @returns {Number} id - the interval id to use with clearInterval
     *
     * Any other arguments are passed as standard arguments to the function when called.
     */
    if (!Function.prototype.repeat) {
        Function.prototype.repeat = Function.prototype.repeat || function (/* context, timeout, max, arguments */) {
            if (typeof this !== 'function') {
                throw new TypeError("Function.prototype.repeat - being called on a non-function object");
            }

            let has_context = (typeof arguments[0] == 'object'),
                args = [].slice.call(arguments, has_context ? 1 : 0),
                timeout = parseInt(args.shift(), 10),
                limit = parseInt(args.shift(), 10) || false,
                func = this,
                context = has_context ? arguments[0] : func,
                interval;

            interval = window.setInterval((function () {
                let count = 0;
                return function () {
                    count++;
                    if (limit && count >= limit) {
                        window.clearInterval(interval);
                        return;
                    }
                    func.apply(context, args);
                };
            })(), timeout);

            return interval;
        }
    }

    if (!Function.prototype.defer) {
        (function () {
            let timeouts = [],
                messageName = 'messageZeroTimeout';

            function setDeferTimeout(scope) {
                if (typeof this !== 'undefined') {
                    timeouts.push(this.bind(scope));
                } else {
                    timeouts.push(this);
                }
                window.postMessage(messageName, "*");
            }

            function handleMessage(event) {
                if (event.source !== window || event.data !== messageName) return false;
                event.stopPropagation();
                if (timeouts.length === 0) return false;
                let fn = timeouts.shift();
                fn();
            }

            window.addEventListener('message', handleMessage, true);

            Function.prototype.defer = setDeferTimeout;
        })();
    }

    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (fun /*, thisp*/) {
            const len = this.length;
            if (typeof fun != 'function')
                throw new TypeError();

            let thisp = arguments[1];
            for (let i = 0; i < len; i++) {
                if (i in this)
                    fun.call(thisp, this[i], i, this);
            }
        };
    }

    if (!Array.prototype.move) {
        Array.prototype.move = function (from, to) {
            this.splice(to, 0, this.splice(from, 1)[0]);
            return this;
        };
    }

    window.$$ = function (query, context) {
        return Array.prototype.slice.call(
            (context || document).querySelectorAll(query)
        );
    };

    // make sure we have the sendAsBinary method on all browsers
    XMLHttpRequest.prototype.binarySend = function (data) {
        let blob;
        /**
         * If input is text data (text param) - readAsBinaryString deprecated
         *
         * var data = new ArrayBuffer(text.length);
         * var ui8a = new Uint8Array(data, 0);
         * for (var i = 0; i < text.length; i++) ui8a[i] = (text.charCodeAt(i) & 0xff);
         */

        if (typeof window.Blob == 'function') {
            blob = new Blob([data]);
        } else {
            let bb = new (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)();
            bb.append(data);
            blob = bb.getBlob();
        }

        this.send(blob);
    };

    /* Console log helper */
    window.log = function (obj, label) {
        console.log(obj, label);
    };

    if (!Array.prototype.find) {
        Array.prototype.find = function (predicate) {
            if (this === null) {
                throw new TypeError('Array.prototype.find called on null or undefined')
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function')
            }
            let list = Object(this);
            let length = list.length >>> 0;
            let thisArg = arguments[1];
            let value;

            for (let i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value
                }
            }
            return undefined
        }
    }

    if (window && typeof window.CustomEvent !== "function") {
        function CustomEvent(event, params) {
            params = params || {
                bubbles: false,
                cancelable: false,
                detail: undefined
            };
            let evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }

        if (typeof window.Event !== 'undefined') {
            CustomEvent.prototype = window.Event.prototype
        }

        window.CustomEvent = CustomEvent;
    }

    Element.prototype.scrollIntoViewPromise = function (options) {

        this.scrollIntoView(options);

        let parent = this;

        return {
            then: function (x) {
                // Check out https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API for more informations
                const intersectionObserver = new IntersectionObserver((entries) => {
                    let [entry] = entries;

                    // When the scroll ends (when our element is inside the screen)
                    if (entry.isIntersecting) {

                        // Execute the function into then parameter and stop observing the html element
                        setTimeout(() => {
                            x();
                            intersectionObserver.unobserve(parent)
                        }, 100)
                    }
                });

                // I start to observe the element where I scrolled
                intersectionObserver.observe(parent);
            }
        };
    };

}).call(window);
