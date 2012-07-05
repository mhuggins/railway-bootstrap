exports.init = function () {
	var HelperSet = railway.helpers.HelperSet;
	var helpers = require('./helpers');
	
	for (var name in helpers) {
		HelperSet.prototype[name] = helpers[name];
	}
};

exports.bootstrapFormFor = function (resource, params, block) {
	var self = this;
	var buf = arguments.callee.buf = arguments.callee.caller.buf;
	
	params = params || {};
	params.format = params.format || 'horizontal';
	
	if (resource && resource.modelName) {
		params.method = params.method || 'PUT';
		params.action = params.action || railway.routeMapper.pathTo[railway.utils.underscore(resource.modelName)](resource);
	}
	
	var Form = require('./forms/' + params.format);
	new Form(this, resource, params, block);
};

exports.bootstrap_form_for = exports.bootstrapFormFor;
