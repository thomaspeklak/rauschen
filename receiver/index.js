"use strict";

var server = require("./server");
var path   = require("path");
var config = require("../config");

if (config.environment === "development") {
    new require("../lib/request-counter")(server, "new-request");
}

var domainRestrictor = require(
    path.join(__dirname, "lib", "domain-restrictor")
)(config.domains);

server.use(domainRestrictor);

require("./lib/distributor")(server);

server.listen(config.port);

if (process.send) {
    process.send("receiver turned on");

    process.on("exit", function () {
        process.send("receiver shutting down");
    });
}
