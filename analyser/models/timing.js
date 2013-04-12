"use strict";

var db = require("../lib/database");
var config = require("../../config");
var hostnameToCollection = require("../../lib/hostname-to-collection");
var JSONStream = require("JSONStream");

var Batch = function () {
    this.items = [];
};

Batch.prototype.push = function (item) {
    this.items.push(item);
};

Batch.prototype.statistics  = function () {
    var items = this.items;
    if (items.length == 0) return {};

    var keys = Object.keys(items[0]);

    return items.reduce(function (p, c, i) {
        keys.forEach(function (key) {
            var value = c[key];
            if (value < p.min[key] || p.min[key] == undefined) p.min[key] = value;
            if (value > p.max[key] || p.max[key] == undefined) p.max[key] = value;
            p.mean[key] = (p.mean[key] || 0) + value;

            if (i == items.length - 1) {
                p.mean[key] = p.mean[key] / items.length;
            }
        });

        return p;
    }, {
        min: {},
        max: {},
        mean: {},
        count: items.length
    });
};

Batch.prototype.reset = function () {
    this.items = [];
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

                    batch.push(data.performance.timing);
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
