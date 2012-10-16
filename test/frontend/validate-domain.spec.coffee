DomainValidator = require "../../frontend/lib/domain-validator"

describe "Validate domain", ->
  it "should return true on a registered domain", ->
    domain_validator = new DomainValidator ["test.com", "127.0.0.1"]
    domain_validator.validate("127.0.0.1").should.be.ok

  it "should return false on a unregistered domain", ->
    domain_validator = new DomainValidator ["test.com", "127.0.0.1"]
    domain_validator.validate("unregistered_comain.com").should.not.be.ok


