"use strict";

var Domains = require("../models/domains");

module.exports = function (app) {
    app.get("/domains", function (req, res) {
        Domains.find(function (err, domains) {
            if (err) {
                console.error(err);
                res.send(500);
            }

            res.render("domains/index", {
                domains: domains
            });
        });
    });
};
