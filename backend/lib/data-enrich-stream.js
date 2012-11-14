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
    this.count = 0;
    this.data = data;
    this.stream = stream;

    geoip(data.remoteAddress , createCallback('geo').bind(this));
    userAgent(data.userAgent , createCallback('userAgent').bind(this));
    url(data.referer         , createCallback('referer').bind(this));

};
StreamProcessor.prototype.passStream = function(type, result){
    this.count += 1;
    if(this.count == 3){
        this.stream.queue(JSON.stringify(this.data));
    }
};

module.exports = through(function write(data){
    if(typeof data !== 'string') return;
    var parsedData = JSON.parse(data);
    new StreamProcessor(parsedData, this);
}, function end(){
    this.queue();
});

