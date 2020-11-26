"use strict";
exports.__esModule = true;
exports.filtering = exports.mapping = void 0;
exports.mapping = function (f) { return function (r) { return function (result, value) { return r(result, f(value)); }; }; };
exports.filtering = function (p) { return function (r) { return function (result, value) {
    if (p(value)) {
        return r(result, value);
    }
    else {
        return result;
    }
}; }; };
// const flatmapping = <a, b>(f: (x: a) => any) => (r) => (result, value) =>
//   r(result, f(value));
