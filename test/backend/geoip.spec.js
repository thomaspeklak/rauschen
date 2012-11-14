var geoipData = require(__dirname + "/../../backend/lib/geoip");

describe("GeoipData", function(){
    it("should provide country for an IPv4", function(done){
        geoipData("8.8.8.8", function(err, data){
            data.should.have.property("country_code", "US");
            data.should.have.property("country_code3", "USA");
            data.should.have.property("country_name", "United States");
            data.should.have.property("continent_code", "NA");
            done();
        });
    });
    it("should provide city for an IPv4", function(done){
        geoipData("8.8.8.8", function(err, data){
            data.should.have.property("country_code3", "USA");
            data.should.have.property("country_name", "United States");
            data.should.have.property("continent_code", "NA");
            data.should.have.property("region", "CA");
            data.should.have.property("city", "Mountain View");
            data.should.have.property("postal_code", "94043");
            data.should.have.property("latitude", 37.4192008972168);
            data.should.have.property("longitude", -122.05740356445312);
            done();
        });
    });
    it("should provide country for an IPv6", function(done){
        geoipData("2002:7679:b9af:db9b:ab51:501a:db4e:2d", function(err, data){
            data.should.have.property("country_code", "CN");
            data.should.have.property("country_code3", "CHN");
            data.should.have.property("country_name", "China");
            data.should.have.property("continent_code", "AS");
            done();
        });
    });
    it("should provide city for an IPv6", function(done){
        geoipData("2002:7679:b9af:db9b:ab51:501a:db4e:2d", function(err, data){
            data.should.have.property("country_code3", "CHN");
            data.should.have.property("country_name", "China");
            data.should.have.property("continent_code", "AS");
            data.should.have.property("region", "32");
            data.should.have.property("city", "Chengdu");
            data.should.have.property("latitude", 30.66670036315918);
            data.should.have.property("longitude", 104.06670379638672);
            done();
        });
    });
    it("should return nothibg on local ip", function(done){
        geoipData("127.0.0.1", function(err, data){
            (data === null).should.be.ok;
            done();
        });
    });
    it("should return nothibg on local ip", function(done){
        geoipData("10.0.0.1", function(err, data){
            (data === null).should.be.ok;
            done();
        });
    });
});
