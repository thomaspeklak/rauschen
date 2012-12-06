var Queue = require("../../real-time-analytics/lib/stats-queue");
var timing_factory = require("../factories/timing");

describe('Stats Queue', function(){
    it('should collect data and return the aggregated result', function(){
        var q = new Queue();
        var timing =timing_factory.valid_normalized().timing;
        q.push(timing);
        var stats = q.join();
        stats.average.should.eql(timing);
        stats.max.should.eql(timing);
        stats.min.should.eql(timing);
        q.length.should.eql(0);
    });
    it('should collect data and return the aggregated result', function(){
        var q = new Queue();
        var timing =timing_factory.valid_normalized().timing;
        var keys = Object.keys(timing);
        var timing2 = {};
        var average = {};
        var max = {};
        var min = {};
        keys.forEach(function(key){ timing2[key] = timing[key] * 2; });
        keys.forEach(function(key){
            average[key] = (timing[key] + timing2[key]) / 2;
            max[key] = Math.max(timing[key], timing2[key]);
            min[key] = Math.min(timing[key], timing2[key]);
        });
        q.push(timing);
        q.push(timing2);
        var stats = q.join();
        stats.max.should.eql(max);
        stats.min.should.eql(min);
        //stats.average.should.eql(average);
        q.length.should.eql(0);
    });

});

