request = require "supertest"
app = require "../../frontend/server.js"
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
    queue =
      create: sinon.spy()
    app.queue(queue)

    request(app)
      .post("/")
      .send(timing_factory.valid())
      .end( (err, res) ->
        queue.create.called.should.be.true
        done()
      )
