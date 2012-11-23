var geoip   = require("geoip");
var city_v4 = new geoip.City(process.env.GEOIP_CITY_DAT);
var city_v6 = new geoip.City6(process.env.GEOIP_CITY_DAT_V6);

module.exports = function(ip, cb){
    var city = (ip.indexOf(":") >= 0) ? city_v6 : city_v4;

    city.lookup(ip, cb);
};
