exports.init = function () {
	var HelperSet = railway.helpers.HelperSet;
	var helpers = require('./helpers');
	
	for (var name in helpers) {
		HelperSet.prototype[name] = helpers[name];
	}
};
