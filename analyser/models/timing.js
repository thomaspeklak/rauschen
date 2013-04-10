"use strict";

var db = require("../lib/database");
var config = require("../../config");
var hostnameToCollection = require("../../lib/hostname-to-collection");
var JSONStream = require("JSONStream");

var round = function (date, timespan) {
    return parseInt(date.getTime() / timespan, 10);
};

var statistics = function (timings) {
    var keys = Object.keys(timings[0]);

    var stats = {};


    return stats;
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
                var dataStream = collection.find().stream();
                dataStream.on("data", function (data) {
                    s.write(data);
                });

                dataStream.on("end", function (data) {
                    if (data) s.write(data);
                    s.end();
                });

            });
            return s;
        }
    });
});
