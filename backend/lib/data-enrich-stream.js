var through     = require("through");
var geoip       = require("./geoip");
var userAgent   = require("./user-agent-detector");
var url         = require("./url-disector");

var processStream = function(data, stream){
    var count = 0;
    var passStream = function(){
        count += 1;
        if(count == 3){
            stream.queue(JSON.stringify(data));
        }
    };

    geoip(data.remoteAddress, function(err, result){
        if(result){ data.geo = result;}
        passStream();
    });
    userAgent(data.userAgent, function(err, result){
        if(result){ data.userAgent = result ;}
        passStream();
    });
    url(data.referer, function(err, result){
        if(result){ data.referer = result;}
        passStream();
    });

};

module.exports = through(function write(data){
    if(typeof data !== 'string') return;
    var parsedData = JSON.parse(data);
    processStream(parsedData, this);
}, function end(){
    this.queue();
});

