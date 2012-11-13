var through     = require("through");
var async       = require("async");
var geoip       = require("./geoip");
var userAgent   = require("./user-agent-detector");
var url         = require("./url-disector");

var parallelEnrichers = {
    geo: function(cb){
        geoip(data.remoteAddress, function(err, geoData){
            if(!err){ data.geo = geoData; }
            cb();
        });
    },
    userAgent: function(cb){
        userAgent(data.userAgent, function(err, userAgentData){
            if(!err){ data.userAgentData = userAgentData; }
            cb();
        });
    },
    referer: function(cb){
        url(data.referer, function(err, urlData){
            if(!err){ data.url = urlData; }
            cb();
        });
    }
};

var processStream = function(data, stream){
    async.parallel( parallelEnrichers, function(){
        stream.queue(JSON.stringify(data));
    });
};

module.exports = through(function write(data){
    if(typeof data !== 'string') return;
    var parsedData = JSON.parse(data);
    processStream(parsedData, this);
}, function end(){
    this.queue();
});
