"use strict";

var seaport = require("seaport");
var fork = require("simple-fork");
var join = require("path").join;

var port = process.argv[2] || 9200;
var s = seaport.createServer();
s.listen(port);
console.log("seaport listening on " + port);

var pathFor = function (module) {
    return join(__dirname, "node_modules", module);
};

var registry = require("rauschen-registry");
registry.server("localhost", port);
var receiver = fork(pathFor("rauschen-receiver"), ["localhost", port], "receiver shutting down");
//var processor = fork("rauschen-processor", ["localhost", port], "processor shutting down");
//var analyser = fork("rauschen-analyser", ["localhost", port], "analyser shutting down");

var shutdown = function (e) {
    if (e) {
        console.error(e);
    }
    console.log("shutting down app");
    receiver.kill();
    processor.kill();
    analyser.kill();
};

process.on("exit", shutdown);
process.on("uncaughtException", shutdown);
