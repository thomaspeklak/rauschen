"use strict";

var path = require("path");
var express = require("express");
var http = require("http");
var config = require("../config");
var mongoskin = require("mongoskin");
var MongoStore = require('connect-mongo')(express);

var app = express();

app.db = mongoskin.db(config.db.url + "?auto_reconnect=true", {safe: false});

// Express settings
app.disable("x-powered-by");

// Configuration
app.configure("development", function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure("production", function(){
    app.use(express.errorHandler());
});

app.configure(function(){
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");
    app.set("view options", { layout: false });

    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(express.cookieParser(config.secret));

    app.use(express.session({
        secret: config.sessionSecret,
        store: new MongoStore({
            collection: "sessions",
            url: config.db.url
        }),
        cookie: {
            path: "/",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30
        }
    }));

    app.use(app.router);
    app.use(express.static(path.join(__dirname, "public")));
});

require("./helpers")(app);
require("./routes")(app);

var invokedAsMain = require.main === module;

// Start server if not invoked by require("./app")
if (invokedAsMain) {
    http.createServer(app).listen(config.port, config.address, function() {
        console.log("Express server listening on %s:%d in %s mode", config.address, config.port, app.settings.env);
    });
} else {
    // Export app if invoked by require("./app")
    module.exports = app;
}
