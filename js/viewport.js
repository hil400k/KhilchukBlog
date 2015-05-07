define([
	'module',
	'Backbone',
	'Underscore',
	'jQuery'
], function (module, Backbone, _, $) {
	
	var views = {},
		styles = {};
	
	var styleLoader = function (pageModule) { // method for loading css styles to major css file.
		var uri = pageModule.uri,
			styleUri = uri.substring(0, uri.length - 2).concat('css'),
			link;
		
		if (styles[styleUri]) {
			return;
		}
		styles[styleUri] = true;
		link = document.createElement("link");
		link.type = "text/css";
		link.rel = "stylesheet";
		link.href = styleUri;
		document.getElementsByTagName("head")[0].appendChild(link)
	};
	
	var create = function (context, name, View, options) { // method for creating views (extended info in the bottom of the page)
		var el, view, package;
		
		options ? options.el ? el = options.el : el = null : el = null;
		package = { 'styleLoader': styleLoader, 'options': options };
		el != null ? package.el = el : null;
		view = new View(package);
		
		views[name] = view;
		if (typeof context.children === 'undefined') {
			context.children = {};
			context.children[name] = view;
		} else {
			context.children[name] = view;
		}
		
		return view;
	};
	
	return {
		'create': create
	};	
});


// var create = function (context, name, View, options) {
//    This method helps to create views. It allows to pass 'package' to each view
//    Package can include your own data ( fourth parameter ) and el ( you can pass element for your child view will be $el in this child     view)
//    Package includes styleLoader and 