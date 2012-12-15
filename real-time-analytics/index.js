console.log('spawning real time analytics');

var es = require("event-stream");
var fs = require("fs");
var logStream = fs.createWriteStream(__dirname + "/../tmp/rta.log");

var aggregationStream = require("./lib/aggregation-stream");
var statistics = {};

process.stdin.resume();

process.stdin.pipe(es.parse()).pipe(es.map(function(data){
    if(!data.referrer.host) return;

    var host = data.referrer.host;
    if(!statistics[host]){
        statistics[host] = aggregationStream();
        statistics[host].pipe(logStream);
        statistics[host].pause();
    }

    statistics[host].write(JSON.stringify(data.performance.timing));
}));

