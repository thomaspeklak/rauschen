var net         = require("net");
var Scuttlebutt = require("scuttlebutt/model");
var timing      = new Scuttlebutt();
var socket      = "/tmp/rauschen.sock";
var geoData     = require("./lib/geoip.js");
var browserData = require("./lib/browser.js");

var timingStream = timing.createStream();

timingStream.pipe(net.connect(socket)).pipe(timingStream);

timing.on("update", function(key){
    var data = timing.data;
    geoData(data.remoteAddress, function(data){
        data.geo = data;
    });

    browserData(data.userAgent, function(data){
        data.browser = data;
    });
});



