"use strict";

var net         = require("net");
var Scuttlebutt = require("scuttlebutt/model");
var timing = new Scuttlebutt();
var es          = require("event-stream");
var fs          = require("fs");
var socket = require("../config").sockets.receiver;
var persistenceStream    = require("./lib/persistence-stream");
var dataExtractionStream = require("./lib/data-extraction-stream");
var dataEnrichStream     = require("./lib/data-enrich-stream");

var timingStream = timing.createStream();
var enrichedStream = timingStream.pipe(dataExtractionStream()).pipe(dataEnrichStream());
enrichedStream.pipe(persistenceStream);

    //enrichedStream.pipe(process.stdout);
    //timingStream.pipe(process.stdout);

var delayInitilization = function () {
    console.log("processor trying to connect to receiver");
    setTimeout(initilizeStream, 1000);
};

var msg = function (message) {
    return function () {
        console.log(message);
    };
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


    connection.on("connect", msg("connecting to receiver"));
    connection.on("timeout", msg("stream timeout"));
    connection.on("close", cleanupAndInitialize);

    timingStream.pipe(connection).pipe(timingStream, {end: false});
};

process.on('uncaughtException', function (err) {
      console.log('Caught exception: ' + err);
});

initilizeStream();

function spawnRTA () {
    var spawn = require("child_process").spawn;
    var args = ["--debug", __dirname + "/../real-time-analytics"];
    var rta = spawn(process.execPath, args, {
        stdio: ["pipe", 1, 2, "ipc"]
    });
    enrichedStream.pipe(es.stringify()).pipe(rta.stdin);

    rta.on("exit", function (code, signal) {
        if (code === null) {
            spawnRTA();
        }
    });
    process.on("exit", function () {
        rta.kill();
    });
}

//spawnRTA();

process.send && process.send("processor turned on");

