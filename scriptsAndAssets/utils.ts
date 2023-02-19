/**
 * Obsługuje dziedziczenie prototypowe opisane w rozdziale 1.
 * @param subConstructor funkcja konstruktora podklasy
 * @param superConstructor funkcja konstruktora nadklasy
 */
function extend(subConstructor, superConstructor) {
    subConstructor.prototype = Object.create(superConstructor.prototype, {
        constructor: {
            value: subConstructor,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
}

/**
 * Sprawdza, czy pracujemy z ekranem dotykowym, czy ze zwykłą przeglądarką. Wykorzystywane do określenia rodzaju
 * zdarzeń, które powinniśmy wykorzystywać: dotykowe lub myszki.
 */
function isTouchDevice() {
    return ('ontouchstart' in document.documentElement);
}

window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame
})();

window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame||
        clearTimeout
} )();

if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // odpowiednik wewnętrznej funkcji IsCallable zgodnej ze standardem ECMAScript 5.
            throw new TypeError("Function.prototype.bind - element nie może być wywołany");
        }

        var fSlice = Array.prototype.slice,
            aArgs = fSlice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP
                        ? this
                        : oThis || window,
                    aArgs.concat(fSlice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}