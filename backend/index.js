var net                  = require("net");
var async                = require("async");
var Scuttlebutt          = require("scuttlebutt/model");
var timing               = new Scuttlebutt();
var socket               = "/tmp/rauschen.sock";
var dataExtractionStream = require("./lib/data-extraction-stream.js");
var geoDataStream     = require("./lib/geoip-stream.js");
var userAgentStream      = require("./lib/user-agent-stream.js");

var timingStream = timing.createStream();

timingStream.pipe(net.connect(socket)).pipe(timingStream);

timingStream
    .pipe(dataExtractionStream)
    .pipe(geoDataStream)
    .pipe(userAgentStream)
    .pipe(process.stdout);

