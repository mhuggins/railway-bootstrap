require('railway').createServer();
require('railway-bootstrap').init();

var vows = require('vows');
var assert = require('assert');
var InlineForm = require('railway-bootstrap/forms/inline');

function User() {
	this.id = 1;
	this.username = 'AzureDiamond';
	this.email = 'hunter2@example.com';
	this.description = 'doesnt look like stars to me';
	this.avatar = null;
}

var user = new User();

vows.describe('InlineForm').addBatch({
	before: function () {
		railway.helpers.controller = {
			request: { csrfParam: 'csrf_name', csrfToken: 'csrf_value' }
		}
	},
	
	'constructor': {
		topic: function () {
			arguments.callee.buf = [];
			return new InlineForm(railway.helpers, user);
		},
		
		'includes class in form tag': function (form) {
			form.fieldsFor();
			var output = form.buf.join('');
			var expected = /<form[^>]*class="form-inline"[^>]*>/;
			assert.match(output, expected);
		}
	},
	
	'fieldsFor': {
		topic: function () {
			arguments.callee.buf = [];
			return new InlineForm(railway.helpers, user)
		},
		
		'with type input': {
			'creates text input with placeholder': function (form) {
				form.fieldsFor(function (form) {
					var output = form.input('username');
					var expected = '<input name="username" id="username" placeholder="Username" value="' + user.username + '" />';
					assert.include(output, expected);
				});
			}
		},
		
		'with type textarea': {
			'creates textarea with placeholder': function (form) {
				form.fieldsFor(function (form) {
					var output = form.textarea('description');
					var expected = '<textarea name="description" id="description" placeholder="Description">' + user.description + '</textarea>';
					assert.include(output, expected);
				});
			}
		},
		
		'with type file': {
			'creates file input with placeholder': function (form) {
				form.fieldsFor(function (form) {
					var output = form.file('avatar');
					var expected = '<input name="avatar" id="avatar" type="file" placeholder="Avatar" />';
					assert.include(output, expected);
				});
			}
		},
		
		'with type submit': {
			'creates submit button': function (form) {
				form.fieldsFor(function (form) {
					var output = form.submit('Register');
					var expected = '<button type="submit" class="btn btn-primary">Register</button>';
					assert.include(output, expected);
				});
			}
		}
	}
}).export(module);
