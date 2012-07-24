normalize = require "../frontend/lib/timings_normalize.js"
timing_factory = require "./factories/timing"

describe "Normalize", ->
  it "should normalize values to the navigationStart", ->
    timing = timing_factory.valid().timing
    normalize(timing).responseEnd.should.equal(timing.responseEnd - timing.navigationStart)

