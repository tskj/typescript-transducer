"use strict";
var __assign = (this && this.__assign) || function () {
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
exports.__esModule = true;
var reduce_1 = require("./reduce");
var transduce_1 = require("./transduce");
var conjMap = function (xs, x) {
    var _a;
    return (__assign(__assign({}, xs), (_a = {}, _a[Math.random()] = x, _a)));
};
console.log(reduce_1.reduceList(transduce_1.mapping(function (x) { return x + 1; })(conjMap))([], [1, 2, 3, 4, 5]));
