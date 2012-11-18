var server = require("./server");
var path   = require('path');
new require("../lib/request-counter")(server, 'new-request');

var domains           = require("../config/domains");
var domain_restrictor = require(path.join(__dirname, "lib", "domain-restrictor"))(domains);

server.use(domain_restrictor);

require('./lib/distributor')(server);

server.listen(Number(process.argv[2]) || 3000);
