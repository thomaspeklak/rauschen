var net         = require('net');
var fs          = require('fs');
var Scuttlebutt = require('scuttlebutt/model');
var timing      = new Scuttlebutt();
var socket      = '/tmp/rauschen.sock';

var timingStream = timing.createStream();

timingStream.pipe(net.connect(socket)).pipe(timingStream);

var counter = 0;

timing.on('update', function(key){
    console.log('UPDATE' + counter++);
});

