"use strict";

var cp = require("child_process");
var join = require("path").join;
var production = process.env.NODE_ENV === "production" ? true : false;

//fork a child process depending on the environment

module.exports = function (path, shutdownMessage) {
    path = join(__dirname, "..", path);
    var job = production ?
        cp.fork(path) :
        cp.fork(join(__dirname, "..", "node_modules", "nodemon"), [path], {
            cwd: __dirname
        });

    job.on("message", function (message) {
        console.log(message);
    }).on("exit", function () {
        console.log(shutdownMessage);
    });

    return job;
};

