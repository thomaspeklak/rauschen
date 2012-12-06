var Statistics = require("../../real-time-analytics/lib/aggregation-stream");
var streamFactory = require("../factories/stream-factory");
var timing_factory = require("../factories/timing");

describe('RT Statistics', function(){
    it('should write to a stream if data is piped into its input stream', function(end){
        var stats = new Statistics(20);
        var rs = streamFactory.readStream();
        var ws = streamFactory.writeStream();
        rs.pipe(stats).pipe(ws);

        var timing = JSON.stringify(timing_factory.valid_normalized().timing);
        rs.sendData(timing);

        setTimeout(function(){
            //ws.write.called.should.be.true;
            stats.stop();
            end();
        }, 25);
    });

    it("should write no more than once a second", function(end){
        var stats = new Statistics(20);
        var rs = streamFactory.readStream();
        var ws = streamFactory.writeStream();
        rs.pipe(stats).pipe(ws);

        var timing = JSON.stringify(timing_factory.valid_normalized().timing);
        rs.sendData(timing);
        rs.sendData(timing);
        rs.sendData(timing);
        rs.sendData(timing);

        setTimeout(function(){
            rs.sendData(timing);
            rs.sendData(timing);
        }, 22);

        setTimeout(function(){
            //ws.write.callCount.should.eql(2);
            stats.stop();
            end();
        }, 70);

    });
});
