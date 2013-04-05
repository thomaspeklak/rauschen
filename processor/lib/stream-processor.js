"use strict";

var geoip       = require("./geoip");
var userAgent   = require("./user-agent-detector");
var url         = require("./url-disector");

var createCallback = function (type) {
    return function (err, result) {
        if (result) { this.data[type] = result; }
        this.passStream();
    };
};

var StreamProcessor = function (data, stream) {
    this.queue  = 3;
    this.data   = data;
    this.stream = stream;
    this.data.createdAt = new Date();
};

StreamProcessor.prototype.start = function () {
    geoip(this.data.remoteAddress, createCallback("geo").bind(this));
    userAgent(this.data.userAgent, createCallback("userAgent").bind(this));
    url(this.data.referrer,        createCallback("referrer").bind(this));
};

StreamProcessor.prototype.passStream = function () {
    this.queue -= 1;
    if (this.queue === 0) {
        this.stream.queue(this.data);
    }
};

module.exports = StreamProcessor;
