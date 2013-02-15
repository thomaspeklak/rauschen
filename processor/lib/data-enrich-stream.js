"use strict";

var through         = require("through");
var StreamProcessor = require("./stream-processor");

module.exports = function () {
    return through(function write(data) {
        (new StreamProcessor(data, this)).start();
    }, function end() {
        this.queue();
    });
};
