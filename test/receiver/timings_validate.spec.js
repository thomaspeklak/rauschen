"use strict";

var validate = require("../../receiver/lib/timings_validate.js");
var timingFactory = require("../factories/timing");

describe("Validate", function () {
    it("should return true on valid timings", function () {
        validate(timingFactory.valid().timing).should.be.true;
    });

    it("should return false on invalid timings", function () {
        validate(timingFactory.invalid().timing).should.be.false;
    });


    it("should not retrun false on no or invalid timings", function () {
        validate(null).should.be.false;
        validate({}).should.be.false;
    });

    it("should retrun false if the difference of a measure and the base exceeds 60s", function () {
        var timing = timingFactory.valid().timing;
        timing.loadEventEnd = timing.loadEventEnd + 60 * 1000;
        validate(timing).should.be.false;
    });
});
