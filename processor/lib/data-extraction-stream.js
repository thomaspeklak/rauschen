var through     = require("through");

module.exports = through(function write(data){
    if(typeof data !== 'string') return;
    try{
        var parsedData = JSON.parse(data);
        if(typeof parsedData === 'object'){
            this.queue(JSON.stringify(parsedData[1]));
        }
    } catch(e){ }
}, function end(){
    this.queue(null);
});

