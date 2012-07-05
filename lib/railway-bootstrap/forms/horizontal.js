module.exports = HorizontalForm;

function HorizontalForm(context, resource, params) {
	var self = this;
	
	this.buf = arguments.callee.caller.buf;
	this.context = context;
	this.resource = resource;
	this.params = railway.utils.safe_merge({ class: 'form-horizontal' }, params);
}

HorizontalForm.prototype.fieldsFor = function (block) {
	var context = this.context;
	var resource = this.resource;
	var util = require('./form-util');
	
	arguments.callee.buf = this.buf;
	
	context.formTag(this.params, function () {
		if (block) {
			block({
				input:    input('input'),
				file:     input('file'),
				textarea: input('textarea'),
				submit:   submit
			});
		}
	});
	
	function input(inputType) {
		return function (name, params) {
			var output;
			params = params || {};
			
			context.fields_for(resource, function (form) {
				output = controlGroup(name, function () {
					var label = params.label;
					var html = [];
					
					delete params.label;
					
					if (label !== false) {
						label = label || util.humanize(name);
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
	}
	
	function submit(name, params) {
		var output;
		params = params || {};
		
		context.fields_for(resource, function (form) {
			output = actions(function () {
				params = railway.utils.safe_merge({ class: 'btn btn-primary' }, params);
				return form.submit(name, params);
			});
		});
		
		return output;
	}
	
	function controlGroup(name, block) {
		var css = 'control-group' + ((resource.errors && resource.errors[name]) ? ' error' : '');
		return util.divTag({ class: css }, block);
	}
	
	function controls(name, block) {
		return util.divTag({ class: 'controls' }, function () {
			var html = [];
			var errors = resource.errors && resource.errors[name];
			
			html.push(block());
			if (errors) {
				html.push(util.spanTag({ class: 'help-inline' }, errors ? errors.join(', ') : null));
			}
			return html.join("\n");
		});
	}
	
	function actions(block) {
		return util.divTag({ class: 'form-actions' }, block);
	}
};
