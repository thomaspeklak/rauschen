var DomainValidator = function(domains){
	this.domains = domains;
};

DomainValidator.prototype.validate =function(domain){
	return this.domains.some(function(valid_domain){
		return domain == valid_domain;
	});
};

module.exports = DomainValidator;
