var geoip       = require("geoip");
var country_v4  = new geoip.Country(process.env.GEOIP_COUNTRY_DAT);
var country_v6  = new geoip.Country6(process.env.GEOIP_COUNTRY_DAT_V6);
var city_v4     = new geoip.City(process.env.GEOIP_CITY_DAT);
var city_v6     = new geoip.City6(process.env.GEOIP_CITY_DAT_V6);
var async       = require("async");

module.exports = function(ip, cb){
    var city_lookup, country_lookup;

    if(ip.indexOf(":") >= 0){
        city = city_v6;
        country = country_v6;
    } else {
        city = city_v4;
        country = country_v4;
    }

    async.parallel({
        country : function(cb){ country.lookup(ip, cb); },
        city    : function(cb){ city.lookup(ip, cb); }
    }, cb);
};
