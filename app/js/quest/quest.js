define(function(require){
	var angular = require('angular');

	// load modules
	require('./wrapper/wrapper-module');
	require('./text/text-module');
	require('./textNumber/text-number-module');
	require('./piQuest/piQuest-module');

	// set modules that are requirements for the quest module
	var subModules = ['quest.text', 'quest.textNumber','quest.wrapper','quest.piQuest'];

	var module = angular.module('quest',subModules);

	return module;
});
