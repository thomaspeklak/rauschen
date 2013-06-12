"use strict";

var spawn = require("./lib/spawn");

var receiver = spawn("./receiver", "receiver shutting down");
var processor = spawn("./processor", "processor shutting down");
var analyser = spawn("./analyser/app.js", "analyser shutting down");

var shutdown = function () {
    console.log("shutting down app");
    receiver.kill();
    processor.kill();
    analyser.kill();
};

process.on("exit", shutdown);
process.on("uncaughtException", shutdown);
