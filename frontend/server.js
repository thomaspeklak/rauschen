var express = require("express");
var job = { create: function(){}};

app = express.createServer();

app.use(express.static(__dirname + "/public"));
app.use(express.bodyParser());

app.job = function(newQueue){ if(newQueue){
    job = newQueue; return this;
  } else {
    return job;
  }
};

require("./routes")(app);

module.exports = app;
