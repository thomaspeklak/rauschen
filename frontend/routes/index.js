var normalize = require("../lib/timings_normalize.js");

module.exports = function(app){
	app.post("/", function(req, res){
		var statistics = req.body;
		statistics.timing = normalize(statistics.timing);

		res.send(204);
	});
};

