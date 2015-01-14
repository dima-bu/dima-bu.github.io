/*! sandy-loader-helper - v0.2.1 - 2015-01-12 11:31:05 */
/**
 * @name sandy-loader-helper
 * @description SandyJS is a little Javascript loader with module support and helpers.
 * @version 0.2.1
 * @author Cherrionella
 */

;(function (root, factory) {
    // Set up SandyJS appropriately for the environment. Start with AMD.
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'exports'], function (_, exports) {
            // Export global even in AMD case in case this script is loaded with
            // others that may still expect a global Sandy.
            root.Sandy = factory(root, exports, _);
        });
    } else {
        // Finally, as a browser global.
        root.Sandy = factory(root, {}, root._);
    }

}(this, function (root, Sandy, _) {
    "use strict";
//Little helpers
function isString(value) {
    return typeof value === 'string';
}

if ( Math.sign === undefined ) {
    Math.sign = function ( x ) {
        return ( x < 0 ) ? - 1 : ( x > 0 ) ? 1 : 0;
    };
}

//Totally bad practice to override JS global objects' prototype

Number.prototype.toLeadingZero = function(count) {
    count = count || 2;
    var len = this.toString().length;
    var str = '';
    for(var i=0;i<count - len;i++)
        str += '0';
    str += this;
    return str;
};

Number.prototype.isPositive = function() {
    return (this > 0);
};

(function (Date, undefined) {
    var origParse = Date.parse, numericKeys = [ 1, 4, 5, 6, 7, 10, 11 ];
    Date.parse = function (date) {
        var timestamp, struct, minutesOffset = 0;

        // ES5 §15.9.4.2 states that the string should attempt to be parsed as a Date Time String Format string
        // before falling back to any implementation-specific date parsing, so that’s what we do, even if native
        // implementations could be faster
        //              1 YYYY                2 MM       3 DD           4 HH    5 mm       6 ss        7 msec        8 Z 9 ±    10 tzHH    11 tzmm
        if ((struct = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(date))) {
            // avoid NaN timestamps caused by “undefined” values being passed to Date.UTC
            for (var i = 0, k; (k = numericKeys[i]); ++i) {
                struct[k] = +struct[k] || 0;
            }

            // allow undefined days and months
            struct[2] = (+struct[2] || 1) - 1;
            struct[3] = +struct[3] || 1;

            if (struct[8] !== 'Z' && struct[9] !== undefined) {
                minutesOffset = struct[10] * 60 + struct[11];

                if (struct[9] === '+') {
                    minutesOffset = 0 - minutesOffset;
                }
            }

            timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
        }
        else {
            timestamp = origParse ? origParse(date) : NaN;
        }

        return timestamp;
    };
}(Date));

if(Date !== undefined) {
    Date.prototype.toISO8601 = function() {
        var timezoneOffset = this.getTimezoneOffset();
        var symbol = (timezoneOffset < 0) ? '+' : '-';
        timezoneOffset = Math.abs(timezoneOffset);
        return this.getFullYear() + '-' + (this.getMonth()+1).toLeadingZero() + '-' + this.getDate().toLeadingZero() + 'T' + this.getHours().toLeadingZero() + ':' + this.getMinutes().toLeadingZero() + ':' + this.getSeconds().toLeadingZero() + symbol + Math.floor(timezoneOffset/60).toLeadingZero() + ':' + (timezoneOffset%60).toLeadingZero();
    }
}

Sandy.version = '0.2.1';

Sandy.debugEnabled = true;

Sandy.globals = {
    //Config settings
    config: {}
};

Sandy.setConfig = function(section, value) {
    if(!Sandy.globals.config[section])
        Sandy.globals.config[section] = {};
    Sandy.globals.config[section] = _.defaults(value, Sandy.globals.config[section]);
};

Sandy.getConfig = function(section) {
    return Sandy.globals.config[section];
};

Sandy.setConfig('Sandy', {
    //Autoload modules
    autoload: true,
    //Root path where modules are located
    autoloadPath: 'components',
    alternativePath: 'vendor'
});

var _ua = window._ua || '';

if(navigator)
    _ua = navigator.userAgent.toLowerCase();

var browser = Sandy.globals.browser = {
    version: (_ua.match(/.+(?:me|ox|on|rv|it|era|opr|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
    opera: (/opera/i.test(_ua) || /opr/i.test(_ua)),
    msie: (/msie/i.test(_ua) && !/opera/i.test(_ua) || /trident\//i.test(_ua)),
    msie6: (/msie 6/i.test(_ua) && !/opera/i.test(_ua)),
    msie7: (/msie 7/i.test(_ua) && !/opera/i.test(_ua)),
    msie8: (/msie 8/i.test(_ua) && !/opera/i.test(_ua)),
    msie9: (/msie 9/i.test(_ua) && !/opera/i.test(_ua)),
    mozilla: /firefox/i.test(_ua),
    chrome: /chrome/i.test(_ua),
    safari: (!(/chrome/i.test(_ua)) && /webkit|safari|khtml/i.test(_ua)),
    iphone: /iphone/i.test(_ua),
    ipod: /ipod/i.test(_ua),
    iphone4: /iphone.*OS 4/i.test(_ua),
    ipod4: /ipod.*OS 4/i.test(_ua),
    ipad: /ipad/i.test(_ua),
    android: /android/i.test(_ua),
    bada: /bada/i.test(_ua),
    mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(_ua),
    msie_mobile: /iemobile/i.test(_ua),
    safari_mobile: /iphone|ipod|ipad/i.test(_ua),
    opera_mobile: /opera mini|opera mobi/i.test(_ua),
    opera_mini: /opera mini/i.test(_ua),
    mac: /mac/i.test(_ua)
};

var _logTimer = (new Date()).getTime();


var createTimedString = function() {};
if(performance.now) {
    createTimedString = function() {
        return '[' + Math.round(performance.now()) + ' ms] ';
    }
} else {
    createTimedString = function() {
        return '[' + (((new Date()) - _logTimer)) + ' ms] ';
    }
}

var _oldLog = console.log;
var _oldWarn = console.warn;
var _oldError = console.error;
var _oldInfo = console.info;

/**
 * Overriding default logging so we can use standard logging functions in pretty view
 * @param type {string}
 */
Sandy.globals.debugLog = function (type) {
    try {
        var t = createTimedString();
        if (window.console && console.log) {
            var args = Array.prototype.slice.call(arguments);
            if (type)
                args.shift();
            args.unshift(t);
            if (browser.msie) {
                if (type == 'info')
                    _oldInfo(args.join(' '));
                else if (type == 'warn')
                    _oldWarn(args.join(' '));
                else if (type == 'error')
                    _oldError(args.join(' '));
                else
                    _oldLog(args.join(' '));
            } else {
                if (type == 'info')
                    _oldInfo.apply(console, args);
                else if (type == 'warn')
                    _oldWarn.apply(console, args);
                else if (type == 'error')
                    _oldError.apply(console, args);
                else
                    _oldLog.apply(console, args);
            }
        }
    } catch (e) {
    }
};

console.log = function () {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('log');
    Sandy.globals.debugLog.apply(this, args);
};
console.warn = function () {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('warn');
    Sandy.globals.debugLog.apply(this, args);
};
console.info = function () {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('info');
    Sandy.globals.debugLog.apply(this, args);
};
console.error = function () {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('error');
    Sandy.globals.debugLog.apply(this, args);
};

Sandy.debug = function() {
    if(Sandy.debugEnabled) {
        var args = Array.prototype.slice.call(arguments);
        console.log.apply(this, args);
    }
};
Sandy.debugWarn = function() {
    if(Sandy.debugEnabled) {
        var args = Array.prototype.slice.call(arguments);
        console.warn.apply(this, args);
    }
};
Sandy.debugInfo = function() {
    if(Sandy.debugEnabled) {
        var args = Array.prototype.slice.call(arguments);
        console.info.apply(this, args);
    }
};
Sandy.debugError = function() {
    if(Sandy.debugEnabled) {
        var args = Array.prototype.slice.call(arguments);
        console.error.apply(this, args);
    }
};

Sandy.loaded = false;

Sandy.setLoadState = function(state) {
    state = state || false;
    Sandy.loaded = state;
    _.each(document.body.getElementsByClassName('app-loading'), function(el) {
        el.style.visibility = 'hidden';
        el.style.opacity = 0;
    });
    _.each(document.body.getElementsByClassName('app-loaded'),function(el) {
        el.style.visibility = 'visible';
        el.style.opacity = 1;
    });
};

var style = document.createElement('style');
style.textContent = '.app-loading { visibility: visible; opacity: 1; transition: opacity 0.5s linear; } .app-loaded { visibility: hidden; opacity: 0; transition: opacity 0.5s linear; }';
document.head.appendChild(style);
var Profiler = Sandy.Profiler = {
    timings: {},
    havePerformanceTimer: (performance.now) ? true : false,
    start: function (mark) {
        var total = 0;
        var calls = 0;
        if (this.timings[mark]) {
            total = this.timings[mark].total;
            calls = this.timings[mark].calls + 1;
        }
        this.timings[mark] = {
            total: total,
            calls: calls,
            timeStart: (this.havePerformanceTimer) ? performance.now() : Date.now(),
            timeEnd: null
        }
    },
    stop: function (mark) {
        if (this.timings[mark].timeEnd == null) {
            this.timings[mark].timeEnd = (this.havePerformanceTimer) ? performance.now() : Date.now();
            var time = this.timings[mark].timeEnd - this.timings[mark].timeStart;
            this.timings[mark].total = this.timings[mark].total + time;
        }
    },
    show: function (mark) {
        if (mark === void 0)
            return this.timings;
        else if (this.timings[mark] !== void 0)
            return this.timings[mark];
        else {
            console.warn('Profile `' + mark + '` doesn\'t exists');
            return null;
        }
    }
};
//Deferred support
//@TODO: Add full states support
var Deferred = Sandy.Deferred = function (callback, scope) {

    callback = callback instanceof Function ? callback : null;
    scope = scope !== undefined ? scope : this;

    this.__state = 0;
    this.__callback = callback;
    this.__scope = scope;

    this.__data = null;
    this.__error = null;

    this.__onsuccess = [];
    this.__onresolve = [];
    this.__onreject = null;
    this.__onscope = null;

};


Deferred.prototype = {

    success: function (onsuccess, scope) {
        scope = scope || this;
        this.__onsuccess.push({func: onsuccess, ctx: scope});
        if (this.__state == 3) {
            onsuccess.call(scope);
            this.__onsuccess.pop();
        }
    },

    then: function (onresolve, onreject, scope) {
        onresolve = onresolve instanceof Function ? onresolve : null;
        onreject = onreject instanceof Function ? onreject : null;
        scope = scope !== undefined ? scope : this;

        if (onresolve !== null)
            this.__onresolve.push(onresolve);
        this.__onreject = onreject;
        this.__onscope = scope;

        if (this.__state == 1 && onresolve !== null) {
            onresolve.call(scope, this.__data);
        }

        return this;

    },

    resolve: function (data) {
        this.__state = 1;
        this.__data = data;
        var self = this;
        if (this.__onresolve.length > 0) {
            _.each(this.__onresolve, function (val) {
                val.call(self.__onscope, data);
            });
            return true;
        }
        return false;
    },

    reject: function (error) {

        this.__state = 2;

        if (this.__onreject !== null) {
            this.__onreject.call(this.__onscope, error);
            return true;
        }


        return false;

    },

    done: function () {
        this.__state = 3;

        if (this.__callback !== null) {
            this.__callback.call(this.__scope, this);
        }

        var val = null;
        while (this.__onsuccess.length > 0) {
            val = this.__onsuccess.pop();
            val.func.call(val.ctx);
        }
    }

};
//Based on Backbone Event Emitter

var Emitter = Sandy.EventEmitter = {
    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function (name, callback, context) {
        if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
        this._events || (this._events = {});
        var events = this._events[name] || (this._events[name] = []);
        events.push({callback: callback, context: context, ctx: context || this});
        return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function (name, callback, context) {
        if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
        var self = this;
        var once = _.once(function () {
            self.off(name, once);
            callback.apply(this, arguments);
        });
        once._callback = callback;
        return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function (name, callback, context) {
        if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;

        // Remove all callbacks for all events.
        if (!name && !callback && !context) {
            this._events = void 0;
            return this;
        }

        var names = name ? [name] : _.keys(this._events);
        for (var i = 0, length = names.length; i < length; i++) {
            name = names[i];

            // Bail out if there are no events stored.
            var events = this._events[name];
            if (!events) continue;

            // Remove all callbacks for this event.
            if (!callback && !context) {
                delete this._events[name];
                continue;
            }

            // Find any remaining events.
            var remaining = [];
            for (var j = 0, k = events.length; j < k; j++) {
                var event = events[j];
                if (
                    callback && callback !== event.callback &&
                    callback !== event.callback._callback ||
                    context && context !== event.context
                ) {
                    remaining.push(event);
                }
            }

            // Replace events if there are any remaining.  Otherwise, clean up.
            if (remaining.length) {
                this._events[name] = remaining;
            } else {
                delete this._events[name];
            }
        }

        return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function (name) {
        if (!this._events) return this;
        var args = Array.prototype.slice.call(arguments, 1);
        if (!eventsApi(this, 'trigger', name, args)) return this;
        var events = this._events[name];
        var allEvents = this._events.all;
        if (events) triggerEvents(events, args);
        if (allEvents) triggerEvents(allEvents, arguments);
        return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function (obj, name, callback) {
        var listeningTo = this._listeningTo;
        if (!listeningTo) return this;
        var remove = !name && !callback;
        if (!callback && typeof name === 'object') callback = this;
        if (obj) (listeningTo = {})[obj._listenId] = obj;
        for (var id in listeningTo) {
            obj = listeningTo[id];
            obj.off(name, callback, this);
            if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
        }
        return this;
    }

};

// Regular expression used to split event strings.
var eventSplitter = /\s+/;

// Implement fancy features of the Events API such as multiple event
// names `"change blur"` and jQuery-style event maps `{change: action}`
// in terms of the existing API.
var eventsApi = function (obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
        for (var key in name) {
            obj[action].apply(obj, [key, name[key]].concat(rest));
        }
        return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
        var names = name.split(eventSplitter);
        for (var i = 0, length = names.length; i < length; i++) {
            obj[action].apply(obj, [names[i]].concat(rest));
        }
        return false;
    }

    return true;
};

// A difficult-to-believe, but optimized internal dispatch function for
// triggering events. Tries to keep the usual cases speedy
var triggerEvents = function (events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2], a4 = args[3];
    switch (args.length) {
        case 0:
            while (++i < l) (ev = events[i]).callback.call(ev.ctx);
            return;
        case 1:
            while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1);
            return;
        case 2:
            while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2);
            return;
        case 3:
            while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
            return;
        case 4:
            while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3, a4);
            return;
        default:
            while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
            return;
    }
};

Sandy.EventEmitter.bind = Sandy.EventEmitter.on;
Sandy.EventEmitter.unbind = Sandy.EventEmitter.off;
Sandy.EventEmitter.fire = Sandy.EventEmitter.trigger;

var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

// Inversion-of-control versions of `on` and `once`. Tell *this* object to
// listen to an event in another object ... keeping track of what it's
// listening to.
_.each(listenMethods, function (implementation, method) {
    Sandy.EventEmitter[method] = function (obj, name, callback) {
        var listeningTo = this._listeningTo || (this._listeningTo = {});
        var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
        listeningTo[id] = obj;
        if (!callback && typeof name === 'object') callback = this;
        obj[implementation](name, callback, this);
        return this;
    };
});
//Base on Backbone Event Bus with some additions

var Bus = Sandy.EventBus = {
    ChannelSplitter: /:/,
    DefaultChannel: 'global',
    channels: {},
    addChannel: function (name) {
        if (name == '' || name == void 0 || name == null) {
            throw "Cant add undefined channel";
        } else {
            if (this.channels[name] == void 0)
                this.channels[name] = _.extend({}, Emitter);
        }
        return this;
    },
    removeChannel: function (name) {
        if (name == '' || name == void 0 || name == null || name == 'iomsk') {
            throw "Cant remove undefined or main channel";
        } else {
            if (this.channels[name] !== void 0) {
                this.channels[name].off();
                delete this.channels[name];
            } else {
                return false;
            }
        }
        return this;
    },
    on: function (name, callback, context) {
        var channel = this.DefaultChannel;
        context = context || this;
        if (this.ChannelSplitter.test(name)) {
            channel = name.split(this.ChannelSplitter)[0];
            name = name.split(this.ChannelSplitter)[1];
        }
        this.addChannel(channel);
        this.channels[channel].on(name, callback, context);
        return this;
    },
    once: function (name, callback, context) {
        var channel = this.DefaultChannel;
        context = context || this;
        if (this.ChannelSplitter.test(name)) {
            channel = name.split(this.ChannelSplitter)[0];
            name = name.split(this.ChannelSplitter)[1];
        }
        this.addChannel(channel);
        this.channels[channel].once(name, callback, context);
        return this;
    },
    //Calling with no options causes to remove ALL attached events and channels
    //Calling with @<channel> unbinds and removes all events from this channel
    //Otherwise call <channel>:<event> or <event>
    off: function (name) {
        var self = this;
        var channel = this.DefaultChannel;
        if (name == void 0) {
            _.each(this.channels, function (channel, id) {
                self.removeChannel(id);
            });
        } else {
            if (name[0] == '@') {
                channel = name.split('@')[1];
                if (this.channels[channel]) {
                    this.removeChannel(channel);
                }
            } else {
                if (this.ChannelSplitter.test(name)) {
                    channel = name.split(this.ChannelSplitter)[0];
                    name = name.split(this.ChannelSplitter)[1];
                }
                this.channels[channel].off(name);
            }
        }
        return this;
    },
    trigger: function (name) {
        var channel = Bus.DefaultChannel;
        if (Bus.ChannelSplitter.test(name)) {
            channel = name.split(Bus.ChannelSplitter)[0];
            name = name.split(Bus.ChannelSplitter)[1];
        }
        if (Bus.channels[channel] !== void 0) {
            var args = Array.prototype.slice.call(arguments, 1);
            args.unshift(name);
            Bus.channels[channel].trigger.apply(Bus.channels[channel], args);
        }
        return this;
    }
};

Sandy.EventBus.emit = Sandy.EventBus.trigger;

Sandy.EventBus.addChannel(Sandy.EventBus.DefaultChannel);
var lut = [];
for (var i = 0; i < 256; i++) {
    lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
}

function utf8_encode(str_data) { // Encodes an ISO-8859-1 string to UTF-8
    //
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)

    str_data = str_data.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < str_data.length; n++) {
        var c = str_data.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }

    return utftext;
}

var Encrypt = Sandy.Encrypt = {
    sha1: function (str) {
        //
        // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
        // + namespaced by: Michael White (http://crestidg.com)

        var rotate_left = function (n, s) {
            var t4 = ( n << s ) | (n >>> (32 - s));
            return t4;
        };

        var lsb_hex = function (val) {
            var str = "";
            var i;
            var vh;
            var vl;

            for (i = 0; i <= 6; i += 2) {
                vh = (val >>> (i * 4 + 4)) & 0x0f;
                vl = (val >>> (i * 4)) & 0x0f;
                str += vh.toString(16) + vl.toString(16);
            }
            return str;
        };

        var cvt_hex = function (val) {
            var str = "";
            var i;
            var v;

            for (i = 7; i >= 0; i--) {
                v = (val >>> (i * 4)) & 0x0f;
                str += v.toString(16);
            }
            return str;
        };

        var blockstart;
        var i, j;
        var W = new Array(80);
        var H0 = 0x67452301;
        var H1 = 0xEFCDAB89;
        var H2 = 0x98BADCFE;
        var H3 = 0x10325476;
        var H4 = 0xC3D2E1F0;
        var A, B, C, D, E;
        var temp;

        str = utf8_encode(str);
        var str_len = str.length;

        var word_array = new Array();
        for (i = 0; i < str_len - 3; i += 4) {
            j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 |
            str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
            word_array.push(j);
        }

        switch (str_len % 4) {
            case 0:
                i = 0x080000000;
                break;
            case 1:
                i = str.charCodeAt(str_len - 1) << 24 | 0x0800000;
                break;
            case 2:
                i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000;
                break;
            case 3:
                i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) << 8 | 0x80;
                break;
        }

        word_array.push(i);

        while ((word_array.length % 16) != 14) word_array.push(0);

        word_array.push(str_len >>> 29);
        word_array.push((str_len << 3) & 0x0ffffffff);

        for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
            for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
            for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

            A = H0;
            B = H1;
            C = H2;
            D = H3;
            E = H4;

            for (i = 0; i <= 19; i++) {
                temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }

            for (i = 20; i <= 39; i++) {
                temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }

            for (i = 40; i <= 59; i++) {
                temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }

            for (i = 60; i <= 79; i++) {
                temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }

            H0 = (H0 + A) & 0x0ffffffff;
            H1 = (H1 + B) & 0x0ffffffff;
            H2 = (H2 + C) & 0x0ffffffff;
            H3 = (H3 + D) & 0x0ffffffff;
            H4 = (H4 + E) & 0x0ffffffff;
        }

        var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
        return temp.toLowerCase();
    },
    md5: function(str) {
        // Calculate the md5 hash of a string
        //
        // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
        // + namespaced by: Michael White (http://crestidg.com)

        var RotateLeft = function(lValue, iShiftBits) {
            return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
        };

        var AddUnsigned = function(lX,lY) {
            var lX4,lY4,lX8,lY8,lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        };

        var F = function(x,y,z) { return (x & y) | ((~x) & z); };
        var G = function(x,y,z) { return (x & z) | (y & (~z)); };
        var H = function(x,y,z) { return (x ^ y ^ z); };
        var I = function(x,y,z) { return (y ^ (x | (~z))); };

        var FF = function(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        var GG = function(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        var HH = function(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        var II = function(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        var ConvertToWordArray = function(str) {
            var lWordCount;
            var lMessageLength = str.length;
            var lNumberOfWords_temp1=lMessageLength + 8;
            var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
            var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
            var lWordArray=Array(lNumberOfWords-1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while ( lByteCount < lMessageLength ) {
                lWordCount = (lByteCount-(lByteCount % 4))/4;
                lBytePosition = (lByteCount % 4)*8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount)<<lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
            lWordArray[lNumberOfWords-2] = lMessageLength<<3;
            lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
            return lWordArray;
        };

        var WordToHex = function(lValue) {
            var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
            for (lCount = 0;lCount<=3;lCount++) {
                lByte = (lValue>>>(lCount*8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
            }
            return WordToHexValue;
        };

        var x=Array();
        var k,AA,BB,CC,DD,a,b,c,d;
        var S11=7, S12=12, S13=17, S14=22;
        var S21=5, S22=9 , S23=14, S24=20;
        var S31=4, S32=11, S33=16, S34=23;
        var S41=6, S42=10, S43=15, S44=21;

        str = utf8_encode(str);
        x = ConvertToWordArray(str);
        a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

        for (k=0;k<x.length;k+=16) {
            AA=a; BB=b; CC=c; DD=d;
            a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
            d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
            c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
            b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
            a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
            d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
            c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
            b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
            a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
            d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
            c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
            b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
            a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
            d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
            c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
            b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
            a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
            d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
            c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
            b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
            a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
            d=GG(d,a,b,c,x[k+10],S22,0x2441453);
            c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
            b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
            a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
            d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
            c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
            b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
            a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
            d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
            c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
            b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
            a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
            d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
            c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
            b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
            a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
            d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
            c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
            b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
            a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
            d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
            c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
            b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
            a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
            d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
            c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
            b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
            a=II(a,b,c,d,x[k+0], S41,0xF4292244);
            d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
            c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
            b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
            a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
            d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
            c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
            b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
            a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
            d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
            c=II(c,d,a,b,x[k+6], S43,0xA3014314);
            b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
            a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
            d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
            c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
            b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
            a=AddUnsigned(a,AA);
            b=AddUnsigned(b,BB);
            c=AddUnsigned(c,CC);
            d=AddUnsigned(d,DD);
        }

        var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

        return temp.toLowerCase();
    },
    //from http://stackoverflow.com/a/21963136
    guid: function () {
        var d0 = Math.random() * 0xffffffff | 0;
        var d1 = Math.random() * 0xffffffff | 0;
        var d2 = Math.random() * 0xffffffff | 0;
        var d3 = Math.random() * 0xffffffff | 0;
        return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
            lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
            lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
            lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
    },
    randomString: function () {
        var d0 = Math.random() * 0xffffffff | 0;
        var d1 = Math.random() * 0xffffffff | 0;
        var d2 = Math.random() * 0xffffffff | 0;
        var d3 = Math.random() * 0xffffffff | 0;
        return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff];
    }
};
Sandy.AudioContext = new webkitAudioContext();

var Sound = Sandy.Sound = function(context) {
    //creating audio context
    this.audioContext = context;
    //this node make sound enhancements
    this.dynamicsCompressor = this.audioContext.createDynamicsCompressor();
    this.dynamicsCompressor.connect(this.audioContext.destination);
    //Panner
    this.panNode = this.audioContext.createPanner();
    //this.panNode.connect(this.gain);
    this.panNode.panningModel = 'equalpower';
    this._panValue = 0;
    this.panNode.connect(this.dynamicsCompressor);
    //Master volume
    this.gain = this.audioContext.createGain();
    this.gain.connect(this.panNode);

    this.channels = {};
    this.maxChannels = 100;

    //define getters/setters
    this.__defineGetter__('volume', function() {
        return this.gain.gain.value;
    });
    this.__defineSetter__('volume', function(val) {
        if(val > 1)
            val = 1;
        if(val < 0)
            val = 0;
        this.muted = val == 0;
        this.gain.gain.value = val;
        Bus.emit('Sound:volume', val);
    });
    this.__defineGetter__('pan', function() {
        return this._panValue;
    });
    this.__defineSetter__('pan', function(val) {
        var value = Math.max(-1, Math.min(1, val));	// force pan to stay in the -1 to 1 range
        // Note that panning in WebAudioPlugin can support 3D audio, but our implementation does not.
        this._panValue = value;  // Unfortunately panner does not give us a way to access this after it is set http://www.w3.org/TR/webaudio/#AudioPannerNode
        this.panNode.setPosition(value, 0, -0.5);  // z need to be -0.5 otherwise the sound only plays in left, right, or center
        Bus.emit('Sound:pan', val);
    });

    //Setting defaults
    this.volume = 1;
    this.pan = 0;
};

_.extend(Sound.prototype, {
    SOUND_STOPPED: 0,
    SOUND_PLAYING: 1,
    SOUND_PAUSED: 2,
    SOUND_ERROR: 3,
    SOUND_ENDED: 255,

    microphoneStream: null,

    muted: false,
    mute: function() {
        this.volume = 0;
    },
    addChannel: function(name) {
        if(this.channels.length == this.maxChannels) {
            console.warn('Reached maximum channels count');
            return false;
        }
        this.channels[name] = new AudioChannel(name, this.audioContext, this.gain);
        return true;
    },
    playChannel: function(name, buffer, offset) {
        if(!this.channels[name])
            this.addChannel(name);
        var channel = this.channels[name];
        channel.setSource(buffer);
        channel.play(offset);
    },
    getUserMedia: function() {
        var self = this;
        navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true}, function (localMediaStream) {
                self.microphoneStream = localMediaStream;
            }, function (err) {
                Sandy.debugError("The following error occured: " + err);
            });
        } else {
            Sandy.debugError("getUserMedia not supported");
        }
    }
});

var AudioChannel = Sandy.AudioChannel = function(name, context, connector) {
    this.name = name;
    this.context = context;
    this.source = null;
    this.state = 0;
    this.currentTime = this.context.currentTime;
    this.offset = 0;
    this.start = 0;
    this.interrupt = true;
    this.loop = false;
    this.type = 'buffer';

    this.panNode = this.context.createPanner();
    this.panNode.connect(connector);
    this.panNode.panningModel = 'equalpower';
    this._panValue = 0;
    this.gainNode = this.context.createGain();
    this.gainNode.connect(this.panNode);

    //define getters/setters
    this.__defineGetter__('volume', function() {
        return this.gainNode.gain.value;
    });
    this.__defineSetter__('volume', function(val) {
        if(val > 1)
            val = 1;
        if(val < 0)
            val = 0;
        this.gainNode.gain.value = val;
        Bus.emit('Sound:volume.'+this.name, val);
    });
    this.__defineGetter__('pan', function() {
        return this._panValue;
    });
    this.__defineSetter__('pan', function(val) {
        var value = Math.max(-1, Math.min(1, val));	// force pan to stay in the -1 to 1 range
        // Note that panning in WebAudioPlugin can support 3D audio, but our implementation does not.
        this._panValue = value;  // Unfortunately panner does not give us a way to access this after it is set http://www.w3.org/TR/webaudio/#AudioPannerNode
        this.panNode.setPosition(value, 0, -0.5);  // z need to be -0.5 otherwise the sound only plays in left, right, or center
        Bus.emit('Sound:pan.'+this.name, val);
    });

    //Setting defaults
    this.volume = 1;
    this.pan = 0;
};

_.extend(AudioChannel.prototype, {
    setSource: function(buffer) {
        if(!this.interrupt && this.state === Sound.prototype.SOUND_PLAYING)
            return false;
        this.stop();
        this.buffer = buffer;
    },
    connect: function() {
        this.source.connect(this.gainNode);
    },
    play: function(offset) {
        offset = offset || 0;
        var willFirePlay = this.state !== Sound.prototype.SOUND_PAUSED;

        if(!this.interrupt && this.state === Sound.prototype.SOUND_PLAYING)
            return false;

        if(this.state === Sound.prototype.SOUND_PLAYING || this.state === Sound.prototype.SOUND_PAUSED || this.state === Sound.prototype.SOUND_STOPPED) {
            this.state = Sound.prototype.SOUND_STOPPED;
            if(this.source)
                this.source.disconnect();
            this.source = null;
        }
        var source = this.context.createBufferSource();
        source.buffer = this.buffer;
        this.source = source;
        this.connect();

        if(this.source) {
            var self = this;
            this.source.onended = function() {
                if(self.state !== Sound.prototype.SOUND_PAUSED) {
                    self.offset = 0;
                    if(self.loop && self.state !== Sound.prototype.SOUND_STOPPED) {
                        self.play();
                    } else
                        self.state = Sound.prototype.SOUND_STOPPED;
                }
            };
            this.start = Date.now();
            this.offset = offset;
            this.source.start(0, offset);
            this.state = Sound.prototype.SOUND_PLAYING;
            if(willFirePlay)
                Bus.emit('Sound:play.'+this.name, this);
            return true;
        } else
            return false;
    },
    stop: function(pause) {
        pause = pause || false;
        if(this.source && (this.state == Sound.prototype.SOUND_PLAYING || this.state == Sound.prototype.SOUND_PAUSED)) {
            this.source.stop();
            if(!pause) {
                this.state = Sound.prototype.SOUND_STOPPED;
                this.offset = 0;
                this.start = 0;
                Bus.emit('Sound:stop.'+this.name, this);
            }
            return true;
        } else
            return false;
    },
    pause: function() {
        if(this.state === Sound.prototype.SOUND_PLAYING) {
            this.state = Sound.prototype.SOUND_PAUSED;
            this.offset += (Date.now() - this.start) / 1000;
            this.stop(true);
            Bus.emit('Sound:pause.'+this.name, this);
        }
    },
    resume: function() {
        if(this.state === Sound.prototype.SOUND_PAUSED) {
            this.play(this.offset);
            Bus.emit('Sound:resume.'+this.name, this);
            return true;
        } else
            return false;
    }
});

/**
 * @type {Sandy.Sound}
 */
var SoundManager = Sandy.SoundManager = new Sandy.Sound(Sandy.AudioContext);
var Loader = Sandy.Loader = {
    load: function(src, tag, type) {
        var load = {};
        if (src != null) {
            load.src = src;
        }
        if(Array.prototype.slice.call(arguments).length == 2) {
            type = tag;
            tag = undefined;
        }
        tag = tag || _.uniqueId('ld');

        type = type || "arraybuffer";

        var request = new XMLHttpRequest();
        request.open("GET", load.src, true);
        request.responseType = type;
        request.onload = function() {
            if(this.status >= 200 && this.status < 400) {
                Bus.emit('Loader:load', src, this);
                Bus.emit('Loader:load_' + tag, src, this);
            } else {
                Bus.emit('Loader:error', src, this);
                Bus.emit('Loader:error_'+tag, src, this);
            }
        };
        request.onError = function(evt) {
            Bus.emit('Loader:error', src, this, evt);
            Bus.emit('Loader:error_'+tag, src, this, evt);
        };
        request.onprogress = function(loaded, total) {
            Bus.emit('Loader:progress', src, this, loaded, total);
            Bus.emit('Loader:progress_'+tag, src, this, loaded, total);
        };
        request.send();
        return tag;
    },
    toString: function() { return '[Loader]'}
};
function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

var Library = Sandy.Library = {
    audioBuffers: {},
    video: {},
    images: {},
    fonts: {},
    css: {},
    scripts: {},
    other: {},

    /**
     * Add file to library
     *
     * @param name {String} Internal resource name
     * @param src {String} Source
     * @param type {String} Type of resource
     * @param force {Boolean} Force load ignoring cache
     * @param cb {Function} Success Callback
     * @param err {Function} Error callback
     */
    add: function(name, src, type, force, cb, err) {
        var self = this;
        var args = Array.prototype.splice.call(arguments,0);
        if(args.length == 0)
            return;
        if(args.length > 2) {
            if(_.isFunction(args[args.length-1]) && _.isFunction(args[args.length-2])) {
                cb = args[args.length-2];
                err = args[args.length-1];
            } else if(_.isFunction(args[args.length-1]) && !_.isFunction(args[args.length-2])) {
                cb = args[args.length-1];
                err = _.noop;
            }
        } else {
            if(_.isFunction(args[args.length-1])) {
                cb = args[args.length-1];
                err = _.noop;
            } else {
                cb = _.noop;
                err = _.noop;
            }
        }

        if(!_.isBoolean(force))
            force = false;

        var id = _.uniqueId('libl');
        var intType = '';

        switch(type) {
            case 'text/css':
            case 'text/less':
            case 'style':
                type = 'text/css';
                intType = 'css';
                break;
            case 'text/javascript':
            case 'text/coffescript':
            case 'text/typescript':
            case 'application/javascript':
            case 'script':
                type = 'text/javascript';
                intType = 'scripts';
                break;
            case 'audio':
            case 'sound':
                type = 'arraybuffer';
                intType = 'audioBuffers';
                break;
            case 'font':
                type = 'text/css';
                intType = 'fonts';
                break;
            case 'image':
            case 'image/jpeg':
            case 'image/tiff':
            case 'image/gif':
            case 'image/png':
                type = 'arraybuffer';
                intType = 'images';
                break;
            case 'video':
                type = 'arraybuffer';
                intType = 'video';
                break;
            case 'arraybuffer':
                type = 'arraybuffer';
                intType = 'other';
                break;
            default:
                type = 'application/text';
                intType = 'other';
                break;
        }

        if(this[intType][name]) {
            cb(name, intType);
        } else {
            Bus.once('Loader:load_' + id, function (src, res) {
                var content = null;
                Sandy.debug('Loaded ' + src);
                switch (intType) {
                    case 'other':
                    case 'video':
                        self[intType][name] = res.response;
                        break;
                    case 'css':
                    case 'scripts':
                    case 'fonts':
                        self[intType][name] = res.responseText;
                        break;
                    case 'audioBuffers':
                        Sandy.AudioContext.decodeAudioData(res.response, function (decodedAudio) {
                            Sandy.debug('Decoded ' + src);
                            self.audioBuffers[name] = decodedAudio;
                            Bus.off('Loader:error_' + id);
                            cb(name, intType);
                        });
                        break;
                    case 'images':
                        self.images[name] = "data:image/" + src.split('.').pop() + ';base64,' + _arrayBufferToBase64(res.response);
                        break;
                }
                if (intType !== 'audio') {
                    Bus.off('Loader:error_' + id);
                    cb(name, intType);
                }
            });

            Bus.on('Loader:error_' + id, function (src, res) {
                Bus.off('Loader:load_'+id);
                err(name, intType, res.statusCode, src);
            });

            Loader.load(src, id, type);
        }
    },

    /**
     * Add array of files into collection
     *
     * @param arr {Array} Array containing description of loading resources. [name, src, type]
     * @param force {Boolean} Force load ignoring cache
     * @param cb {Function} Callback
     * @param err {Function} On error callback
     */
    addMulti: function(arr, force, cb, err) {
        var self = this;
        var args = Array.prototype.slice.call(arguments,0);
        if(args.length > 2) {
            if(_.isFunction(args[args.length-1]) && _.isFunction(args[args.length-2])) {
                cb = args[args.length-2];
                err = args[args.length-1];
            } else if(_.isFunction(args[args.length-1]) && !_.isFunction(args[args.length-2])) {
                cb = args[args.length-1];
                err = _.noop;
            }
        } else {
            if(_.isFunction(args[args.length-1])) {
                cb = args[args.length-1];
                err = _.noop;
            } else {
                cb = _.noop;
                err = _.noop;
            }
        }

        var count = arr.length;
        var succF = _.clone(arr);
        var errF = _.clone(arr);
        var _asyncCb = _.after(count,function() {
            if(errF.length > 0)
                err(errF);
            else
                cb(succF);
        });
        var _cb = function(succ, fail) {
            var id = (succ) ? succF.indexOf(succ) : errF.indexOf(fail);
            if(fail) {
                succF.splice(id, 1);
            }
            if(succ)
                errF.splice(id, 1);
            _asyncCb();
        };

        _.each(arr, function(res) {
            self.add(res[0], res[1], res[2], force, function(name) {
                _cb(name, null);
            }, function(name) {
                _cb(null, name);
            });
        });
    },

    /**
     * Injects into document or element
     * @param name {String} Name of resource
     * @param type {String} Type of resource
     * @param el {HTMLElement} Element to inject. Works only for `images` type, injects into src
     */
    inject: function(name, type, el) {
        if(this[type][name]) {
            if(type == 'images') {
                el.setAttribute('src', this[type][name]);
            } else {
                el = null;
                if(type == 'scripts')
                    el = document.createElement('script');
                if(type == 'css' || type == 'fonts')
                    el = document.createElement('style');
                el.textContent = this[type][name];
                document.body.appendChild(el);
            }
        }
    }
};
Sandy.Fonts = {
    add: function(name) {
        var style = document.createElement('style');
        style.rel = 'stylesheet';
        document.head.appendChild(style);
        style.textContent = localStorage[name];
    },
    load: function(name, src) {
        try {
            if (localStorage[name]) {
                // The font is in localStorage, we can load it directly
                this.add(name);
            } else {
                // We have to first load the font file asynchronously
                var id = Sandy.Loader.load(src, 'text/html');
                Bus.on('Loader:load_'+id, function(source, res) {
                    localStorage[name] = res.responseText;
                    Sandy.Fonts.add(name);
                    Bus.off('Loader:load_'+id);
                });
            }
        } catch(ex) {
            // maybe load the font synchronously for woff-capable browsers
            // to avoid blinking on every request when localStorage is not available
        }
    }
};
//Websocket transport support

var WS = Sandy.Websocket = {
    instances: {},
    createInstance: function(uri, reconnect, maxReconnect) {
        var inst = new WSInstance(uri, reconnect, maxReconnect);
        this.instances[inst.id] = inst;
        return inst.id;
    },
    /**
     *
     * @param id {String}
     * @return {WSInstance}
     */
    getInstance: function(id) {
        if(this.instances[id])
            return this.instances[id];
    }
};

var WSInstance = function(uri, reconnect, maxReconnect, isPure) {
    this.id = _.uniqueId('wsocket');
    this._ws = undefined;
    this.isPure = isPure || false;
    this.uri = uri || '';
    this.reconnect = reconnect || true;
    this.maxReconnect = maxReconnect || 5;
    this.reconnectCounter = 0;
    this.setUri(uri);
};

_.extend(WSInstance.prototype, {
    currentCallbackId: 0,
    states: ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'],
    gracefullyClosed: false,
    queue: [],
    setUri: function(uri) {
        uri = uri || '';
        if(uri.length > 0) {
            if (window.location.protocol == 'http:')
                uri = uri.replace(/(\w+:\/\/)|()/, 'ws://');
            else if (window.location.protocol == 'https:')
                uri = uri.replace(/(\w+:\/\/)|()/, 'wss://');
            this.uri = uri;
            this._ws = new WebSocket(uri);
            this.bindSocketEvents();
        }
    },
    bindSocketEvents: function() {
        var self = this;
        this._ws.onmessage = function (data) {
            var res = null;
            if(!self.isPure) {
                try {
                    res = JSON.parse(data.data);
                } catch (e) {
                    res = {type: "error"};
                    Sandy.debugError('Error parsing WS response.' + e.message);
                }
                Bus.emit(self.id + ':' + 'message', _.extend(res, {timestamp: data.timeStamp}));
                Bus.emit(self.id + ':' + 'message_' + res.id, _.extend(res, {timestamp: data.timeStamp}));
            } else {
                Bus.emit(self.id + ':' + 'message', res);
                Bus.emit(self.id + ':' + 'message_' + res.id, res);
            }
        };
        this._ws.onopen = function () {
            var q = null;
            while(q = self.queue.pop()) {
                self.send(q.msg, q.cb);
            }
            Bus.emit(self.id + ':Open');
        };
        this._ws.onclose = function () {
            Bus.emit(self.id + ':Close');
            if(!self.gracefullyClosed) {
                setTimeout((function() {
                    this.setUri(self.uri);
                }).bind(self), 5000);
            }
        };
        this._ws.onerror = function (e) {
            Bus.emit(self.id + ':Error', e);
            if(!self.gracefullyClosed) {
                setTimeout((function() {
                    this.setUri(self.uri);
                }).bind(self), 5000);
            }
        };
    },
    close: function() {
        this.gracefullyClosed = true;
        this._ws.close();
        return this;
    },
    readyState: function() {
        return this._ws.readyState;
    },
    currentState: function() {
        return this.states[this._ws.readyState];
    },
    send: function(message, cb) {
        if(!_.isFunction(cb))
            cb = function() {};
        if(this.currentState() !== 'OPEN') {
            this.queue.push({
                msg: message,
                cb: cb
            });
            return this;
        }
        var reqId = this.currentCallbackId;
        ++this.currentCallbackId;
        var obj = _.extend(message,{"id": reqId});
        Bus.once(this.id + ':' + 'message_'+reqId, function(data) {
            cb.call(null, data);
        });
        this._ws.send(JSON.stringify(obj));
        return this;
    },
    callServerMethod: function(method, params, cb) {
        params = params || {};
        if(_.isFunction(params)) {
            cb = params;
            params = {};
        }
        if(!_.isFunction(cb))
            cb = function() {};
        var msg = {method: method, params: params};
        this.send(msg, cb);
    },
});
var WSApi = Sandy.WSApi = {
    instances: {},
    createInstance: function(wsId) {
        var args = Array.prototype.slice.call(arguments);
        var uri = args[0];
        var reconnect = args[1] || true;
        var maxReconnect = args[2] || 5;
        if(args.length > 1) {
            wsId = -1;
        }
        if(!WS.getInstance(wsId)) {
            wsId = WS.createInstance(uri, reconnect, maxReconnect);
        }
        var inst = new WSApiInstance(WS.getInstance(wsId));
        this.instances[inst.id] = inst;
        Bus.emit('WSAPI:Create', inst.id);
        return inst.id;
    },
    /**
     *
     * @param id {String}
     * @return {WSApiInstance}
     */
    getInstance: function(id) {
        if(this.instances[id])
            return this.instances[id];
    }
};

var WSApiInstance = function(ws) {
    this._ws = ws;
    this.id = _.uniqueId('wsapi');
    this.requests = {};
};

_.extend(WSApiInstance.prototype, {
    publishRequest: function(name, params) {
        var self = this;
        if (!name)
            return false;
        if (this.requests[name]) {
            Sandy.debugError('RPCRequest with name `' + name + '` already exists');
            return false;
        }
        var f = function () {
            var args = Array.prototype.slice.call(arguments);
            var cb = args[args.length - 1];
            var opt = {};
            if (!_.isFunction(cb))
                cb = function () {
                };
            var i = 0;
            var defineOpt = function (name, val, type) {
                type = type || 'object';
                type = type.toLowerCase();
                opt[name] = parseOption(val, type);
            };
            var reqCount = _.countBy(params, function (val) {
                return (val.required) ? 'required' : 'not'
            }).required;
            _.each(params, function (val, name) {
                val.required = val.required || false;
                if (val.required) {
                    if (args.length < i)
                        return false;
                    defineOpt(name, args[i], val.type);
                    opt[name] = args[i];
                } else {
                    if (args.length >= (reqCount + 1) && i < args.length - 1) {
                        defineOpt(name, args[i], val.type);
                    } else if (val.defaults) {
                        defineOpt(name, val.defaults, val.type);
                    }
                }
                i++;
            });
            if (args.length < reqCount || (args.length == reqCount && _.isFunction(args[args.length - 1]))) {
                var given = (args.length < reqCount) ? args.length : (args.length == reqCount && _.isFunction(args[args.length - 1])) ? args.length - 1 : undefined;
                Sandy.debugError('Not enough params. RPC Call: `' + name + '`. expected ' + reqCount + ' but ' + given + ' given');
                return false;
            }
            var req = new RPCRequest(name, opt);
            return req.send(self._ws,cb);
        };
        this.requests[name] = {
            name: name,
            f: f
        };
        if(!this[name])
            this[name] = f;
    }
});

var RPCResponse = function(data) {
    this._data = data.result || {};
    this._error = data.error || null;

    if(this._error)
        Sandy.debugError(this._error);

    this.toJSON = function() {
        return (this._error !== null) ? this._error : this._data;
    }
};

var RPCRequest = function(name, params) {
    this.id = _.uniqueId('rpcreq');
    this.name = name || '';
    this.params = params || {};
    this.defaults = params || {};
    this.response = null;
    this.requestTime = 0;
    this.responseTime = 0;

    var self = this;

    this.setParam = function(name, value) {
        name = name || '';
        if(name == '')
            return false;
        if(_.isObject(name)) {
            var keys = Object.keys(name);
            if(keys.length == 1) {
                value = name[keys[0]];
                name = keys[0];
            } else {
                _.each(keys, function(val) {
                    self.setParam(val, name[val]);
                });
            }
        }
        this.params[name] = value;
        return true;
    };

    this.setDefaults = function() {
        this.params = this.defaults;
    };

    this.send = function(ws, cb) {
        var self = this;
        if(!_.isFunction(cb))
            cb = _.noop;
        this.requestTime = Date.now();
        ws.callServerMethod(this.name, this.params, function(res) {
            self.responseTime = Date.now();
            self.response = new RPCResponse(res);
            Bus.emit('WSRPC:' + self.id, self.response.toJSON());
            Bus.emit('WSRPC:' + self.name, self.response.toJSON());
            cb(self.response.toJSON());
        });
        return this.id;
    };
};

var parseOption = function(val, type) {
    type = type || 'object';
    type = type.toLowerCase();
    switch(type) {
        case 'float':
        case 'double':
            val = parseFloat(val);
            break;
        case 'integer':
        case 'int':
            val = parseInt(val);
            break;
        case 'time':
            var tmp = new Date();
            if(typeof val == 'number') {
                tmp.setTime(val);
                val = tmp.toISO8601();
            } else if (typeof val == 'string') {
                tmp.parse(val);
                val = tmp.toISO8601();
            } else if (val instanceof Date) {
                val = val.toISO8601();
            }
            break;
        case 'object':
            break;
        case 'string':
        default:
            val = val.toString();
            break;
    }
    return val;
};
//Out default rpc requests
Bus.on('WSAPI:Create', function(id) {
    var apiInstance = WSApi.getInstance(id);

    //Our custom requests
    var toPublish = [
    /**
     * @name WSApiInstance.getCallContext
     * @param ctxId {Number}
     * @return {String}
     */
        {
            name: 'getCallContext',
            params: {
                ctxId: { required: true, type: 'int' }
            }
        },
    /**
     * @name WSApiInstance.getClientInfo
     * @param identity {String}
     * @param identityType {String}
     * @return {String}
     */
        {
            name: 'getClientInfo',
            params: {
                identity: { required: true, type: 'string' },
                identityType: { required: false, type: 'string', defaults: 'phone'}
            }
        },
    /**
     * @name WSApiInstance.findAddress
     * @param pattern {String}
     * @param serviceInstId {Number}
     * @param clientId {Number}
     * @param filter {Object}
     * @return {String}
     */
        {
            name: 'findAddress',
            params: {
                pattern: {required: true, type: 'string'},
                serviceInstId: {required: false, type: 'int'},
                clientId: {required: false, type: 'int'},
                filter: {required: false, type: 'object'}
            }
        },
        {
            name: 'findRoute',
            params: {
                addressList: {required: true, type: 'object'}
            }
        },
        {
            name: 'calculateCost',
            params: {
                distance: {required: true, type: 'float'},
                tariff: {required: true, type: 'object'}
            }
        },
        {
            name: 'makeOrder',
            params: {
                clientId: {required: true, type: 'int'},
                clientContactId: {required: true, type: 'int'},
                serviceId: {required: true, type: 'int'},
                route: {required: true, type: 'object'},
                tariff: {required: true, type: 'object'},
                time: {required: false, type: 'time'}
            }
        },
    /**
     * @name WSApiInstance.signIn
     * @param username {String}
     * @param password {String}
     * @return {String}
     */
        {
            name: 'signIn',
            params: {
                username: {required: true, type: 'string'},
                password: {required: true, type: 'string'}
            }
        },
        {
            name: 'getProfile',
            params: {}
        },
        {
            name: 'getIdle',
            params: {}
        }
    ];

    _.each(toPublish, function(val) {
        apiInstance.publishRequest(val.name, val.params);
    });
});
Sandy.modules = {};
Sandy.middleware = {};

/**
 * Definitive logic here.
 * All functions return `this` for chaining support
 *
 * Start chain with Sandy.define(<module_name>)
 *
 * Available chained functions:
 *
 * `require` - can be String/Object/Array.
 * `config` - pass config object here
 * `use` - Run middleware. Remember that if you use `map` middleware, you should specify requirements first
 * `exports` - must be last in chain. Pass here function that will be the body of module.
 * If you return something, it will be exposed to modules' _exports property. `this` function scope will point to object,
 * containing its requirements
 *
 * @type {Function}
 */
var Definition = Sandy.Definition = function(name, external, vendor, path) {
    var self = this;

    //Module name
    this.name = name;

    //Module requirements
    this._requirements = [];

    //Exported object or function
    this._exports = null;

    //.export function
    this.__callback = null;

    //Defer object signaling that module is loaded
    this.defer = new Deferred();

    this.isLoading = false;
    this.isLoaded = false;
    this.isExternal = external || false;
    this.isVendor = vendor || false;
    this.path = path;

    /**
     * Internal exports callback
     * @returns {Object}
     * @private
     */
    var _exportFunc = function() {
        var scope = {
            config: Sandy.getConfig(self.name)
        };

        _.each(self._requirements, function (module) {
            scope[module.sub] = Sandy.modules[module.name]._exports
        });
        self._exports = self.__callback.call(scope, scope);
        self.isLoaded = true;
        Bus.emit('loadModule', self.name);
        return self._exports;
    };

    Bus.on('global:loadModule', function(name) {
        if(!self.isLoaded && self.__callback !== null) {
            var countLoaded = 0;
            _.each(self._requirements, function (module, id) {
                if (module.name == name) {
                    self._requirements[id].loaded = true;
                    module.loaded = true;
                }
                if (module.loaded)
                    countLoaded++;
            });
            if (countLoaded == self._requirements.length)
                _exportFunc();
        }
    });

    this._loadModule = function(name) {
        if(!Sandy.modules[name])
            throw "Trying to load module `" + name + "` that doesn\'t exist";
        if(Sandy.modules[name].isLoaded || Sandy.modules[name].isLoading)
            return true;

        var prepareSrc = function(module, path) {
            var src = path;
            if(module.isVendor && !self.path)
                src = Sandy.globals.config.Sandy.alternativePath;
            _.each(module.name.split('.'), function (val) {
                src += '/' + val.toLowerCase();
            });
            src += '.js';
            return src;
        };

        //Fix mostly for external modules as they dont have `exports` section
        Sandy.modules[name].isLoading = true;

        var module = Sandy.modules[name];
        var path = module.path;
        if(!module.path)
            path = Sandy.globals.config.Sandy.autoloadPath;
        if(module.isVendor && !module.path)
            path = Sandy.globals.config.Sandy.alternativePath;
        var src = prepareSrc(module, path);
        var recurseLoad = function (name, src) {
            Sandy.Library.add(module.name, src, 'script', false, function() {
                Sandy.Library.inject(module.name, 'scripts');
                if(module.isExternal)
                    Bus.emit('loadModule', module.name);
            }, function() {
                if(path == Sandy.globals.config.Sandy.autoloadPath || path == self.path) {
                    path = Sandy.globals.config.Sandy.alternativePath;
                    src = prepareSrc(module, path);
                    recurseLoad(module.name, src);
                } else {
                    Sandy.debugError('Module not found. `' + module.name + '` : [' + src + ']');
                }
            });
        };
        recurseLoad(module.name, src);
        return this;
    };

    this.require = function(modules) {
        //both String and Array support
        if (isString(modules)) {
            if (modules !== '') {
                modules = JSON.parse('[{ "name": "' + modules + '"}]');
            }
        }

        if(_.isArray(modules)) {
            modules = _.uniq(_.map(modules, function(module) {
                if(isString(module)) {
                    if(module !== '')
                        module = JSON.parse('{ "name": "' + module + '"}');
                }

                var circularError = false;

                if(!Sandy.modules[module.name])
                    Sandy.modules[module.name] = new Definition(module.name, module.external || false, module.vendor || false, module.path || null);
                else {
                    if(self.name == module.name) {
                        Sandy.debugWarn('Possible circular dependency in module `' + self.name + '`! Dependency `' + module.name + '` will be ignored!');
                        circularError = true;
                    }
                    _.each(Sandy.modules[module.name]._requirements, function(val) {
                        if(val.name == self.name) {
                            Sandy.debugWarn('Possible circular dependency in module `' + self.name + '`! Dependency `' + module.name + '` will be ignored!');
                            circularError = true;
                        }
                    });
                }

                if(!circularError)
                    return {name: module.name, sub: module.name, loaded: Sandy.modules[module.name].isLoaded};
            }));

            modules = _.reject(modules, function(module) {
                if(module == void 0)
                    return true;
            });

            this._requirements = modules;
        }
        return this;
    };

    this.config = function(value) {
        Sandy.setConfig(this.name, value);
    };

    /**
     * Export section.
     * In cb we define our function/Class etc.
     * @param cb
     * @returns {Sandy.Definition}
     */
    this.exports = function (cb) {
        if(!_.isFunction(cb))
            cb = _.noop;
        this.__callback = cb;
        this.isLoading = true;
        //Fix to execute exports if we have no dependencies or all dependencies are loaded
        Bus.emit('loadModule', '');
        _.each(this._requirements, function(module) {
            if(Sandy.globals.config.Sandy.autoload || Sandy.modules[module.name].isExternal || Sandy.modules[module.name].isVendor)
                self._loadModule(module.name);
        });
        return this;
    };

    /**
     * Use middleware module
     * @param name {string|function} Name of middleware module or middleware function
     * @returns {Sandy.Definition}
     */
    this.use = function(name) {
        if(!name)
            return this;

        var args = Array.prototype.splice.call(arguments, 1);
        var temp = null;
        if(_.isFunction(name)) {
            temp = new Middleware();
            temp.run = name;
            name = _.uniqueId('mw');
            temp.register(name);
        }
        if(Sandy.middleware[name] && Sandy.middleware[name] instanceof Sandy.Middleware) {
            Sandy.middleware[name].run.apply(this, args);
            if(temp) {
                temp.unregister();
                temp = null;
            }
        }
        return this;
    };
};

/**
 * Defining module
 * @param name Module name
 */
Sandy.define = function (name) {
    if (_.isUndefined(name) || name.toLowerCase() == 'sandy') {
        throw 'Incorrect module name!';
    } else if (!_.isUndefined(this.modules[name])) {
        return this.modules[name];
    } else {
        this.modules[name] = new Definition(name);
        this.globals.config[name] = {};
        return this.modules[name];
    }
};

/**
 * Middleware utils (e.g. mapping modules names etc)
 * @type {Function}
 */
var Middleware = Sandy.Middleware = function() {
    this.name = '';
    /**
     * Register middleware
     * @param name Middleware name use like <Definition>.use(<name>,<params>)
     */
    this.register = function(name) {
        if(!name || Sandy.middleware[name])
            throw "Middleware " + name + ' already exists';
        this.name = name;
        Sandy.middleware[name] = this;
    };
    this.unregister = function() {
        if(Sandy.middleware[this.name]) {
            delete Sandy.middleware[this.name];
        } else
            return false;
    };
    /**
     * Main running function
     */
    this.run = function() {};
};

// Defining middleware

/**
 * Mapping middleware
 * Maps modules into straight names e.g. Events.Bus => Bus
 * @type {Sandy.Middleware}
 */
var Map = new Sandy.Middleware();
Map.run = function(subs) {
    var self = this;
    if(typeof subs === 'string') {
        if(self._requirements[0])
            self._requirements[0].sub = subs;
    } else if (_.isArray(subs)) {
        _.each(this._requirements, function (val, id) {
            self._requirements[id].sub = subs[id];
        });
    } else if (_.isObject(subs)) {
        _.each(subs, function(sub, key) {
            _.each(self._requirements, function(val, id) {
                if(val.name == key)
                    self._requirements[id].sub = sub;
            });
        });
    }
};
Map.register('map');

/**
 * Injection of object keys and functions directly into Sandy module
 * @type {Sandy.Middleware}
 */
var Inject = new Sandy.Middleware();
Inject.run = function(obj) {
    _.extend(Sandy, obj);
};
Inject.register('inject');


Sandy.debug('sandy started');

return Sandy;

}));