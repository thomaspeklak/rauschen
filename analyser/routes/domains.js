"use strict";

module.exports = function (app) {
    app.get("/domains", function (req, res) {
        res.send(200);
    });
};
