var  express = require("express");

app = express.createServer();

console.log(__dirname + '/public');
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

module.exports = app;
