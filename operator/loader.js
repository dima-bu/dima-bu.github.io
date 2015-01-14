/**
 * @name SandyJS
 * @description SandyJS is a little Javascript loader with module support.
 * @version 0.1.2
 * @author Cherrionella
 */

;(function (root, factory) {

    if(typeof module !== 'undefined') {
        //NodeJS support too unstable!
        module.exports = factory({}, {}, require('underscore'), require('jQuery'), require('async'));
    } else
    // Set up SandyJS appropriately for the environment. Start with AMD.
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'jquery', 'exports', 'async'], function (_, $, exports, async) {
            // Export global even in AMD case in case this script is loaded with
            // others that may still expect a global Sandy.
            root.Sandy = factory(root, exports, _, $, async);
        });
    } else {
        // Finally, as a browser global.
        root.Sandy = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$), async);
    }

}(this, function (root, Sandy, _, $, async) {
    "use strict";

    //Little helpers
    function isString(value) {
        return typeof value === 'string';
    }

    Sandy.version = '0.1.2';

    Sandy.debugEnabled = true;

    Sandy.globals = {
        //Config settings
        config: {
            Sandy: {
                //Autoload modules
                autoload: true,
                //Root path where modules are located
                autoloadPath: 'components',
                alternativePath: 'vendor'
            }
        }
    };

    Sandy.noop = function() {};

    //Some global values
    if (!window._ua) {
        var _ua = 'NodeJS';
        if(navigator)
            _ua = navigator.userAgent.toLowerCase();
    }

    if ( Math.sign === undefined ) {
        Math.sign = function ( x ) {
            return ( x < 0 ) ? - 1 : ( x > 0 ) ? 1 : 0;
        };
    }

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
        mac: /mac/i.test(_ua),
        nodejs: /NodeJS/.test(_ua)
    };

    var _logTimer = (new Date()).getTime();

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
            var t = '[' + (((new Date()) - _logTimer)) + ' ms] ';
            if (window.console && console.log) {
                var args = Array.prototype.slice.call(arguments);
//                var type = args.shift();
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

    Sandy.globals.$ = $;
    Sandy.globals._ = _;

    Sandy.addFont = function(name) {
        var style = document.createElement('style');
        style.rel = 'stylesheet';
        document.head.appendChild(style);
        style.textContent = localStorage[name];
    };

    Sandy.loadFont = function(name, css) {
        try {
            if (localStorage[name]) {
                // The font is in localStorage, we can load it directly
                this.addFont(name);
            } else {
                // We have to first load the font file asynchronously
                var request = new XMLHttpRequest();
                request.open('GET', css, true);
                request.onload = function() {
                    if (request.status >= 200 && request.status < 400) {
                        // We save the file in localStorage
                        localStorage[name] = request.responseText;
                        // ... and load the font
                        Sandy.addFont(name);
                    }
                };
                request.send();
            }
        } catch(ex) {
            // maybe load the font synchronously for woff-capable browsers
            // to avoid blinking on every request when localStorage is not available
        }
    };

    Sandy.events = {};
    Sandy.on = function(name, func) {
        if(_.isFunction(func)) {
            var id = _.uniqueId('se');
            if(!Sandy.events[name])
                Sandy.events[name] = [];
                Sandy.events[name].push({
                    id: id,
                    f: func
                });
            return id;
        }
        return false;
    };
    Sandy.off = function(name) {
        if(name.indexOf('@') == 0) {
            name = name.splice(0,name.length-1);
            _.each(Sandy.events, function(val, n) {
                _.each(val, function(e, id) {
                    if(e.id == name)
                        delete Sandy.events[n][id];
                });
            });
        } else {
            Sandy.events[name] = [];
        }
    };
    Sandy.emit = function() {
        var args = Array.split.call(arguments);
        var name = args.shift();
        var self = this;
        _.each(Sandy.events, function(val, n) {
            if(n == name) {
                _.each(Sandy.events[n], function(e) {
                    e.call(self, args);
                });
            }
        });
    };

    Sandy.loadScript = function(path, cb) {
        if(!_.isFunction(cb))
            cb = Sandy.noop();

    };

    //Modules cache
    Sandy.modules = {};

    Sandy.on('loadScript', function(name, path) {

    });

    Sandy.loadQueue = [];

    //Definitive logic here.
    var Definition = Sandy.Definition = function (name) {
        var self = this;

        //Module name
        this.name = name;

        //Module requirements
        this._requirements = {};

        //Exported object or function
        this._exports = null;

        //.export function
        this.__callback = null;

        //Defer object signaling that module is loaded
        this.defer = null;

        this.isLoaded = false;
        this.isExternal = false;
        this.isVendor = false;
        this.sync = false;

        /**
         * Loading all the requirements for definition.
         * Magic here
         * @param modules
         * @returns {Sandy.Definition}
         * @todo add package support
         */
        this.require = function (modules) {
            var self = this;
            //both String and Array support
            if (isString(modules)) {
                if (modules !== '') {
                    modules = JSON.parse('["' + modules + '"]');
                }
            }

            if (_.isArray(modules)) {
                modules = _.reject(modules, function (module) {
                    return module == self.name;
                }, self);

                var head = document.getElementsByTagName('head')[0];

                async.each(modules, _.bind(function(module, cb) {
                    var path = Sandy.globals.config.Sandy.autoloadPath;
                    var isVendor = false;
                    var isExternal = false;
                    var sync = false;
                    if(_.isObject(module)) {
                        if(module.path)
                            path = module.path;
                        isExternal = module.external || false;
                        sync = sync || module.sync;
                        isVendor = module.vendor || false;
                        module = module.name;
                    }
                    this._requirements[module] = {name: module, sub: module};
                    if(!_.isUndefined(Sandy.modules[module])) {
                        if(Sandy.modules[module].isLoaded)
                            cb();
                        else
                            Sandy.modules[module].defer.success(cb);
                    } else {
                        var mod = Sandy.define(module);
                        if(isExternal)
                            mod.require('').exports(function() {});
                        //Supporting auto loading scripts
                        if (Sandy.globals.config.Sandy.autoload) {
                            var src = path;
                            if(isVendor)
                                src = Sandy.globals.config.Sandy.alternativePath;
                            _.each(module.split('.'), function (val) {
                                src += '/' + val.toLowerCase();
                            });
                            src += '.js';
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            if(!sync)
                                script.async = true;
                            script.src = src;
                            script.addEventListener('load', function() {
                                Sandy.modules[module].defer.success(cb, self);
                            }, false);
                            script.addEventListener('error', function() {
                                if(path == Sandy.globals.config.Sandy.autoloadPath) {
                                    src = Sandy.globals.config.Sandy.alternativePath;
                                    _.each(module.split('.'), function (val) {
                                        src += '/' + val.toLowerCase();
                                    });
                                    src += '.js';
                                    var script = document.createElement('script');
                                    script.type = 'text/javascript';
                                    if(!sync)
                                        script.async = true;
                                    script.src = src;
                                    script.addEventListener('load', function() {
                                        Sandy.modules[module].defer.success(cb, self);
                                    }, false);
                                    script.src = src;
                                    head.appendChild(script);
                                }
                            }, false);
                            head.appendChild(script);
                        } else {
                            //throw "Please load all requirements before! " + JSON.stringify(module);
                        }
                    }
                },this), _.bind(function() {
                    this.defer.resolve();
                },this));
            } else {
                this.defer.resolve();
            }
            return this;
        };


        /**
         * Export section.
         * In cb we define our function/Class etc.
         * @param cb
         * @returns {Sandy.Definition}
         */
        this.exports = function (cb) {
            this.__callback = cb;
            this.defer.resolve();
            return this;
        };

        /**
         * This method extends module from other modules. Parent modules MUST be in require section!
         * Extend method MUST BE LAST in chain.
         * @param modules
         */
        this.extends = function(modules) {
            var self = this;
            //both String and Array support
            if (isString(modules)) {
                if (modules !== '') {
                    modules = JSON.parse('["' + modules + '"]');
                }
            }

            if (_.isArray(modules)) {
                modules = _.filter(modules, function(val) { return _.find(self._requirements, function(req) { req.name == val || req.sub == val }) !== void 0 });
                if(modules.length == 0) {
                    console.warn('No modules found in require section. Maybe you forgot to write them?');
                } else {
                    _.each(modules, function(module) {
                        self._exports = _.extend(self._exports,Sandy.modules[module]._exports);
                    });
                }
            }
            return this;
        };

        /**
         * Internal exports callback
         * @returns {Object}
         * @private
         */
        var _exportFunc = function() {
            var scope = {
                globals: Sandy.globals
            };

            _.each(this._requirements, function (val, name) {
                scope[self._requirements[name].sub] = Sandy.modules[name]._exports
            });
            this._exports = this.__callback.call(scope, scope);
            if (Sandy.globals.config.Sandy.globalRegister) {
                Sandy[this.name] = this._exports;
            }
            this.defer.done();
            return this._exports;
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
            if(Sandy.utils[name] && Sandy.utils[name] instanceof Sandy.Middleware) {
                Sandy.utils[name].run.apply(this, args);
                if(temp) {
                    temp.unregister();
                    temp = null;
                }
            }
            return this;
        };

        this.defer = new Deferred(function() {this.isLoaded = true;}, this);
        this.defer.then(_.after(2, _exportFunc), null, this);
    };

    Sandy.utils = {};

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
            if(!name || Sandy.utils[name])
                throw "Middleware " + name + ' already exists';
            this.name = name;
            Sandy.utils[name] = this;
        };
        this.unregister = function() {
            if(Sandy.utils[this.name]) {
                delete Sandy.utils[this.name];
            } else
                return false;
        };
        /**
         * Main running function
         */
        this.run = function() {};
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


    //Deferred support
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

    Sandy.globals.Profiler = Sandy.Profiler = {
        timings: {},
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
                timeStart: Date.now(),
                timeEnd: null
            }
        },
        stop: function (mark) {
            if (this.timings[mark].timeEnd == null) {
                this.timings[mark].timeEnd = Date.now();
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

    // This is totally bad use-case of define. But i cant find better solution to proxy internal module to all modules
    // Please never refer to global Sandy object inside exports function
    Sandy.define('Deferred').require('').exports(function () {
        return Sandy.Deferred;
    });

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
            if(self._requirements[Object.keys(self._requirements)[0]])
                self._requirements[Object.keys(self._requirements)[0]].sub = subs;
        } else if (_.isArray(subs)) {
            _.each(Object.keys(this._requirements), function (val, id) {
                self._requirements[val].sub = subs[id];
            });
        } else if (_.isObject(subs)) {
            var keys = Object.keys(subs);
            _.each(keys, function(key) {
                if(self._requirements[key])
                    self._requirements[key].sub = subs[key];
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

    Sandy.debug('page started');

    return Sandy;

}));