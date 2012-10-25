var normalize = require("../lib/timings_normalize.js");
var validate = require("../lib/timings_validate.js");

module.exports = function(app){
    app.post("/", function(req, res){
        var performance = req.body;

        if(validate(performance.timing)){
            app.emit('data', {
                performance: performance,
                userAgent: req.headers["user-agent"],
                referer: req.headers.referer,
                remoteAddress: req.connection.remoteAddress
            });

            res.send(204);
        } else {
            res.send(400);
        }
    });
};

