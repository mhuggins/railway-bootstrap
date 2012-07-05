require('railway').createServer();
require('railway-bootstrap').init();

var vows = require('vows');
var assert = require('assert');

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
			var expectedStart = /^<form[^>]*method="POST"[^>]*>/;
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
	}
}).export(module);
