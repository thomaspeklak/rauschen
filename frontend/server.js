var express = require("express");
app = express.createServer();

app.use(express.static(__dirname + "/public"));
app.use(express.bodyParser());

require("./routes")(app);

module.exports = app;
