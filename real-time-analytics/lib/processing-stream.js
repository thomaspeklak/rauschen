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
        var data = JSON.parse(buffer);

        //console.dir(data);
    };

    return stream;
};


var statistics = {};
var processData = function (data) {
    data = data.toString();
    if (!data && !data.referrer && !data.referrer.host) return;

    var host = data.referrer.host;
    if (!statistics[host]) {
        statistics[host] = aggregationStream();
        statistics[host].pipe(logStream);
        statistics[host].pause();
    }

    statistics[host].write(JSON.stringify(data.performance.timing));
};
