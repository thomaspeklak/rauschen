var through     = require("through");
var async       = require("async");
var geoip       = require("./geoip");
var userAgent   = require("./user-agent-detector");
var url         = require("./url-disector");

var processStream = function(data, stream){
    async.parallel({
        geo: function geoEnricher(cb){
            geoip(data.remoteAddress, cb);
        },
        userAgentData: function(cb){
            userAgent(data.userAgent, cb);
        },
        url: function(cb){
            url(data.referer, cb);
        }

    }, function(err, results){
        Object.keys(results).forEach(function(key){
            if(results[key]){
                data[key] = results[key];
            }
        });

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

