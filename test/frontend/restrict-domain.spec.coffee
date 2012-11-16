DomainValidator = require "../../frontend/lib/domain-restrictor"
sinon = require("sinon")

describe "Validate domain", ->
  it "should return true on a registered domain", ->
    callback = sinon.spy()
    res = { send: sinon.spy() }
    domain_validator = DomainValidator ["test.com", "127.0.0.1"]

    domain_validator({headers: {referer: "127.0.0.1"}}, res, callback)
    callback.called.should.be.true
    res.send.called.should.be.false

  it "should return false on a unregistered domain", ->
    callback = sinon.spy()
    res = { send: sinon.spy() }
    domain_validator = DomainValidator ["test.com", "127.0.0.1"]

    domain_validator({headers: {referer: "unregistered.domain.com"}}, res, callback)
    callback.called.should.be.false
    res.send.called.should.be.true
    res.send.calledWith(403).should.be.true


