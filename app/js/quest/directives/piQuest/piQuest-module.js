define(function(require){

	var angular = require('angular');
	var piQuest = require('./piQuest-directive');
	var piqPage = require('./piqPage-directive');
	var module = angular.module('questPiQuest',['task'])
		// work around for dynamic module and form names
		// https://github.com/angular/angular.js/issues/1404#issuecomment-30859987
			.config(function($provide) {
				$provide.decorator('ngModelDirective', function($delegate) {
					var ngModel = $delegate[0], controller = ngModel.controller;
					ngModel.controller = ['$scope', '$element', '$attrs', '$injector', function(scope, element, attrs, $injector) {
						var $interpolate = $injector.get('$interpolate');
						attrs.$set('name', $interpolate(attrs.name || '')(scope));
						$injector.invoke(controller, this, {
							'$scope': scope,
							'$element': element,
							'$attrs': attrs
						});
					}];
					return $delegate;
				});
				$provide.decorator('ngFormDirective', function($delegate) {
					var form = $delegate[0], controller = form.controller;
					form.controller = ['$scope', '$element', '$attrs', '$injector', function(scope, element, attrs, $injector) {

						var $interpolate = $injector.get('$interpolate');
						attrs.$set('name', $interpolate(attrs.name || attrs.ngForm || '')(scope));
						$injector.invoke(controller, this, {
							'$scope': scope,
							'$element': element,
							'$attrs': attrs
						});
					}];
					return $delegate;
				});
			});

	module.directive('piQuest', piQuest);
	module.directive('piqPage', piqPage);

	return module;
});
