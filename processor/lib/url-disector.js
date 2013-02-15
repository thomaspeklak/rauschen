"use strict";

var url = require("url");

module.exports = function (urlData, cb) {
    process.nextTick(function () {
        cb(null,
           url.parse(urlData)
        );
    });
};
