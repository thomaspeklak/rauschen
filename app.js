"use strict";

var cp = require("child_process");
var processor, receiver;

function startReceiver () {
    receiver = cp.fork("./receiver");
    receiver.on("message", function (message) {
        console.log(message);
    }).on("exit", function () {
        console.log("receiver shutting down");
    });
}

function startProcessor () {
    processor = cp.fork("./processor");
    processor.on("message", function (message) {
        console.log(message);
    }).on("exit", function () {
        console.log("receiver shutting down");
    });
}


var shutdown = function () {
    receiver.kill();
    processor.kill();
};

process.on("exit", shutdown);
process.on("uncaughtException", shutdown);

startReceiver();
startProcessor();
