"use strict";

module.exports = function (eventEmitter, event) {
    //only start counter if param rps is present
    if (!process.argv.some(function (argv) {
        return argv == "rps";
    })) { return; }

    console.log("intializing request per seconds counter");
    this.counter = 0;
    setInterval(function () {
        console.log(this.counter);
        this.counter = 0;
    }, 1000);

    eventEmitter.on(event, function () {
        this.counter += 1;
    }.bind(this));
};
