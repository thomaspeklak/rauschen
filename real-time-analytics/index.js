process.stdin.pipe(process.stdout);

var statistics = {};

process.stdin.on('data', function(data){
   var timing = JSON.parse(data);
   if(!timing.referrer
});

