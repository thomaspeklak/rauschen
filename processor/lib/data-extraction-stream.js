var through     = require("through");

module.exports = through(function write(data){
    if(typeof data !== 'string') return;
    try{
        var parsedData = JSON.parse(data);
        if(typeof parsedData === 'object'){
            this.queue(parsedData[0][1]);
        }
    } catch(e){ }
}, function end(){
    this.queue(null);
});

