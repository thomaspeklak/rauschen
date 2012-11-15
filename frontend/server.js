var express = require("express");
app = express();

app.use(function(err, req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, origin, Content-Type");
    console.log('#######################################');
    console.dir(res);
    console.log('#######################################');
    next();
});
app.use(express.bodyParser());

require("./routes")(app);

module.exports = app;
