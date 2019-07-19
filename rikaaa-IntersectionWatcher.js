/**
 * @license
 * rikaaa-IntersectionWatcher.js
 *
 * Generated : 2019-07-19
 * Version : 0.5.0
 * Author : rikaaa.org | Yuki Hata
 * Url : http://rikaaa.org
 *
 *
 * The MIT License (MIT)
 *
 * Copyright 2019 rikaaa.org | Yuki Hata
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var isIntersecting_1 = createCommonjsModule(function (module, exports) {
// import map from './map';
// import constrain from './constrain';
Object.defineProperty(exports, "__esModule", { value: true });
var isIntersecting = /** @class */ (function () {
    function isIntersecting() {
    }
    isIntersecting.is = function (target, root, rootMargin) {
        if (rootMargin === void 0) { rootMargin = '0px'; }
        var parentTree = isIntersecting.computeParentNode(root, target);
        if (parentTree === false)
            return false;
        var rectList = isIntersecting.computeCheckTargetRectList(root, parentTree, rootMargin);
        var targetRect = isIntersecting.getBoundingClientRect(target);
        var counter = 0;
        while (counter !== rectList.length) {
            var contanerRect = rectList[counter];
            if (contanerRect.width <= 0 || contanerRect.height <= 0) {
                return false;
            }
            if (contanerRect.bottom <= targetRect.top || contanerRect.top >= targetRect.bottom) {
                return false;
            }
            counter++;
        }
        return true;
    };
    isIntersecting.computeParentNode = function (root, target) {
        var rootNode = (root) ? root : document.documentElement;
        var tree = [];
        var html = document.documentElement;
        var parent = target;
        while (parent !== html) {
            parent = isIntersecting.getParentNode(parent);
            tree.push(parent);
        }
        if (!tree.includes(rootNode))
            return false;
        return tree.splice(0, tree.indexOf(rootNode) + 1);
    };
    isIntersecting.computeCheckTargetRectList = function (root, parentTree, rootMargin) {
        var rootNode = (root) ? root : document.documentElement;
        var resultList = parentTree.map(function (parentNode) {
            if (parentNode !== rootNode) {
                return isIntersecting.getBoundingClientRect(parentNode);
            }
            else {
                return isIntersecting.getRootRect(parentNode, rootMargin);
            }
        });
        return resultList;
    };
    isIntersecting.getRootRect = function (rootNode, rootMargin) {
        var rect = null;
        var html = document.documentElement;
        if (rootNode !== html) {
            rect = isIntersecting.getBoundingClientRect(rootNode);
        }
        else {
            rect = {
                top: 0,
                bottom: html.clientHeight,
                right: html.clientWidth,
                left: 0,
                width: html.clientWidth,
                height: html.clientHeight,
            };
        }
        return isIntersecting.applyRootMargin(rect, rootMargin);
    };
    isIntersecting.applyRootMargin = function (rect, rootMargin) {
        var margin = isIntersecting.parseRootMargin(rootMargin);
        var rectWidth = rect.width;
        var rectHeight = rect.height;
        var marginTop = (margin.top[1] === 'px') ? margin.top[0] : rectHeight * margin.top[0] / 100;
        var marginBottom = (margin.bottom[1] === 'px') ? margin.bottom[0] : rectHeight * margin.bottom[0] / 100;
        var marginRight = (margin.right[1] === 'px') ? margin.right[0] : rectWidth * margin.right[0] / 100;
        var marginLeft = (margin.left[1] === 'px') ? margin.left[0] : rectWidth * margin.left[0] / 100;
        var applyedRect = {
            top: rect.top - marginTop,
            bottom: rect.bottom + marginBottom,
            right: rect.right + marginRight,
            left: rect.left - marginLeft,
            width: 0,
            height: 0,
        };
        applyedRect.width = applyedRect.right - applyedRect.left;
        applyedRect.height = applyedRect.bottom - applyedRect.top;
        return applyedRect;
    };
    isIntersecting.parseRootMargin = function (rootMargin) {
        var rootMarginArray = rootMargin.split(' ');
        var parser = function (rootMarginString) {
            return [parseFloat(rootMarginString), rootMarginString.match(/(px|%)/)[0]];
        };
        var result = {
            top: null,
            bottom: null,
            right: null,
            left: null,
        };
        switch (rootMarginArray.length) {
            case 1:
                result.top = parser(rootMarginArray[0]);
                result.bottom = parser(rootMarginArray[0]);
                result.right = parser(rootMarginArray[0]);
                result.left = parser(rootMarginArray[0]);
                break;
            case 2:
                result.top = parser(rootMarginArray[0]);
                result.bottom = parser(rootMarginArray[0]);
                result.right = parser(rootMarginArray[1]);
                result.left = parser(rootMarginArray[1]);
                break;
            case 4:
                result.top = parser(rootMarginArray[0]);
                result.bottom = parser(rootMarginArray[2]);
                result.right = parser(rootMarginArray[1]);
                result.left = parser(rootMarginArray[3]);
                break;
        }
        return result;
    };
    isIntersecting.getParentNode = function (target) {
        var parent = target.parentNode;
        if (parent && parent.nodeType == 11 && parent.host)
            return parent.host;
        if (parent && parent.assignedSlot)
            return parent.assignedSlot.parentNode;
        return parent;
    };
    isIntersecting.getBoundingClientRect = function (target) {
        var empty = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0,
        };
        var rect = null;
        try {
            return rect = target.getBoundingClientRect();
        }
        catch (error) {
        }
        if (rect === null)
            return empty;
    };
    return isIntersecting;
}());
exports.default = isIntersecting;
});

unwrapExports(isIntersecting_1);

var IsDisplay = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (target) {
    var result = false;
    var style = target.currentStyle || getComputedStyle(target, '');
    result = (style.display === 'none') ? false : true;
    return result;
});
});

unwrapExports(IsDisplay);

var onbang = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (func) {
    var _func, allow = true;
    return function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (!allow) {
            func = null;
            return false;
        }
        _func = func.apply(this, arg);
        allow = false;
        return _func;
    };
});
});

unwrapExports(onbang);

var debounce = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (func, interval) {
    var timer = null;
    return function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        clearTimeout(timer);
        timer = setTimeout(function () {
            return func.apply(this, arg);
        }, interval);
    };
});
});

unwrapExports(debounce);

var throttle = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


exports.default = (function (func, interval) {
    var req = null;
    var startTime = null;
    var firstFunc = onbang.default(func);
    var lastFunc = debounce.default(func, interval);
    var clearFirstFunc = debounce.default(function () {
        firstFunc = onbang.default(func);
        startTime = null;
        cancelAnimationFrame(req);
    }, interval);
    return function () {
        var _this = this;
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        firstFunc.apply(this, arg);
        req = requestAnimationFrame(function (timestamp) {
            if (startTime === null)
                startTime = timestamp;
            var elapsedTime = timestamp - startTime;
            if (elapsedTime >= interval) {
                startTime = null;
                cancelAnimationFrame(req);
                return func.apply(_this, arg);
            }
        });
        clearFirstFunc();
        return lastFunc.apply(this, arg);
    };
});
});

unwrapExports(throttle);

var valueObserver = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (firstVal, func, option) {
    if (option === void 0) { option = { observValKeyName: 'watch' }; }
    var _func, _firstval = firstVal, _watchKeyName = option.observValKeyName;
    return function (_a) {
        _a = {};
        var originalArgument = [], watchVal = null;
        for (var i = 0; i < arguments.length; i++) {
            if (!(arguments[i]) || !(arguments[i].constructor == Object)) {
                originalArgument.push(arguments[i]);
            }
            else {
                watchVal = arguments[i][_watchKeyName];
                delete arguments[i][_watchKeyName];
                if (Object.keys(arguments[i]).length > 0) {
                    originalArgument.push(arguments[i]);
                }
            }
        }
        if (_firstval === watchVal) {
            return false;
        }
        _firstval = watchVal;
        _func = func.apply(this, originalArgument);
        return _func;
    };
});
});

unwrapExports(valueObserver);

if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function (searchElement, fromIndex) {
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            // 1. Let O be ? ToObject(this value).
            var o = Object(this);
            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;
            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }
            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;
            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }
            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(searchElement, elementK) is true, return true.
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                // c. Increase k by 1. 
                k++;
            }
            // 8. Return false
            return false;
        }
    });
}

var Controller_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });







var Controller = /** @class */ (function () {
    // public scrollbarbarThickness: Number | number = 0;
    function Controller() {
        this.instancesOfintersectionWatcher = [];
        this.targetsAll = [];
        this.scrollAreasOftargets = [];
        this.mutationObserverConfig = {
            childList: true,
            attributes: true,
            characterData: true,
            subtree: true,
        };
        this.watcher_binded = throttle.default(Controller.watcher.bind(null, this), Controller.THROTTLE_INTERVAL);
        this.mo = new MutationObserver(this.watcher_binded);
        // this.scrollbarbarThickness = isIntersecting.getScrollbarThickness()
        this.firstCallback = debounce.default(onbang.default(function (entriesContaner) {
            entriesContaner.forEach(function (entries) {
                var callbackArg = entries.entries.map(function (entry) {
                    var isDisplay = Controller.isDisplay(entry.target);
                    if (isDisplay)
                        return Object.freeze({
                            target: entry.target,
                            isIntersecting: entry.isIntersecting,
                        });
                }).filter(function (entry) { return typeof entry !== 'undefined'; });
                if (callbackArg.length !== 0)
                    entries.callback(callbackArg);
            });
        }), Controller.THROTTLE_INTERVAL);
    }
    Controller.prototype.init = function (instance) {
        this.instancesOfintersectionWatcher.push(instance);
    };
    Controller.prototype.observe = function () {
        this.targetsAll = Controller.updateTargetsAll(this);
        this.scrollAreasOftargets = Controller.updateScrollAreasOftargets(this.targetsAll);
        if (this.targetsAll.length !== 0)
            Controller.onWather(this);
        this.entriesContaner = Controller.calculateEntriesContaner(this.instancesOfintersectionWatcher);
        this.firstCallback(this.entriesContaner);
    };
    Controller.prototype.unobserve = function () {
        this.targetsAll = Controller.updateTargetsAll(this);
        this.entriesContaner = Controller.calculateEntriesContaner(this.instancesOfintersectionWatcher);
    };
    Controller.prototype.disconnect = function () {
        this.targetsAll = Controller.updateTargetsAll(this);
        this.entriesContaner = Controller.calculateEntriesContaner(this.instancesOfintersectionWatcher);
        if (this.targetsAll.length === 0) {
            Controller.offWather(this);
            this.scrollAreasOftargets = [];
        }
    };
    Controller.watcher = function (instanse) {
        instanse.entriesContaner.forEach(function (entries) {
            var callbackArg = entries.entries.map(function (entry) {
                var option = entries.option;
                var isDisplay = Controller.isDisplay(entry.target);
                var currentIntersecting = Controller.isIntersecting(entry.target, option.root, option.rootMargin);
                var isIntersectionChenge = entry.valueObserver({ watch: currentIntersecting });
                if (isIntersectionChenge)
                    entry.isIntersecting = currentIntersecting;
                if (isDisplay && isIntersectionChenge)
                    return Object.freeze({
                        target: entry.target,
                        isIntersecting: entry.isIntersecting,
                    });
            }).filter(function (entry) { return typeof entry !== 'undefined'; });
            if (callbackArg.length !== 0)
                entries.callback(callbackArg);
        });
    };
    Controller.calculateEntriesContaner = function (instances) {
        return instances.map(function (instance) {
            var option = instance.option;
            var entries = instance.targets.map(function (target) {
                var isIntersecting = Controller.isIntersecting(target, option.root, option.rootMargin);
                return {
                    target: target,
                    isIntersecting: isIntersecting,
                    valueObserver: valueObserver.default(isIntersecting, function () { return true; }),
                };
            });
            instance.entries = entries;
            return instance;
        });
    };
    Controller.updateTargetsAll = function (instance) {
        return instance.instancesOfintersectionWatcher.map(function (instance) { return instance.targets; }).reduce(function (a, c) { return a.concat(c); }, []);
    };
    Controller.updateScrollAreasOftargets = function (targetsAll) {
        var computeParentNode = function (target) {
            var tree = [];
            var html = document.documentElement;
            var parent = target;
            while (parent !== html) {
                parent = isIntersecting_1.default.getParentNode(parent);
                tree.push(parent);
            }
            return tree;
        };
        var scrollAreas = targetsAll.map(function (target) {
            var parents = computeParentNode(target);
            return parents.filter(function (parent) {
                var style = getComputedStyle(parent, '');
                var isScroll = (style.overflow === 'scroll' ||
                    style.overflow === 'auto' ||
                    style.overflowY === 'scroll' ||
                    style.overflowY === 'auto');
                if (isScroll)
                    return true;
            });
        });
        return scrollAreas.reduce(function (a, c) { return a.concat(c); }, []);
    };
    Controller.onWather = function (instance) {
        var scrollPassive = {
            passive: true,
        };
        window.addEventListener('resize', instance.watcher_binded, false);
        window.addEventListener('scroll', instance.watcher_binded, scrollPassive);
        document.documentElement.addEventListener('scroll', instance.watcher_binded, scrollPassive);
        document.body.addEventListener('scroll', instance.watcher_binded, scrollPassive);
        instance.mo.observe(document.querySelector('html'), instance.mutationObserverConfig);
        instance.scrollAreasOftargets.forEach(function (target) {
            target.addEventListener('scroll', instance.watcher_binded, scrollPassive);
        });
    };
    Controller.offWather = function (instance) {
        window.removeEventListener('resize', instance.watcher_binded);
        window.removeEventListener('scroll', instance.watcher_binded);
        document.documentElement.removeEventListener('scroll', instance.watcher_binded);
        document.body.removeEventListener('scroll', instance.watcher_binded);
        instance.mo.disconnect();
        instance.scrollAreasOftargets.forEach(function (target) {
            target.removeEventListener('scroll', instance.watcher_binded);
        });
    };
    Controller.isIntersecting = function (target, root, rootMargin) {
        return isIntersecting_1.default.is(target, root, rootMargin);
    };
    Controller.isDisplay = function (target) {
        return IsDisplay.default(target);
    };
    Object.defineProperty(Controller, "THROTTLE_INTERVAL", {
        get: function () {
            return 33;
        },
        enumerable: true,
        configurable: true
    });
    return Controller;
}());
exports.default = Controller;
});

unwrapExports(Controller_1);

var rikaaaIntersectionWatcher_1 = createCommonjsModule(function (module, exports) {
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var defaultOption = { rootMargin: '0px', root: null };
var controller = new Controller_1.default();
var rikaaaIntersectionWatcher = /** @class */ (function () {
    function rikaaaIntersectionWatcher(callback, option) {
        if (option === void 0) { option = {}; }
        this.callback = callback;
        this.targets = [];
        this.entries = [];
        this.option = __assign({}, defaultOption, option);
        controller.init(this);
    }
    rikaaaIntersectionWatcher.prototype.observe = function (target) {
        var exist = this.targets.includes(target);
        if (!exist)
            this.targets.push(target);
        controller.observe();
    };
    rikaaaIntersectionWatcher.prototype.unobserve = function (target) {
        this.targets = this.targets.filter(function (existTarget) { return existTarget !== target; });
        controller.unobserve();
    };
    rikaaaIntersectionWatcher.prototype.disconnect = function () {
        this.targets = [];
        controller.disconnect();
    };
    rikaaaIntersectionWatcher.isIntersecting = function (target, root, rootMargin) {
        return Controller_1.default.isIntersecting(target, root, rootMargin);
    };
    rikaaaIntersectionWatcher.isDisplay = function (target) {
        return Controller_1.default.isDisplay(target);
    };
    Object.defineProperty(rikaaaIntersectionWatcher, "THROTTLE_INTERVAL", {
        get: function () {
            return Controller_1.default.THROTTLE_INTERVAL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(rikaaaIntersectionWatcher, "CONTROLLER", {
        get: function () {
            return controller;
        },
        enumerable: true,
        configurable: true
    });
    return rikaaaIntersectionWatcher;
}());
exports.default = rikaaaIntersectionWatcher;
});

var rikaaaIntersectionWatcher = unwrapExports(rikaaaIntersectionWatcher_1);

export default rikaaaIntersectionWatcher;
