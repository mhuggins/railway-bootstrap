module.exports = {
	humanize:   humanize,
	divTag:     divTag,
	spanTag:    spanTag,
	genericTag: genericTag
};

function humanize(name) {
	return railway.utils.humanize(railway.utils.underscore(name));
}

function divTag(params, block) {
	return genericTag('div', params, block);
}

function spanTag(params, block) {
	return genericTag('span', params, block);
}

function genericTag(name, params, block) {
	var html = [];
	
	if (typeof(params) === 'function') {
		block = params;
		params = {};
	}
	params = params || {};
	
	html.push("<" + name + railway.utils.html_tag_params(params) + ">");
	
	if (typeof(block) === 'function') {
		html.push(block());
	} else if (block) {
		html.push(block);
	}
	
	html.push("</" + name + ">");
	return html.join("\n");
}
