"use strict";

var Domains = require("../models/domains");
var db = require("../lib/database");
var timings = require("../models/timing");

module.exports = function (app) {
    app.get("/domains", function (req, res) {
        Domains.find(function (err, domains) {
            if (err) {
                console.error(err);
                res.send(500);
            }

            res.json({
                domains: domains
            });
        });
    });

    app.get("/domains/:slug", function (req, res) {
        db.collection(req.params.slug)
            .statistics(60e3, {
            createdAt: {
                $lt: new Date
            }
        }, 2)
            .pipe(res);
    });
};
