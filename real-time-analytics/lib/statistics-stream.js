var through = require("through");

module.exports = function(interval){
    var queue = [];
    interval = interval || 1000;

    var stream = through(function write(data){
        if(typeof data !== 'string') return;
        queue.push(data);
        var self = this;
    }, function end(){
        this.queue();
    });
    setInterval(function(){
        if(queue.length){
            stream.queue(queue.join());
            queue = [];
        }
    }, interval);

    return stream;
};
