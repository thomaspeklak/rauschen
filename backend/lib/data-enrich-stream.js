var through     = require("through");
var geoip       = require("./geoip");
var userAgent   = require("./user-agent-detector");
var url         = require("./url-disector");

var createCallback = function(type){
    return function(err, result){
        if(result){ data[type] = result; }
        passStream();
    };
};

var processStream = function(data, stream){
    var count = 0;
    this.data = data;
    this.passStream = function(type, result){
        count += 1;
        if(count == 3){
            stream.queue(JSON.stringify(data));
        }
    };

    geoip(data.remoteAddress , createCallback('geo').bind(this));
    userAgent(data.userAgent , createCallback('userAgent').bind(this));
    url(data.referer         , createCallback('referer').bind(this));

};

module.exports = through(function write(data){
    if(typeof data !== 'string') return;
    var parsedData = JSON.parse(data);
    processStream(parsedData, this);
}, function end(){
    this.queue();
});

