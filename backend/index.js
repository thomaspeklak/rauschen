var net               = require("net");
var Scuttlebutt       = require("scuttlebutt/model");
var timing            = new Scuttlebutt();
var socket            = "/tmp/rauschen.sock";
var geoDataProvider   = require("./lib/geoip.js");
var userAgentDetector = require("./lib/user-agent-detector.js");

var timingStream = timing.createStream();

timingStream.pipe(net.connect(socket)).pipe(timingStream);

timing.on("update", function(key){
    var data = timing.data;
    geoDataProvider(data.remoteAddress, function(geoData){
        data.geo = geoData;
    });

    userAgentDetector(data.userAgent, function(userAgentData){
        data.browser = userAgentData;
    });
});



