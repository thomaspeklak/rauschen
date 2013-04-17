"use strict";

var db = require("../lib/database");
var config = require("../../config");
var hostnameToCollection = require("../../lib/hostname-to-collection");
var JSONStream = require("JSONStream");
var Batch = require("../lib/batch-statistics");


var round = function (date, timespan) {
    return parseInt(date.getTime() / timespan, 10);
};

config.domains.forEach(function (domain) {
    var collection = hostnameToCollection(domain);
    db.bind(collection, {
        statistics: function (timespan, finder, maxCount) {
            var s = JSONStream.stringify();
            this.open(function (err, collection) {
                if (err) {
                    console.dir(err);
                    return s.end();
                }

                maxCount = maxCount || 100;
                var count = 0;
                var timeStamp = 0;
                var batch = new Batch;
                var lastTimeStamp;

                var dataStream = collection.find(finder, {
                    _id: 0,
                    "performance.timing": 1,
                    "createdAt" : 1
                }).sort({createdAt: -1}).stream();

                dataStream.on("data", function (data) {
                    var newTimeStamp = round(data.createdAt, timespan);

                    if (timeStamp > newTimeStamp) {
                        var stats = batch.statistics();
                        stats.timestamp = data.createdAt.getTime();
                        s.write(stats);
                        batch.reset();
                    }

                    if (timeStamp === 0 || timeStamp > newTimeStamp) {
                        timeStamp = newTimeStamp;
                        count += 1;
                    }


                    if (count > maxCount) {
                        s.end();
                        dataStream.destroy();
                    }

                    batch.add(data.performance.timing);

                    lastTimeStamp = data.createdAt;
                });

                dataStream.on("end", function (data) {
                    if (data) batch.add(data.performance.timing);

                    var stats = batch.statistics();
                    stats.timestamp = (data && data.createdAt || lastTimeStamp).getTime();
                    s.write(stats);
                    s.end();
                });

            });
            return s;
        }
    });
});
