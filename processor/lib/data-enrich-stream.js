"use strict";

var through         = require("through");
var StreamProcessor = require("./stream-processor");

module.exports = through(function write(data) {
    new StreamProcessor(data, this).process();
}, function end() {
    this.queue();
});

