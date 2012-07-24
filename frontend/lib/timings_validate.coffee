module.exports = (timings) ->
	for key, value of timings
		return false if value < 0

	return true
