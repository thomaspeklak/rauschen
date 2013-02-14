normalize = require "../../receiver/lib/timings_normalize.js"
timing_factory = require "../factories/timing"

describe "Normalize", ->
  it "should normalize values to the navigationStart", ->
    timing = timing_factory.valid().timing
    normalize(timing).responseEnd.should.equal(timing.responseEnd - timing.navigationStart)
    normalize(timing).connectStart.should.equal(timing.connectStart - timing.navigationStart)
    normalize(timing).domInteractive.should.equal(timing.domInteractive - timing.navigationStart)
    normalize(timing).responseStart.should.equal(timing.responseStart - timing.navigationStart)
    normalize(timing).fetchStart.should.equal(timing.fetchStart - timing.navigationStart)
    normalize(timing).domComplete.should.equal(timing.domComplete - timing.navigationStart)

