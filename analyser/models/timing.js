"use strict";

var db = require("../lib/database");
var config = require("../../config");
var hostnameToCollection = require("../../lib/hostname-to-collection");

config.domains.forEach(function (domain) {
    var collection = hostnameToCollection(domain);
    db.bind(collection, {
        findAll: function (cb) {
            this.find().toArray(cb);
        }
    });

});



