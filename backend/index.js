var net               = require("net");
var async             = require("async");
var Scuttlebutt       = require("scuttlebutt/model");
var timing            = new Scuttlebutt();
var socket            = "/tmp/rauschen.sock";
var processGeoData   = require("./lib/geoip.js");
var processUserAgent= require("./lib/user-agent-detector.js");

var timingStream = timing.createStream();

timingStream.pipe(net.connect(socket)).pipe(timingStream);

timing.on("update", function(key){
    var timingData = timing.get(key);
    process(timingData);
});

var process = function(data){
    async.parallel({
        geo: function(cb){
            processGeoData(data.remoteAddress, function(err, geoData){
                data.geo = geoData;
                cb();
            });
        },
        ua: function(cb){
            processUserAgent(data.userAgent, function(err, userAgentData){
                data.userAgentData = userAgentData;
                cb();
            });
        }
    }, function(err, result){
        console.dir(data);
    });
};



