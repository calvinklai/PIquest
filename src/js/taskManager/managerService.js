define(function(require){
	var _ = require('underscore');

	managerService.$inject = ['$rootScope', '$q', 'managerSequence', 'managerTaskLoad', 'managerCanvas','$document'];
	function managerService($rootScope, $q, ManagerSequence, taskLoad, canvas, $document){

		/**
		 * This is the constructor for the manager object.
		 *
		 * The manager is responsible for the interface between the managerDirective and the managerSequence
		 * It deals with loading tasks (pulled from the sequence)
		 * And notifying the directive that a new task is ready to be run.
		 *
		 * listens to manager:next and manager:prev ==> proceeds sequence
		 *
		 * emits manager:loaded <== when a script is loaded
		 *
		 * @param  {Scope} $scope The scope to be notified
		 * @param  {Object} script The manager script to be parsed
		 * @return {Object}
		 */
		function manager($scope, script){
			var self = this;
			var canvasOff;
			var settings = script.settings || {};

			// make sure this works without a new statement
			if (!(this instanceof manager)){
				// jshint newcap:false
				return new manager($scope,script);
				// jshint newcap:true
			}

			this.$scope = $scope;
			this.script = script;

			// create sequence
			this.sequence = new ManagerSequence(script);

			// activate canvas
			canvasOff = canvas(settings.canvas);
			$scope.$on('$destroy', canvasOff);

			// activate titles
			if (settings.title){
				$document[0].title = script.settings.title;
			}

			$scope.$on('manager:next', function(event, target){
				target || (target = {type:'next'});
				switch (target.type){
					case 'current':
						self.load(target);
						break;
					case 'prev':
						self.prev(target);
						break;
					case 'next':
						/* fall through */
					default:
						self.next(target);
				}
			});
			$scope.$on('manager:prev', function(){self.prev();});

		}

		_.extend(manager.prototype, {
			next: function(target){
				this.sequence.next();
				this.load(target);
			},

			prev: function(target){
				this.sequence.prev();
				this.load(target);
			},

			current: function(){
				// taskLoad sets the loaded script into $script
				return this.sequence.current();
			},

			load: function(target){
				var task = this.current();
				var $scope = this.$scope;
				var loadOptions = {
					baseUrl: this.baseUrl,
					bustCache: target && target.bustCache
				};

				if (task){
					taskLoad(task, loadOptions).then(function(){
						$scope.$emit('manager:loaded');
					});
				} else {
					// let the directive deal with the end of the sequence
					$scope.$emit('manager:loaded');
				}
			},

			setBaseUrl: function(baseUrl){
				this.baseUrl = baseUrl;
			}
		});

		return manager;
	}

	return managerService;

});
