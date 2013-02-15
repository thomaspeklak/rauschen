"use strict";

var isValidDomain = function (domains, domain) {
	return domains.some(function (validDomain) {
		return domain == validDomain;
	});
};

module.exports = function (domains) {
	return function (req, res, next) {
		var domain = req.headers.referer
            .replace(/.*?\/\//, "")
            .replace(/\/.*/, "");
		if (isValidDomain(domains, domain)) {
			next();
		} else {
			res.send(403);
		}
	};
};
