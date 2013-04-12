"use strict";

var db = require("../lib/database");
var config = require("../../config");
var hostnameToCollection = require("../../lib/hostname-to-collection");
var JSONStream = require("JSONStream");

var Batch = function () {
    this.reset();
};

Batch.prototype.add = function (item) {
    var s = this.stats;
    var keys = this.keys(item);

    keys.forEach(function (key) {
        var value = item[key];
        if (value < s.min[key] || s.min[key] == undefined) s.min[key] = value;
        if (value > s.max[key] || s.max[key] == undefined) s.max[key] = value;
        s.mean[key] = (((s.mean[key] || 0) * s.count) + value) / (s.count + 1);
    });

    s.count += 1;
};

Batch.prototype.keys = function (item) {
   return this.timingKeys || Object.keys(item);
};

Batch.prototype.statistics  = function () {
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

var round = function (date, timespan) {
    return parseInt(date.getTime() / timespan, 10);
};

config.domains.forEach(function (domain) {
    var collection = hostnameToCollection(domain);
    db.bind(collection, {
        statistics: function (timespan, from, to) {
            var s = JSONStream.stringify();
            this.open(function (err, collection) {
                if (err) {
                    console.dir(err);
                    return s.end();
                }

                var timeStamp = 0;
                var batch = new Batch;

                var dataStream = collection.find({}, {
                    _id: 0,
                    "performance.timing": 1,
                    "createdAt" : 1
                }).sort({createdAt: -1}).stream();

                dataStream.on("data", function (data) {
                    var newTimeStamp = round(data.createdAt, timespan);

                    if (timeStamp == 0) {
                        timeStamp = newTimeStamp;
                    }

                    if (timeStamp > newTimeStamp) {
                        timeStamp = newTimeStamp;
                        var stats = batch.statistics();
                        stats.timestamp = data.createdAt.getTime();
                        s.write(stats);
                        batch.reset();
                    }

                    batch.add(data.performance.timing);
                });

                dataStream.on("end", function (data) {
                    if (data) batch.push(data.performance.timing);
                    s.write(batch.statistics());
                    s.end();
                });

            });
            return s;
        }
    });
});
