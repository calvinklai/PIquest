/*jshint unused: vars */
define([], function(){
	var req = require.config({
		paths: {
			underscore: "../libs/lodash/dist/lodash.min",
			angular: '../libs/angular/angular',
			angularMocks: '../libs/angular-mocks/angular-mocks',
			text: '../libs/requirejs-text/text'
		},
		shim: {
			'angular' : {'exports' : 'angular'}
		},
		priority: [
			'angular'
		]
	});

	//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
	window.name = 'NG_DEFER_BOOTSTRAP!';

	require(['angular','app'], function(angular, app) {
		angular.element().ready(function() {
			angular.resumeBootstrap([app.name]);
		});
	});

	return req;
});