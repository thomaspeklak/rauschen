"use strict";

var fs = require("fs");
var Stream = require("stream").Writable;
var logStream = fs.createWriteStream(__dirname + "/../../tmp/rta.log");
var aggregationStream = require("./aggregation-stream");
var JSONStream = require("JSONStream");

module.exports = function () {
    var jsonStream = JSONStream.parse([true]);
    var stream = new Stream();

    stream.write = function (buffer) {
        try {
        var data = JSON.parse(buffer);
        processData(data);
        } catch (e) { } };
    return stream;
};


var statistics = {};
var processData = function (data) {
    if (!data && !data.referrer && !data.referrer.host) return;

    var host = data.referrer.host;
    if (!statistics[host]) {
        console.log("New aggregation stream for " + host);
        statistics[host] = aggregationStream();
        statistics[host].pipe(logStream);
        //statistics[host].pause();
    }
    statistics[host].write(data.performance.timing);
};
