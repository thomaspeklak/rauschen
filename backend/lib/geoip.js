var geoip       = require('geoip');
var country     = new geoip.Country(process.env.GEOIP_COUNTRY_DAT);
var country_v6  = new geoip.Country6(process.env.GEOIP_COUNTRY_DAT_V6);
var city        = new geoip.City(process.env.GEOIP_CITY_DAT);
var city_v6     = new geoip.City6(process.env.GEOIP_CITY_DAT_V6);

module.exports = function(ip, cb){
    cb({});
};
