var net         = require("net");
var Scuttlebutt = require("scuttlebutt/model");

var dataExtractionStream = require("./lib/data-extraction-stream.js");
var dataEnrichStream     = require("./lib/data-enrich-stream.js");
var persistenceStream    = require("./lib/persistence-stream.js");

var timing = new Scuttlebutt();
var socket = "/tmp/rauschen.sock";

var timingStream = timing.createStream();

timingStream.pipe(net.connect(socket)).pipe(timingStream);

var enrichedStream = timingStream
                        .pipe(dataExtractionStream)
                        .pipe(dataEnrichStream)
                        .pipe(persistenceStream);

//enrichedStream.pipe(process.stdout);


