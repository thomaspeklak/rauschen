"use strict";

var express = require("express");
var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
               "X-Requested-With, origin, Content-Type");
    next();
});
app.use(express.bodyParser());

require("./routes")(app);

module.exports = app;

