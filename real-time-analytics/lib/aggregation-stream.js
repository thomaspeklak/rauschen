"use strict";

var through = require("through");
var StatsQueue = require("./stats-queue");

module.exports = function (interval) {
    var queue = new StatsQueue();
    interval = interval || 1000;

    var stream = through(function write(data) {
        var timings = JSON.parse(data);
        queue.push(timings);
    }, function end() {
        this.queue();
        clearInterval(timer);
    });
    var timer = setInterval(function () {
        var stats = queue.join();
        if (stats) {
            debugger;
            stream.queue(JSON.stringify(stats));
        }
    }, interval);

    stream.stop = function () {
        clearInterval(timer);
    };

    return stream;
};
