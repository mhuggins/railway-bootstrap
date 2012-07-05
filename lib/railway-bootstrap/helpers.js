var util = require('util');

/**
 * Twitter Bootstrap form tag helper.
 * 
 *   bootstrapFieldsFor(user, function (form) { ... });
 */
exports.bootstrapFormFor = exports.bootstrap_form_for = function (resource, params, block) {
	var self = this;
	var buf = arguments.callee.buf = arguments.callee.caller.buf;
	
	if (typeof(params) == 'function') {
		block = params;
		params = {};
	}
	params = params || {};
	
	var format = params.format || 'vertical';
	delete params.format;
	
	if (resource && resource.modelName) {
		params.method = params.method || 'PUT';
		params.action = params.action || railway.routeMapper.pathTo[railway.utils.underscore(resource.modelName)](resource);
	}
	
	var Form = require('./forms/' + format);
	var form = new Form(this, resource, params);
	form.fieldsFor(block);
};

/**
 * Twitter Bootstrap form tag helpers for specific form types.
 */
['basic', 'horizontal'].forEach(function (format) {
	exports[format + 'FormFor'] = exports[format + '_form_for'] = function (resource, params, block) {
		params = railway.utils.safe_merge({ format: format }, params);
		exports.bootstrapFormFor(resource, params, block);
	};
});
