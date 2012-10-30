var net                  = require("net");
var async                = require("async");
var Scuttlebutt          = require("scuttlebutt/model");
var timing               = new Scuttlebutt();
var socket               = "/tmp/rauschen.sock";
var dataExtractionStream = require("./lib/data-extraction-stream.js");
var dataEnrichStream     = require("./lib/data-enrich-stream.js");

var timingStream = timing.createStream();

timingStream.pipe(net.connect(socket)).pipe(timingStream);

timingStream
    .pipe(dataExtractionStream)
    .pipe(dataEnrichStream)
    .pipe(process.stdout);

