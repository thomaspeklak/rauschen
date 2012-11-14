var through     = require("through");
var q           = require('q');
var geoip       = require("./geoip");
var userAgent   = require("./user-agent-detector");
var url         = require("./url-disector");

var defer = function(fn){
    var deferred = q.defer();
    fn(deferred);
    return deferred;
};

var processStream = function(data, stream){
    var dGeo = defer(function(deferred){
        geoip(data.remoteAddress, function(err, result){
            if(result){ data.geo = result;}
            deferred.resolve();
        });
    });
    var dUserAgent = defer(function(deferred){
        userAgent(data.userAgent, function(err, result){
            if(result){ data.userAgent = result ;}
            deferred.resolve();
        });
    });
    var dReferer = defer(function(deferred){
        url(data.referer, function(err, result){
            if(result){ data.referer = result;}
            deferred.resolve();
        });
    });

    q.all([dGeo, dUserAgent, dReferer])
        .then(function(){
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

