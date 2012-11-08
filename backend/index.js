var net                  = require("net");
var Scuttlebutt          = require("scuttlebutt/model");
var timing               = new Scuttlebutt();
var socket               = "/tmp/rauschen.sock";
var dataExtractionStream = require("./lib/data-extraction-stream.js");
var dataEnrichStream     = require("./lib/data-enrich-stream.js");
var persistenceStream    = require("./lib/persistence-stream.js");

var timingStream = timing.createStream();

timingStream.pipe(net.connect(socket)).pipe(timingStream);

var enrichedStream = timingStream
                        .pipe(dataExtractionStream)
                        .pipe(dataEnrichStream);

//enrichedStream.pipe(process.stdout);
enrichedStream.pipe(persistenceStream);

