module.exports = VerticalForm;

function VerticalForm(context, resource, params) {
	var self = this;
	
	this.buf = arguments.callee.caller.buf;
	this.context = context;
	this.resource = resource;
	this.params = railway.utils.safe_merge({ class: 'form-vertical' }, params);
}

VerticalForm.prototype.fieldsFor = function (block) {
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
			var output = [];
			params = params || {};
			
			context.fields_for(resource, function (form) {
				var label = params.label;
				delete params.label;
				
				if (label !== false) {
					label = label || util.humanize(name);
					output.push(form.label(name, label));
				}
				
				output.push(form[inputType](name, params));
			});
			
			return output.join("\n");
		};
	}
	
	function submit(name, params) {
		var output;
		params = params || {};
		
		context.fields_for(resource, function (form) {
			params = railway.utils.safe_merge({ class: 'btn btn-primary' }, params);
			output = util.divTag(function () {
				return form.submit(name, params);
			});
		});
		
		return output;
	}
};
