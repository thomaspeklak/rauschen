var through     = require("through");
var async       = require("async");
var geoip       = require("./geoip");
var userAgent   = require("./user-agent-detector");
var url         = require("./url-disector");

module.exports = through(function write(data){
    if(typeof data !== 'string') return;
    var parsedData = JSON.parse(data);
    processStream(parsedData, this);
}, function end(){
    this.queue();
});

var processStream = function(data, stream){
    async.parallel({
        geo: function(cb){
            geoip(data.remoteAddress, function(err, geoData){
                if(!err){
                    data.geo = geoData;
                }
                cb();
            });
        },
        ua: function(cb){
            userAgent(data.userAgent, function(err, userAgentData){
                if(!err){
                    data.userAgentData = userAgentData;
                }
                cb();
            });
        },
        ref: function(cb){
            url(data.referer, function(err, urlData){
                if(!err){
                    data.url = urlData;
                }
                cb();
            });
        }
    }, function(){
        stream.queue(JSON.stringify(data));
    });
};

