"use strict";

var cp = require("child_process");
var processor, receiver, analyser;

function startReceiver () {
    receiver = cp.fork("./node_modules/nodemon", ["./receiver"], {cwd: __dirname });
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
    console.log("shutting down app");
    receiver.kill();
    processor.kill();
    analyser.kill();
};

startReceiver();
startProcessor();
startAnalyser();

process.on("exit", shutdown);
process.on("uncaughtException", shutdown);

