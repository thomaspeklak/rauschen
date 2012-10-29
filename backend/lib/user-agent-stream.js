var through     = require("through");
var userAgent   = require("./user-agent-detector");

module.exports = through(function write(data){
    if(typeof data !== 'string') return;
    var parsedData = JSON.parse(data);
    var that = this;
    userAgent(parsedData.userAgent, function(err, userAgentData){
        if(!err){
            parsedData.userAgentData = userAgentData;
        }
        that.queue(JSON.stringify(parsedData));
    });
}, function end(){
    this.queue();
});

