normalize = require "../lib/timings_normalize"
validate = require "../lib/timings_validate"

module.exports = (app) ->
  app.post("/", (req, res) ->
    statistics = req.body
    statistics.timing = normalize(statistics.timing)

    if validate(statistics.timing)
      res.send 204
    else
      res.send 400
  )

