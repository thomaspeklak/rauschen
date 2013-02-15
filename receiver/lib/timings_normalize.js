"use strict";

module.exports = function (timings) {
    var base = timings.navigationStart;

    var normalizedTimings = {};

    for (var key in timings) {
        if (timings[key] !== 0) {
            normalizedTimings[key] = timings[key] - base;
        }
    }

    return normalizedTimings;
};
