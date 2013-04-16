var h2c = require('../../lib/hostname-to-collection');

describe('HostnameToCollection', function(){
    it('should replace all dots with underscores', function(){
        h2c('www.test.com').should.eql('www_test_com');
    });
    it('should replace dashes with underscores', function(){
        h2c('test-1.com').should.eql('test_1_com');
    });
    it('should replace uppercase with lowercase', function(){
        h2c('TesT.com').should.eql('test_com');
    });
    it('should replace non alphanumerical values with nothing', function(){
        h2c('test1Äöö!"§$%&/)(/&$%§&,:;öü.com').should.eql('test1_com');
    });
});
