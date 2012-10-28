var geoip       = require('geoip');
var country     = new geoip.Country(process.env.GEOIP_COUNTRY_DAT);
var city        = new geoip.City(process.env.GEOIP_CITY_DAT);
var country_v6  = new geoip.Country(process.env.GEOIP_COUNTRY_DAT_V6);
var city_v6     = new geoip.City(process.env.GEOIP_CITY_DAT_V6);

module.exports = function(ip, cb){
    cb({});
};
