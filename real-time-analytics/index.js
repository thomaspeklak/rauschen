var Statistics = require("./lib/statistics");
var statistics = {};

process.stdin.write = function(data){
    console.dir(data);

};
process.stdin.on('data', function(buf){
   var data = JSON.parse(buf);
   if(!data.referrer.host) return;

   var host = data.referrer.host;
   if(!statistics[host]){
        statistics[host] = new Statistics();
   }

   statistics[host].push(data.performance.timing);
});

