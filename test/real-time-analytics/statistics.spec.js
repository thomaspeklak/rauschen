var Statistics = require("../../real-time-analytics/lib/statistics-stream");
var streamFactory = require("../factories/stream-factory");

describe('RT Statistics', function(){
    it('should write to a stream if data is piped into its input stream', function(end){
        var stats = new Statistics(20);
        var rs = streamFactory.readStream();
        var ws = streamFactory.writeStream();
        rs.pipe(stats).pipe(ws);
        rs.sendData('test');

        setTimeout(function(){
            ws.write.called.should.be.true;
            end();
        }, 25);
    });

    it("should write no more than once a second", function(end){
        var stats = new Statistics(20);
        var rs = streamFactory.readStream();
        var ws = streamFactory.writeStream();
        rs.pipe(stats).pipe(ws);
        rs.sendData('test');
        rs.sendData('test');
        rs.sendData('test');
        setTimeout(function(){
            rs.sendData('test');
            rs.sendData('test');
        }, 22);
        setTimeout(function(){
            ws.write.callCount.should.eql(2);
            end();
        }, 70);

    });
});
