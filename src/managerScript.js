define(['managerAPI'], function(Manager){

	var API = new Manager();

	API.addSettings('onEnd', function(){console.log('onEnd');});
	API.addSettings('onPreTask', function(currentTask, $http){
		var data = {taskName: currentTask.name, taskNumber: currentTask.$meta.number};
		var settings = currentTask.$script.settings;
		settings.logger = settings.logger || {};
		settings.logger.logFn = logger;
		return $http.post('task/advance/url', data);

		function logger(log){
			return angular.extend(log,data);
		}
	});

	API.addSequence([
		{
			type: 'message',
			//template: '<div>Does this work??</div>'
			templateUrl: '../../message.html'
		},
		{
			type:'quest',
			name: 'first',
			scriptUrl: 'questScript1.js'
		},
		{
			type:'quest',
			name:'second',
			scriptUrl: 'questScript2.js'
		}
	]);

	return API.script;
});