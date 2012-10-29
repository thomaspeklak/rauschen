var net               = require("net");
var Scuttlebutt       = require("scuttlebutt/model");
var timing            = new Scuttlebutt();
var socket            = "/tmp/rauschen.sock";
var processGeoData   = require("./lib/geoip.js");
var processUserAgent= require("./lib/user-agent-detector.js");

var timingStream = timing.createStream();

timingStream.pipe(net.connect(socket)).pipe(timingStream);

timing.on("update", function(key){
    var data = timing.data;
    async.parallel({
        geo: function(){
            geoDataProvider(data.remoteAddress, function(geoData){
                data.geo = geoData;
            });
        },
        userAgent: function(){
            userAgentDetector(data.userAgent, function(userAgentData){
                data.userAgentData = userAgentData;
            });
        }
    },
    function(){
        console.log('done');
    });
});



