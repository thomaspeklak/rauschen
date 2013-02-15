"use strict";

var StatsQueue = function () {
    this.sum = {};
    this.min = {};
    this.max = {};
    this.length = 0;
};

StatsQueue.prototype.push = function (data) {
    this.keys = this.keys || Object.keys(data);
    if (this.length === 0) {
        this.sum = this.clone(data);
        this.min = this.clone(data);
        this.max = this.clone(data);
    } else {
        this.calculate(data);
    }
    this.length += 1;
};

StatsQueue.prototype.clone = function (data) {
    var obj = {};
    this.keys.forEach(function (key) { obj[key] = data[key]; });
    return obj;
};

StatsQueue.prototype.calculate = function (data) {
    var self = this;
    self.keys.forEach(function (key) {
        self.sum[key] += data[key];
        self.min[key] = Math.min(self.min[key], data[key]);
        self.max[key] = Math.max(self.max[key], data[key]);
    });
};

StatsQueue.prototype.average = function () {
    var self = this;
    var average = {};
    self.keys.forEach(function (key) {
        average[key] = self.sum[key] / self.length;
    });
    return average;
};

StatsQueue.prototype.join = function () {
    if (this.length === 0) return null;

    var stats =  {
        min: this.min,
        max: this.max,
        average: this.average()
    };
    this.length = 0;

    return stats;
};

module.exports = StatsQueue;
