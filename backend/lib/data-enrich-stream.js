var through     = require("through");
var geoip       = require("./geoip");
var userAgent   = require("./user-agent-detector");
var url         = require("./url-disector");

var createCallback = function(type){
    return function(err, result){
        if(result){ this.data[type] = result; }
        this.passStream();
    };
};

var StreamProcessor = function(data, stream){
    this.queue = 3;
    this.data = JSON.parse(data);
    this.stream = stream;
};

StreamProcessor.prototype.process = function(){
    geoip(this.data.remoteAddress , createCallback('geo').bind(this));
    userAgent(this.data.userAgent , createCallback('userAgent').bind(this));
    url(this.data.referer         , createCallback('referer').bind(this));
};

StreamProcessor.prototype.passStream = function(type, result){
    this.queue -= 1;
    if(this.queue === 0){
        this.stream.queue(JSON.stringify(this.data));
    }
};

module.exports = through(function write(data){
    if(typeof data !== 'string') return;
    new StreamProcessor(data, this).process();
}, function end(){
    this.queue();
});

