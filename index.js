"use strict";

var fork = require("simple-fork");

var receiver = fork("rausche-receiver", "receiver shutting down");
var processor = fork("rausche-processor", "processor shutting down");
var analyser = fork("rauschen-analyser", "analyser shutting down");

var shutdown = function () {
    console.log("shutting down app");
    receiver.kill();
    processor.kill();
    analyser.kill();
};

process.on("exit", shutdown);
process.on("uncaughtException", shutdown);
