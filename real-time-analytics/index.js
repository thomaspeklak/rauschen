console.log('spawning real time analytics');

var aggregationStream = require("./lib/aggregation-stream");
var statistics = {};

process.stdin.resume();

process.stdin.on('data', function(buf){
    var data = JSON.parse(buf);
    if(!data.referrer.host) return;

    var host = data.referrer.host;
    if(!statistics[host]){
        statistics[host] = aggregationStream();
        statistics[host].pipe(process.stdout);
        statistics[host].pause();
    }

    statistics[host].write(JSON.stringify(data.performance.timing));
});

