var format = require("util").format;
var defaults = require('./defaults');

var env = process.env.NODE_ENV || 'development';
var overrides = require('./' + env);

env.environment = env;

for (var key in overrides) {
    if (overrides.hasOwnProperty(key)) {
        defaults[key] = overrides[key];
    }
}

var db = defaults.db;

var dbAuth = db.user ?  format("%s:%s@", db.user, db.password) : "";

db.url = format("mongodb://%s%s:%s/%s", dbAuth, db.host, db.port, db.database);

module.exports = defaults;
