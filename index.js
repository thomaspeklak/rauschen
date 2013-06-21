"use strict";

var seaport = require("seaport");
var fork = require("simple-fork");

var port = process.argv[2] || 9200;
var s = seaport.createServer();
s.listen(port);

var registry = require("rauschen-registry").server("localhost", port);
//var receiver = fork("rauschen-receiver", ["localhost", port], "receiver shutting down");
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
