var express = require("express");
app = express.createServer();

app.use(function(err, req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(express.bodyParser());


require("./routes")(app);

module.exports = app;
