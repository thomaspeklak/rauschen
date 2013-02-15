"use strict";

var dots = /\./g;
var dashes = /-/g;
var nonAlphaNumeric = /[^a-z0-9_]/g;

module.exports = function (hostname) {
    return hostname
        .replace(dots, "_")
        .replace(dashes, "_")
        .toLowerCase()
        .replace(nonAlphaNumeric, "")
        ;
};
