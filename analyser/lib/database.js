"use strict";

var config = require("../../config");
var mongoskin = require("mongoskin");

module.exports = mongoskin.db(config.db.url + "?auto_reconnect=true", {
    safe: false
});

