var geoipData = require(__dirname + '/../../backend/lib/geoip');

describe('GeoipData', function(){
    it('should provide country for an IPv4', function(done){
        geoipData('8.8.8.8', function(data){
            data.countryCode.should.be('US');
            data.countryCode3.should.be('USA');
            data.countryName.should.be('United States');
            data.continent.should.be('NA');
            done();
        });
    });
});
