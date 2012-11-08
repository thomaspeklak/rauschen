var timing = require(__dirname + "/../../models/timing");
var Stream = require("stream");


var ps = new Stream();
ps.writable = true;

ps.write = function (buf) {
    var data = JSON.parse(buf);
};

ps.end = function (buf) {
        if (arguments.length) this.write(buf);
        this.destroy();
};

ps.destroy = function(){
    this.writeable = false;
};

module.exports = ps;

