/**
 * Form tag helper.
 * 
 *   bootstrapFieldsFor(user, function (form) { ... });
 */
module.exports.bootstrapFormFor = function (resource, params, block) {
	var self = this;
	var buf = arguments.callee.buf = arguments.callee.caller.buf;
	
	if (resource && resource.modelName) {
		if (typeof params !== 'object') {
			params = {};
		}
		if (!params.method) {
			params.method = 'PUT';
		}
		if (!params.action) {
			params.action = railway.routeMapper.pathTo[railway.utils.underscore(resource.modelName)](resource);
		}
	}
	
	params = railway.utils.safe_merge({ class: 'form-horizontal' }, params);
	
	this.formTag(params, function () {
		if (block) {
			module.exports.bootstrapFieldsFor.call(self, resource, block);
		}
	});
};
module.exports.bootstrap_form_for = module.exports.bootstrapFormFor;

/**
 * Form fields for resource helper.
 * 
 *   bootstrapFieldsFor(user, function (form) {
 *     form.input('email', { label: 'E-mail Address' });
 *     form.input('password', { type: 'password' });
 *     form.submit('Login');
 *   });
 */
module.exports.bootstrapFieldsFor = function (resource, block) {
	var self = this;
	
	var inputs = {
		submit: function (name, params) {
			var output;
			params = params || {};
			
			self.fields_for(resource, function (form) {
				output = actions(function () {
					params = railway.utils.safe_merge({ class: 'btn btn-primary' }, params);
					return form.submit(name, params);
				});
			});
			return output;
		}
	};
	
	['input', 'file', 'textarea'].forEach(function (inputType) {
		inputs[inputType] = function (name, params) {
			var output;
			params = params || {};
			
			self.fields_for(resource, function (form) {
				output = controlGroup(name, function () {
					var label = params.label;
					var html = [];
					
					if (label !== false) {
						label = label || humanize(name);
						html.push(form.label(name, label, { class: 'control-label' }));
					}
					
					html.push(controls(name, function () {
						return form[inputType](name, params);
					}));
					
					return html.join("\n");
				});
			});
			return output;
		};
	});
	
	block(inputs);
	
	function humanize(name) {
		var u = railway.utils;
		return u.humanize(u.underscore(name));
	}
	
	function controlGroup(name, block) {
		var css = 'control-group' + ((resource.errors && resource.errors[name]) ? ' error' : '');
		return divTag({ class: css }, block);
	}
	
	function controls(name, block) {
		return divTag({ class: 'controls' }, function () {
			var html = [];
			var errors = resource.errors[name];
			
			html.push(block());
			if (errors) {
				html.push(spanTag({ class: 'help-inline' }, errors ? errors.join(', ') : null));
			}
			return html.join("\n");
		});
	}
	
	function actions(block) {
		return divTag({ class: 'form-actions' }, block);
	}
};
module.exports.bootstrap_fields_for = module.exports.bootstrapFieldsFor;

/**
 * Private helper methods.
 */
function divTag(params, block) {
	return genericTag('div', params, block);
}

function spanTag(params, block) {
	return genericTag('span', params, block);
}

function genericTag(name, params, block) {
	var html = [];
	
	html.push("<" + name + railway.utils.html_tag_params(params) + ">");
	
	if (typeof(block) === 'function') {
		html.push(block());
	} else if (block) {
		html.push(block);
	}
	
	html.push("</" + name + ">");
	return html.join("\n");
}
