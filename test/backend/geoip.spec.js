var geoipData = require(__dirname + "/../../backend/lib/geoip");

describe("GeoipData", function(){
    it("should provide country for an IPv4", function(done){
        geoipData("8.8.8.8", function(err, data){
            data.should.have.property('country');
            var country = data.country;
            country.should.have.property("country_code", "US");
            country.should.have.property("country_code3", "USA");
            country.should.have.property("country_name", "United States");
            country.should.have.property("continent_code", "NA");
            done();
        });
    });
    it("should provide city for an IPv4", function(done){
        geoipData("8.8.8.8", function(err, data){
            data.should.have.property('city');
            var city = data.city;
            city.should.have.property("country_code3", "USA");
            city.should.have.property("country_name", "United States");
            city.should.have.property("continent_code", "NA");
            city.should.have.property("region", "CA");
            city.should.have.property("city", "Mountain View");
            city.should.have.property("postal_code", "94043");
            city.should.have.property("latitude", 37.4192008972168);
            city.should.have.property("longitude", -122.05740356445312);
            done();
        });
    });
});
