const assert = require('assert');
require('intersection-observer');
const rikaaaIntersectionWatcher = require('../rikaaa-IntersectionWatcher.dev.js');
// const isIntersecting = require('../src/preprosess/isIntersecting');
const sinon = require('sinon');

let iw1, iw2, spy1, spy2;

let targets, scrollarea,flexArea;

let counter = 0;

let INTERVAL = rikaaaIntersectionWatcher.THROTTLE_INTERVAL;
let CONTROLLER = rikaaaIntersectionWatcher.CONTROLLER;

if (!Array.from) {
    Array.from = (function () {
        var toStr = Object.prototype.toString;
        var isCallable = function (fn) {
            return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        var toInteger = function (value) {
            var number = Number(value);
            if (isNaN(number)) {
                return 0;
            }
            if (number === 0 || !isFinite(number)) {
                return number;
            }
            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSafeInteger = Math.pow(2, 53) - 1;
        var toLength = function (value) {
            var len = toInteger(value);
            return Math.min(Math.max(len, 0), maxSafeInteger);
        };

        // The length property of the from method is 1.
        return function from(arrayLike /*, mapFn, thisArg */ ) {
            // 1. Let C be the this value.
            var C = this;

            // 2. Let items be ToObject(arrayLike).
            var items = Object(arrayLike);

            // 3. ReturnIfAbrupt(items).
            if (arrayLike == null) {
                throw new TypeError('Array.from requires an array-like object - not null or undefined');
            }

            // 4. If mapfn is undefined, then let mapping be false.
            var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
            var T;
            if (typeof mapFn !== 'undefined') {
                // 5. else
                // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                if (!isCallable(mapFn)) {
                    throw new TypeError('Array.from: when provided, the second argument must be a function');
                }

                // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                if (arguments.length > 2) {
                    T = arguments[2];
                }
            }

            // 10. Let lenValue be Get(items, "length").
            // 11. Let len be ToLength(lenValue).
            var len = toLength(items.length);

            // 13. If IsConstructor(C) is true, then
            // 13. a. Let A be the result of calling the [[Construct]] internal method 
            // of C with an argument list containing the single item len.
            // 14. a. Else, Let A be ArrayCreate(len).
            var A = isCallable(C) ? Object(new C(len)) : new Array(len);

            // 16. Let k be 0.
            var k = 0;
            // 17. Repeat, while k < len… (also steps a - h)
            var kValue;
            while (k < len) {
                kValue = items[k];
                if (mapFn) {
                    A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                } else {
                    A[k] = kValue;
                }
                k += 1;
            }
            // 18. Let putStatus be Put(A, "length", len, true).
            A.length = len;
            // 20. Return A.
            return A;
        };
    }());
}

let sample = {
    rootWindow_scrollTop: [
        { "isIntersecting": false },
        { "isIntersecting": true },
        { "isIntersecting": true },
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": false }],
    rootWindowN_scrollBottom: [
        { "isIntersecting": false },
        { "isIntersecting": true },
        { "isIntersecting": true },
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": true },
        { "isIntersecting": true },
        { "isIntersecting": true },
        { "isIntersecting": true },
        { "isIntersecting": true },
        { "isIntersecting": true }],
    rootScrollArea: [
        { "isIntersecting": false },
        { "isIntersecting": true },
        { "isIntersecting": true },
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": true },
        { "isIntersecting": true },
        { "isIntersecting": true },
        { "isIntersecting": true },
        { "isIntersecting": true },
        { "isIntersecting": true },
    ],
    rootScrollArea_isBorderbox: [
        { "isIntersecting": false },
        { "isIntersecting": true },
        { "isIntersecting": true },
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": true },
        { "isIntersecting": true },
        { "isIntersecting": true },
        { "isIntersecting": true },
    ],
    rootWindow_scrollTop_margin100px: [{ "isIntersecting": false }, { "isIntersecting": true }, { "isIntersecting": true }, { "isIntersecting": false }, { "isIntersecting": false }, { "isIntersecting": false }, { "isIntersecting": true }, { "isIntersecting": true }, { "isIntersecting": true }, { "isIntersecting": true }, { "isIntersecting": true }, { "isIntersecting": true }],
    rootScrollarea_scrollTop_margin_minas1_1par: [
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": true },
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": false },
        { "isIntersecting": true },
        { "isIntersecting": true },
        { "isIntersecting": true },
        { "isIntersecting": true },
    ]
}




describe('rikaaa-IntersectionWatcher.js', () => {
    console.log('descrive-top');

    before(function () {
        console.log('before');
        document.body.innerHTML = __html__['rikaaa-IntersectionWatcher.test.html']; //view html 
        
        flexArea = Array.from(document.querySelectorAll('.scroll-area-flex'));
        targets = Array.from(document.querySelectorAll('.scroll-area-target'));
        scrollarea = Array.from(document.querySelectorAll('.scroll-area'));  

        // viewport.set(1000, 978);

        // const io = new IntersectionObserver(entries => {
        //    console.log(entries);
        // });
        // io.observe(targets[0]);

        // const rio = new rikaaaIntersectionWatcher(entries => {
        //     console.log(entries);
        // });
        // rio.observe(targets[0]);

    });

    it('observe', done => {
        counter++;

        spy1 = sinon.spy();
        spy2 = sinon.spy();

        iw1 = new rikaaaIntersectionWatcher(spy1);
        iw2 = new rikaaaIntersectionWatcher(spy2);

        targets.forEach(target => iw1.observe(target));
        targets.forEach(target => iw1.observe(target));
        
        targets.forEach(target => iw2.observe(target));
        targets.forEach(target => iw2.observe(target));
        
        assert(iw1.targets.length === 12);
        assert(iw2.targets.length === 12);
        assert(CONTROLLER.targetsAll.length === 24);
        

        setTimeout(function () {
            counter++;
            assert(spy1.callCount === 1);
            assert(spy2.callCount === 1);

            const spy1_arg = spy1.getCall(0).args[0];
            const spy2_arg = spy2.getCall(0).args[0];

            assert(spy1_arg.length === 12);
            assert(spy2_arg.length === 12);

            done();

        },INTERVAL*counter);
    });
    it('unobserve', done => {
        counter++;
        targets.forEach(target => iw1.unobserve(target));

        assert(iw1.targets.length === 0);
        assert(iw2.targets.length === 12);
        assert(CONTROLLER.targetsAll.length === 12);

        done();
    });
    it('disconnect', done => {
        counter++;
        iw1.disconnect();
        iw2.disconnect();

        assert(iw1.targets.length === 0);
        assert(iw2.targets.length === 0);
        assert(CONTROLLER.targetsAll.length === 0);
        assert(CONTROLLER.scrollAreasOftargets.length === 0);

        done();
    });
    it('is display', done => {
       const target = targets[0];

       target.style.display = 'none';

       const result = rikaaaIntersectionWatcher.isDisplay(target);

       target.style.display = '';

       assert(result === false);

       done();
       
    });
    // it('is intersection', done => {
    //     targets.forEach((target, i) => {
    //         assert(sample.rootWindow_scrollTop[i].isIntersecting === rikaaaIntersectionWatcher.isIntersecting(target, null));
    //     });

    //     window.scrollTo(0, 1000);

    //     targets.forEach((target, i) => {
    //         assert(sample.rootWindowN_scrollBottom[i].isIntersecting === rikaaaIntersectionWatcher.isIntersecting(target, null));
    //     });

    //     window.scrollTo(0, 0);

    //     targets.forEach((target, i) => {
    //         assert(sample.rootScrollArea[i].isIntersecting === rikaaaIntersectionWatcher.isIntersecting(target, scrollarea[i]));
    //     });

    //     scrollarea.forEach(target => target.style.boxSizing = 'border-box');

    //     targets.forEach((target, i) => {
    //         assert(sample.rootScrollArea_isBorderbox[i].isIntersecting === rikaaaIntersectionWatcher.isIntersecting(target, scrollarea[i]));
    //     });

    //     scrollarea.forEach(target => target.style.boxSizing = '');

    //     targets.forEach((target, i) => {
    //         assert(sample.rootWindow_scrollTop_margin100px[i].isIntersecting === rikaaaIntersectionWatcher.isIntersecting(target, null, '100px'));
    //     });

    //     targets.forEach((target, i) => {
    //         assert(sample.rootScrollarea_scrollTop_margin_minas1_1par[i].isIntersecting === rikaaaIntersectionWatcher.isIntersecting(target, scrollarea[i], '-1.1%'));
    //     });

    //     done();
    // });
});