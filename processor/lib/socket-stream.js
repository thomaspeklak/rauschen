"use strict";

var net    = require("net");
var config = require("../../config");
var fs     = require("fs");

module.exports = function (cb) {
    var server = net.createServer(function (stream) {
        console.log("socket stream started");
        cb(stream);
    });

    server.listen(config.sockets.processor);
};

var cleanup = function (err) {
    if (err) {
        console.error(err);
        console.error(err.stack);
    }
    if (fs.existsSync(config.sockets.processor)) {
        fs.unlinkSync(config.sockets.processor);
    }
    process.exit();
};
process.on("SIGINT", cleanup);
process.on("uncaughtException", cleanup);
