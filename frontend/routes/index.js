var fs        = require('fs');
var normalize = require("../lib/timings_normalize.js");
var validate  = require("../lib/timings_validate.js");

module.exports = function(app) {
    app.post("/", function(req, res) {
        var performance = req.body;

        if (validate(performance.timing)) {
            performance.timing = normalize(performance.timing);
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
    app.options("/", function(req, res) {
        res.send();
    });

    app.get("/client.js", function(req, res) {
        res.header("Content-Type", "application/javascript");
        fs.createReadStream(__dirname + "/../public/client.js").pipe(res);
    });
};
