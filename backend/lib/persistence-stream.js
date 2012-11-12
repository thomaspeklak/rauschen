//MongoDB
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

var pauseStream = require('pause-stream')();
pauseStream.pause();

var Stream = require("stream");
var ps = new Stream();
ps.writable = true;

pauseStream.pipe(ps);

ps.write = function (buf) {
    var data = JSON.parse(buf);
    //timings.insert(data);
};

ps.end = function (buf) {
    if (arguments.length) this.write(buf);
    this.destroy();
};

ps.destroy = function(){
    this.writeable = false;
};


var db = new Db('rauschen', new Server("127.0.0.1", 27017, {auto_reconnect: true, poolSize: 40}), {safe:false, native_parser: true});
var timings ;

db.open(function(err, db){
    if(err){
        console.log(err);
        process.exit();
    }
    timings = db.collection('timings');
    pauseStream.resume();
});

module.exports = pauseStream;

