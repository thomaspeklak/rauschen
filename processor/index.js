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
//timingStream.pipe(process.stdout);

var spawn = require('child_process').spawn;
var args = [  __dirname + '/../real-time-analytics' ];
var rta = spawn(process.execPath, args, { stdio: ['pipe', 1, 2, 'ipc'] });
enrichedStream.pipe(rta.stdin);

process.on("exit", function(){
    rta.kill();
});
