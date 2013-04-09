"use strict";

var db = require("../lib/database");
var config = require("../../config");
var hostnameToCollection = require("../../lib/hostname-to-collection");

var configDomains = {};
config.domains.forEach(function (domain) {
    configDomains[hostnameToCollection(domain)] = domain;
});

var filterCollections = function (collections) {
    var collectionNames = Object.keys(configDomains);

    return collections.map(function (collection) {
        return collection.collectionName;
    }).filter(function (name) {
        return collectionNames.indexOf(name) !== -1;
    });
};

module.exports = {
    find: function (cb) {
        db.collections(function (err, collections) {
            if (err) return cb(err);

            var filteredCollections = filterCollections(collections);
            var usedDomains = {};
            filteredCollections.forEach(function (name) {
                usedDomains[name] = configDomains[name];
            });

            cb(null, usedDomains);
        });
    }
};
