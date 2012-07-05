module.exports = InlineForm;

function InlineForm(context, resource, params) {
	var self = this;
	
	this.buf = arguments.callee.caller.buf;
	this.context = context;
	this.resource = resource;
	this.params = railway.utils.safe_merge({ class: 'form-inline' }, params);
}

InlineForm.prototype.fieldsFor = function (block) {
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
				params.placeholder = params.label;
				delete params.label;
				
				if (params.placeholder === false) {
					delete params.placeholder;
				} else {
					params.placeholder = params.placeholder || util.humanize(name);
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
			output = form.submit(name, params);
		});
		
		return output;
	}
};
