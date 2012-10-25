var is_valid_domain = function(domains, domain){
	return domains.some(function(valid_domain){
		return domain == valid_domain;
	});
};

module.exports = function(domains){
	return function(err, req, res, next){
		var domain = req.headers.referer.replace(/.*?\/\//,'').replace(/\/.*/,'');
		if(is_valid_domain(domains, domain)){
			next();
		} else {
			res.send(403);
		}
	};
};
