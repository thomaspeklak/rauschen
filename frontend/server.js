var express = require("express");
var queue = { create: function(){}};

app = express.createServer();

app.use(express.static(__dirname + "/public"));
app.use(express.bodyParser());

app.queue = function(newQueue){
  if(newQueue){
    queue = newQueue; return this;
  } else {
    return queue;
  }
};

require("./routes")(app);

module.exports = app;
