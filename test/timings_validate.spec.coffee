normalize = require "../frontend/lib/timings_normalize.js"
validate = require "../frontend/lib/timings_validate.js"
timing_factory = require "./factories/timing"

describe 'Validate', ->
  it "should return true on valid timings", ->
    validate(normalize(timing_factory.valid().timing)).should.be.true

  it "should return false on invalid timings", ->
    validate(normalize(timing_factory.invalid().timing)).should.be.false

