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
        console.log("processor shutting down");
    });
}

function startAnalyser () {
    analyser = cp.fork("./analyser/app");
    analyser.on("message", function (message) {
        console.log(message);
    }).on("exit", function () {
        console.log("analyser shutting down");
    });
}


var shutdown = function () {
    receiver.kill();
    processor.kill();
    analyser.kill();
};

startReceiver();
startProcessor();
startAnalyser();

process.on("exit", shutdown);
process.on("uncaughtException", shutdown);

