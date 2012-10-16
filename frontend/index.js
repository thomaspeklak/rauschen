var server  = require("./server");
var path = require('path');


//@TODO IMPLEMENT AS MIDDLEWARE
var DomainValidator = require(path.join(__dirname, "lib", "domain-validator"));
var domains = require("../config/domains");

server.domainValidator = new DomainValidator(domains);

server.listen(3000);
