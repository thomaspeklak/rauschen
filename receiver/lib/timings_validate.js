"use strict";

module.exports = function (timings) {
    var base = timings.navigationStart;
    for (var key in timings) {
        var timing = timings[key];
        if (timing !== 0 && timing < base) return false;
    }

    return true;
};
