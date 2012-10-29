var userAgentDetector = require(__dirname + "/../../backend/lib/user-agent-detector.js");

describe("User agent detector", function(){
    it("should provide information based an a user agent string", function(done){
        var UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/22.0.1215.0 Safari/537.2";
        var data = userAgentDetector(UA, function(err, data){
            data.should.have.property("family", "Chrome");
            data.should.have.property("major", "22");
            data.should.have.property("minor", "0");
            data.should.have.property("patch", "1215");
            data.should.have.property("os", "Mac OS X");
            done();
        });
    });
});
