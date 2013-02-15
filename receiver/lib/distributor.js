"use strict";

var net         = require("net");
var fs          = require("fs");
var Scuttlebutt = require("scuttlebutt/model");
var timing      = new Scuttlebutt();
var config      = require("../../config");

var distributor = function (app, remote) {
    app.on("data", function (data) {
        timing.set("data", data);
    });
};

var server = net.createServer(function (stream) {
    stream.pipe(timing.createStream()).pipe(stream);
});

server.listen(config.sockets.receiver);

var cleanup = function (err) {
    if (err) { console.error(err); }
    if (fs.existsSync(config.sockets.receiver)) {
        fs.unlinkSync(config.sockets.receiver);
    }
    process.exit();
};
process.on("SIGINT", cleanup);
process.on("uncaughtException", cleanup);

module.exports = distributor;
