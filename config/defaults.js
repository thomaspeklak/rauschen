module.exports =  {
    port : process.env.PORT || 3000,
    secret : "this is a secret",
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
        "localhost:8000"
    ]
};
