var net         = require('net');
var fs          = require('fs');
var Scuttlebutt = require('scuttlebutt/model');
var timing      = new Scuttlebutt();
var socket      = '/tmp/rauschen.sock';

var distributor = function(server, remote){
    server.on('data', function(data){
        timing.set('data', data);
    });
};

var server = net.createServer(function(stream){
    stream.pipe(timing.createStream()).pipe(stream);
});

server.listen(socket, function(){ });

var cleanup = function(err){
    if(err) { console.error(err); }
    fs.unlinkSync(socket);
    process.exit();
};
process.on('SIGINT', cleanup);
process.on('uncaughtException', cleanup);

module.exports = distributor;
