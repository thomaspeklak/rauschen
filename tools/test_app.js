var http = require('http');
var ecstatic = require('ecstatic')(__dirname + '/page');
http.createServer(function(req, res){
    ecstatic(req, res);
}).listen(8000);

