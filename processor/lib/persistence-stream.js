var hostnameToCollection = require('./hostname-to-collection');
var requestCounter =  require("../../lib/request-counter");

//MongoDB
var Db         = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server     = require('mongodb').Server;

//use a pause stream to allow the mongo adapter to connect before first write
var pauseStream = require('pause-stream')();
pauseStream.pause();

var Stream  = require("stream");
var ps      = new Stream();
ps.writable = true;

ps.write = function (buf) {
    var data = JSON.parse(buf);
    if(!data.referrer.hostname){ return console.log('no hostname'); }
    var collectionName = hostnameToCollection(data.referrer.hostname);
    timingsCollection = db.collection(collectionName);
    timingsCollection.insert(data);
    this.emit('new-data');
};

ps.end = function (buf) {
    if (arguments.length) this.write(buf);
    this.destroy();
};

ps.destroy = function(){
    this.writeable = false;
};

pauseStream.pipe(ps);
new requestCounter(ps, 'new-data');

var server = new Server("127.0.0.1" , 27017 , {auto_reconnect: true, poolSize: 40});
var db     = new Db('rauschen', server, {safe:false, native_parser: true});

db.open(function(err, db){
    if(err){
        console.log(err);
        process.exit();
    }
    console.log('starting persistence stream');
    pauseStream.resume();
});

module.exports = pauseStream;
