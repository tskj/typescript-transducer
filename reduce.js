"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.concatList = exports.conjList = exports.reduceList = void 0;
exports.reduceList = function (reducer) { return function (acc, list) {
    if (list.length === 0) {
        return acc;
    }
    var x = list[0], xs = list.slice(1);
    return exports.reduceList(reducer)(reducer(acc, x), xs);
}; };
exports.conjList = function (list, x) { return __spreadArrays(list, [x]); };
exports.concatList = function (xs, ys) { return __spreadArrays(xs, ys); };
