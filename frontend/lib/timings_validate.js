module.exports = function(timings){
	for(var key in timings) {
		if(timings[key] < 0) return false;
	}

	return true;
}
