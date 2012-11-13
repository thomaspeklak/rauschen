request = require "supertest"
app = require "../../frontend/server.js"
DomainValidator = require('../factories/domain-validator.js')
app.domainValidator = new DomainValidator(true)
sinon = require "sinon"

timing_factory = require "../factories/timing"

describe "Frontend", ->
  it "should respond with 204 when valid statistics are posted", (done) ->
    request(app)
      .post("/")
      .send(
        timing_factory.valid()
      )
      .expect(204, done)

  it "should respons with 200 when statistics with invalid timestamps are posted", (done) ->
    request(app)
      .post("/")
      .send(
        timing_factory.invalid()
      )
      .expect(400, done)

  it "should send valid timing data along with request data to the event system", (done) ->
    userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/22.0.1215.0 Safari/537.2"
    referer = "http://rauschen.info"
    remoteAddress = "127.0.0.1"

    app.on('data', (data) ->
      data.should.eql(
        performance: timing_factory.valid_normalized()
        userAgent: userAgent
        referer: referer
        remoteAddress: remoteAddress
      )
      done()
    )
    request(app)
      .post("/")
      .set("User-Agent", userAgent)
      .set("Referer", referer)
      .send(timing_factory.valid())
      .end( (err, res) ->)
