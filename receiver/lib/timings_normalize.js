module.exports = function(timings) {
    var base = timings.navigationStart;

    var normalized_timings = {};

    for (var key in timings) {
        if (timings[key] !== 0) {
            normalized_timings[key] = timings[key] - base;
        }
    };

    return normalized_timings
};
