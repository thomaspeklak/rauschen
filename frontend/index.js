var server  = require("./server");
var path = require('path');


var domains = require("../config/domains");
var domain_validator = require(path.join(__dirname, "lib", "domain-restrictor"))(domains);


server.use(domain_validator);
server.listen(3000);
