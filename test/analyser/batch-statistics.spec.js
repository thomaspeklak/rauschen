"use strict";

var BatchStatistics = require("../../analyser/lib/batch-statistics");
var timingFactory = require("../factories/timing");

describe("BatchStatistics", function () {
    it("should gather entries", function () {
        var b = new BatchStatistics();
        var t1 = timingFactory.valid_normalized();
        var t2 = timingFactory.valid_normalized();

        b.add(t1.timing);
        b.add(t2.timing);

        b.statistics().should.not.
        throw;
    });

    it("should provide statistics", function () {
        var b = new BatchStatistics();
        var t1 = timingFactory.valid_normalized().timing;
        var t2 = timingFactory.valid_normalized().timing;
        t2.loadEventEnd += 20;

        b.add(t1);
        b.add(t2);

        var stats = b.statistics();

        stats.min.loadEventEnd.should.eql(t1.loadEventEnd);
        stats.max.loadEventEnd.should.eql(t2.loadEventEnd);
        stats.mean.loadEventEnd.should.eql(
            (t1.loadEventEnd + t2.loadEventEnd) / 2
        );
        stats.count.should.eql(2);
    });

    it("should reset statistics", function () {
        var b = new BatchStatistics();
        var t1 = timingFactory.valid_normalized().timing;
        var t2 = timingFactory.valid_normalized().timing;
        t2.loadEventEnd += 20;

        b.reset();

        b.statistics().should.eql({
            min: {},
            max: {},
            mean: {},
            count: 0
        });
    });

});
