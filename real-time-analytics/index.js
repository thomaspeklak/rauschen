"use strict";

console.log("spawning real time analytics");

var fs = require("fs");
var net         = require("net");
var es = require("event-stream");
var socket = require("../config").sockets.processor;
var processingStream = require("./lib/processing-stream");


var msg = function (message) {
    return function () {
        console.log(message);
    };
};

var delayInitilization = function () {
    console.log("real time analytics trying to connect to processor");
    setTimeout(initilizeStream, 1000);
};

var initilizeStream = function () {

    if (!fs.existsSync(socket)) {
        return delayInitilization();
    }


    var connection = net.connect(socket);
    var cleanupAndInitialize = function () {
        connection.removeAllListeners();
        delayInitilization();
    };


    connection.on("connect", msg("connecting to processor"));
    connection.on("timeout", msg("stream timeout"));
    connection.on("close", cleanupAndInitialize);

    connection.pipe(processingStream(), {end: false});
};

process.on('uncaughtException', function (err) {
    console.error('Caught exception: ' + err);
    console.error(err.stack);
});

initilizeStream();
