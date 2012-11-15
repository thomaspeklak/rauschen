var fs        = require('fs');
var normalize = require("../lib/timings_normalize.js");
var validate  = require("../lib/timings_validate.js");

module.exports = function(app) {
    app.post("/", function(req, res) {
        // @TODO check why these header are not set in middleware
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, origin, Content-Type");
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
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, origin, Content-Type");
        res.send();
    });

    app.get("/client.js", function(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Content-Type", "application/javascript");
        fs.createReadStream(__dirname + "/../public/client.js").pipe(res);
    });
};
