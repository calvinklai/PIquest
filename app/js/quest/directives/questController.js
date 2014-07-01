/**
 * This is the default controller for all questions.
 * It exposes the local scope, and a `value` method that the harvester can use.
 */

define(function(require){
	var _ = require('underscore');

	questController.$inject = ['$scope', 'timerStopper', '$parse', '$attrs'];
	function questController($scope, Stopper, $parse, $attr){
		var self = this;
		var log;
		var data = $scope.data;
		var defaults = {
			dflt: NaN
		};

		this.scope = $scope;
		this.stopper = new Stopper();


		this.registerModel = function(ngModel, options){

			options = _.defaults(options || {}, defaults);

			var ngModelGet = $parse($attr.ngModel);
			var dfltValue = ("dflt" in data) ? data.dflt : options.dflt; // use "in" to cover cases where dflt is set to "" or explicitly undefined

			// set log and module
			if (_.isUndefined(ngModelGet($scope))){
				self.log = ngModel.$modelValue = log = {
					name: data.name,
					response: dfltValue
				};
				$scope.response = ngModel.$viewValue = dfltValue;

				ngModelGet.assign($scope.$parent, log);
			} else {
				log = self.log = ngModelGet($scope);
				ngModel.$viewValue = log.response;
			}

			// model --> view
			// should probably never be called (since our model is an object and not a primitive)
			ngModel.$formatters.push(function(modelValue) {
				return modelValue.response;
			});

			// view --> model
			ngModel.$parsers.push(function(viewValue){
				// don't know exactly why this is needed!
				// probably has to do with our use of nested ng-module
				if (_.isUndefined(viewValue)){
					return log;
				}
				var latency = self.stopper.now();

				log.response = viewValue;
				log.latency = latency;

				// if this is the first change
				if (!log.pristineLatency){
					log.pristineLatency = latency;
				}

				return log;
			});

			// maker the model work with a custom event, so that it doesn't get confused with inner modules
			// note: this is a problem caused by nesting ngModule...
			ngModel.$options = _.defaults(ngModel.$options || {}, {updateOn: "quest"});

			$scope.$watch('response',function(newValue, oldValue /*, scope*/){
				newValue !== oldValue && ngModel.$setViewValue(newValue, 'quest');
			});
		};
	}

	return questController;
});