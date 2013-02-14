validate = require "../../receiver/lib/timings_validate.js"
timing_factory = require "../factories/timing"

describe 'Validate', ->
  it "should return true on valid timings", ->
    validate(timing_factory.valid().timing).should.be.true

  it "should return false on invalid timings", ->
    validate(timing_factory.invalid().timing).should.be.false

