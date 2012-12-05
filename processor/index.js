var net         = require("net");
var Scuttlebutt = require("scuttlebutt/model");
var IpcStream   = require("ipc-stream");

var dataExtractionStream = require("./lib/data-extraction-stream.js");
var dataEnrichStream     = require("./lib/data-enrich-stream.js");
var persistenceStream    = require("./lib/persistence-stream.js");

var rta = require('child_process').fork("./real-time-analytics/index.js");
var rtaStream = new IpcStream(rta);

var timing = new Scuttlebutt();
var socket = "/tmp/rauschen.sock";

var timingStream = timing.createStream();

timingStream.pipe(net.connect(socket)).pipe(timingStream);

var enrichedStream = timingStream
                        .pipe(dataExtractionStream)
                        .pipe(dataEnrichStream)
                        .pipe(persistenceStream);

//enrichedStream.pipe(process.stdout);

enrichedStream.pipe(rtaStream);
