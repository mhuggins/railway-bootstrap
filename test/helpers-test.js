require('railway').createServer();
require('../lib/railway-bootstrap').init();

var vows = require('vows');
var assert = require('assert');

function User() {
	this.id = 1;
	this.username = 'AzureDiamond';
	this.email = 'hunter2@example.com';
	this.description = 'doesnt look like stars to me';
	this.avatar = null;
}

vows.describe('Helpers').addBatch({
	before: function () {
		railway.helpers.controller = {
			request: { csrfParam: 'csrf_name', csrfToken: 'csrf_value' }
		}
	},
	
	'bootstrapFormFor': {
		'creates form': function () {
			var buf = arguments.callee.buf = [];
			railway.helpers.bootstrapFormFor(null, function () {});
			
			var output = buf.join("\n");
			var expectedStart = /^<form class="form-horizontal" method="POST">/;
			var expectedEnd   = /<\/form>$/;
			
			assert.match(output, expectedStart);
			assert.match(output, expectedEnd);
		},
		
		'appends csrf': function () {
			var buf = arguments.callee.buf = [];
			railway.helpers.bootstrapFormFor(null, function () {});
			
			var output = buf.join("\n");
			var expected = '<input type="hidden" name="csrf_name" value="csrf_value" />';
			assert.include(output, expected);
		}
	},
	
	'bootstrapFieldsFor': {
		topic: new User(),
		
		'with type input': {
			'creates control group': function (user) {
				railway.helpers.bootstrapFieldsFor(user, function (form) {
					var output = form.input('username');
					assert.match(output, /^<div class="control-group">/ );
					assert.match(output, /<\/div>$/ );
				});
			},
			
			'creates label': function (user) {
				railway.helpers.bootstrapFieldsFor(user, function (form) {
					var output = form.input('username');
					var expected = '<label for="username" class="control-label">Username</label>';
					assert.include(output, expected);
				});
			},
			
			'creates text input': function (user) {
				railway.helpers.bootstrapFieldsFor(user, function (form) {
					var output = form.input('username');
					var expected = '<input name="username" id="username" value="' + user.username + '" />';
					assert.include(output, expected);
				});
			},
			
			'creates control container around input': function (user) {
				railway.helpers.bootstrapFieldsFor(user, function (form) {
					var output = form.input('username');
					var expected = /<div class="controls">\s*<input\b[^>]*\/>\s*<\/div>/;
					assert.match(output, expected);
				});
			}
		},
		
		'with type textarea': {
			'creates control group': function (user) {
				railway.helpers.bootstrapFieldsFor(user, function (form) {
					var output = form.textarea('description');
					assert.match(output, /^<div class="control-group">/ );
					assert.match(output, /<\/div>$/ );
				});
			},
			
			'creates label': function (user) {
				railway.helpers.bootstrapFieldsFor(user, function (form) {
					var output = form.textarea('description');
					var expected = '<label for="description" class="control-label">Description</label>';
					assert.include(output, expected);
				});
			},
			
			'creates textarea': function (user) {
				railway.helpers.bootstrapFieldsFor(user, function (form) {
					var output = form.textarea('description');
					var expected = '<textarea name="description" id="description">' + user.description + '</textarea>';
					assert.include(output, expected);
				});
			},
			
			'creates control container around textarea': function (user) {
				railway.helpers.bootstrapFieldsFor(user, function (form) {
					var output = form.textarea('description');
					var expected = /<div class="controls">\s*<textarea\b[^>]*>.*<\/textarea>\s*<\/div>/;
					assert.match(output, expected);
				});
			}
		},
		
		'with type file': {
			'creates control group': function (user) {
				railway.helpers.bootstrapFieldsFor(user, function (form) {
					var output = form.file('avatar');
					var expectedStart = /^<div class="control-group">/;
					var expectedEnd = /<\/div>$/;
					assert.match(output, expectedStart);
					assert.match(output, expectedEnd);
				});
			},
			
			'creates label': function (user) {
				railway.helpers.bootstrapFieldsFor(user, function (form) {
					var output = form.file('avatar');
					var expected = '<label for="avatar" class="control-label">Avatar</label>';
					assert.include(output, expected);
				});
			},
			
			'creates file input': function (user) {
				railway.helpers.bootstrapFieldsFor(user, function (form) {
					var output = form.file('avatar');
					var expected = '<input name="avatar" id="avatar" type="file" />';
					assert.include(output, expected);
				});
			},
			
			'creates control container around input': function (user) {
				railway.helpers.bootstrapFieldsFor(user, function (form) {
					var output = form.file('avatar');
					var expected = /<div class="controls">\s*<input\b[^>]*\/>\s*<\/div>/;
					assert.match(output, expected);
				});
			}
		},
		
		'with type submit': {
			'creates form actions container': function (user) {
				railway.helpers.bootstrapFieldsFor(user, function (form) {
					var output = form.submit();
					assert.match(output, /^<div class="form-actions">/ );
					assert.match(output, /<\/div>$/ );
				});
			},
			
			'creates submit button': function (user) {
				railway.helpers.bootstrapFieldsFor(user, function (form) {
					var output = form.submit('Register');
					var expected = '<button type="submit" class="btn btn-primary">Register</button>';
					assert.include(output, expected);
				});
			}
		}
	}
}).export(module);
