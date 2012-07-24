module.exports = (timings) ->
  base = timings.navigationStart

  normalized_timings = {}
  for key, value of timings
    normalized_timings[key] =  value - base unless timings[key] is 0

  normalized_timings
