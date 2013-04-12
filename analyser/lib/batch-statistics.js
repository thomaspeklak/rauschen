"use strict";

var Batch = function () {
    this.reset();
};

Batch.prototype.add = function (item) {
    var s = this.stats;
    var keys = this.keys(item);

    keys.forEach(function (key) {
        var value = item[key];
        if (value < s.min[key] || s.min[key] == undefined) s.min[key] = value;
        if (value > s.max[key] ||  s.max[key] == undefined) s.max[key] = value;
        s.mean[key] = (((s.mean[key] ||  0) * s.count) + value) / (s.count + 1);
    });

    s.count += 1;
};

Batch.prototype.keys = function (item) {
    return this.timingKeys || Object.keys(item);
};

Batch.prototype.statistics = function () {
    return this.stats;
};

Batch.prototype.reset = function () {
    this.stats = {
        min: {},
        max: {},
        mean: {},
        count: 0
    };
};

module.exports = Batch;
