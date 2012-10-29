var through     = require("through");
var geoip       = require("./geoip");

module.exports = through(function write(data){
    if(typeof data !== 'string') return;
    var parsedData = JSON.parse(data);
    var that = this;
    geoip(parsedData.remoteAddress, function(err, geoData){
        if(!err){
            parsedData.geo = geoData;
        }
        that.queue(JSON.stringify(parsedData));
    });
}, function end(){
    this.queue();
});

