"use strict";
var config  = require(__dirname + "/../../config");

//MongoDB
var Db         = require("mongodb").Db;
var Server     = require("mongodb").Server;

var server = new Server(
    config.db.host,
    config.db.port,
    {auto_reconnect: true, poolSize: 5}
);

var db = new Db(
    config.db.database,
    server, {safe: false, native_parser: true}
);

db.open(function (err) {
    if (err) {
        console.log(err);
        process.exit();
    }
});

module.exports = db;
