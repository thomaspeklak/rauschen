var normalize = require("../lib/timings_normalize.js");
var validate = require("../lib/timings_validate.js");

module.exports = function(app){
	app.post("/", function(req, res){
		var statistics = req.body;

		if(validate(statistics.timing)){
      statistics.timing = normalize(statistics.timing);
      app.queue().create();

			res.send(204);
		} else {
			res.send(400);
		}
	});
};

