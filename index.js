"use strict";

var cp = require("child_process");
var processor, receiver, analyser;
var production = process.env.NODE_ENV === "production" ? true : false;

function startReceiver() {
    if (production) {
        receiver = cp.fork("./receiver");
    } else {
        receiver = cp.fork("./node_modules/nodemon", ["./receiver"], {
            cwd: __dirname
        });
    }

    receiver.on("message", function (message) {
        console.log(message);
    }).on("exit", function () {
        console.log("receiver shutting down");
    });
}

function startProcessor() {
    if (production) {
        processor = cp.fork("./processor");
    } else {
        processor = cp.fork("./node_modules/nodemon", ["./processor"], {
            cwd: __dirname
        });
    }

    processor.on("message", function (message) {
        console.log(message);
    }).on("exit", function () {
        console.log("processor shutting down");
    });
}

function startAnalyser() {
    if (production) {
        analyser = cp.fork("./analyser/app");
    } else {
        analyser = cp.fork("./node_modules/nodemon", ["./analyser/app.js"], {
            cwd: __dirname
        });
    }

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
