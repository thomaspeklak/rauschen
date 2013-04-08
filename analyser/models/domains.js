"use strict";

var db = require("../lib/database");

module.exports = {
    find: function (cb) {
        db.collections(function (err, collections) {
            if (err) return cb(err);

            var domains = collections.map(function (collection) {
                return collection.collectionName;
            }).filter(function (name) {
                if (name.indexOf("system.") === 0) return false;
                if (name == "sessions") return false;

                return true;
            });

            cb(null, domains);
        });
    }
};
