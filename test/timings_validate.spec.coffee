normalize = require "../frontend/lib/timings_normalize"
validate = require "../frontend/lib/timings_validate"
timing_factory = require "./factories/timing"

describe 'Validate', ->
  it "should return true on valid timings", ->
    validate(normalize(timing_factory.valid().timing)).should.be.true

  it "should return false on invalid timings", ->
    validate(normalize(timing_factory.invalid().timing)).should.be.false

