request = require "supertest"
app = require "../frontend/server.js"

timing_factory = require "./factories/timing"

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
