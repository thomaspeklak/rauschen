"use strict";

var config  = require(__dirname + "/../../config");
var geoip   = require("geoip");
var cityV4 = new geoip.City(config.geoip.cityDat);
var cityV6 = new geoip.City6(config.geoip.cityDatV6);

module.exports = function (ip, cb) {
    var city = (ip.indexOf(":") >= 0) ? cityV6 : cityV4;

    city.lookup(ip, cb);
};
