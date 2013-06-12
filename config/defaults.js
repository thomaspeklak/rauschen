"use strict";

var path = require("path");

module.exports =  {
    receiver: {
        port : process.env.RECEIVER_PORT || 3300,
    },
    analyser: {
        port: process.env.ANALYSER_PORT || 3301
    },
    secret : "this is a secret",
    sockets : {
        receiver: path.join(__dirname, "..", "tmp", "rauschen.sock"),
        processor: path.join(__dirname, "..", "tmp", "processor.sock"),
    },
    db : {
        host: "localhost",
        port: 27017,
        database: "rauschen"
    },
    geoip: {
        countryDat : "/usr/local/lib/geoip/GeoIP.dat",
        countryDatV6 : "/usr/local/lib/geoip/GeoIPv6.dat",
        cityDat : "/usr/local/lib/geoip/GeoLiteCity.dat",
        cityDatV6 : "/usr/local/lib/geoip/GeoLiteCityv6.dat"
    },
    domains: [
        "127.0.0.1",
        "localhost:8000",
        "nur-ein.test.com"
    ]
};
