var through = require("through");
var StatsQueue = require("./stats-queue");

module.exports = function(interval){
    var queue = new StatsQueue();
    interval = interval || 1000;

    var stream = through(function write(buf){
        if(typeof buf !== 'string') return;
        var data = JSON.parse(buf);
        queue.push(data);
        var self = this;
    }, function end(){
        this.queue();
        clearInterval(timer);
    });
    var timer = setInterval(function(){
        var stats = queue.join();
        if(stats){
            stream.queue(stats);
        }
    }, interval);

    stream.stop = function(){
        clearInterval(timer);
    };

    return stream;
};
