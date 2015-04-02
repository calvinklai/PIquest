define(["require","angular","underscore","utils/timer/timer-module","./buttons/buttons","utils/database/template/templateModule","utils/console/consoleModule","utils/modal/modalModule","./questController","./piQuest/piQuest-directive","./piQuest/piqPage-directive","./wrapper/wrapper-directive","./text/text-directive","./text/text-number-directive","./select/selectMixerProvider","./select/dropdownDirective","./select/selectOneDirective","./select/selectMultiDirective"],function(e){var t=e("angular"),n=e("underscore"),r=t.module("questDirectives",[e("utils/timer/timer-module").name,e("./buttons/buttons").name,e("utils/database/template/templateModule").name,e("utils/console/consoleModule").name,e("utils/modal/modalModule").name]);return r.controller("questController",e("./questController")),r.directive("piQuest",e("./piQuest/piQuest-directive")),r.directive("piqPage",e("./piQuest/piqPage-directive")),r.directive("questWrapper",e("./wrapper/wrapper-directive")),r.directive("questText",e("./text/text-directive")),r.directive("questTextNumber",e("./text/text-number-directive")),r.service("questSelectMixer",e("./select/selectMixerProvider")),r.directive("questDropdown",e("./select/dropdownDirective")),r.directive("questSelectOne",e("./select/selectOneDirective")),r.directive("questSelectMulti",e("./select/selectMultiDirective")),r.directive("piQuestValidation",function(){return{replace:!0,transclude:!0,scope:{unvalid:"=piQuestValidation"},template:['<div class="alert alert-danger" role="alert" ng-show="unvalid">','<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>',"<span ng-transclude></span>","</div>"].join("")}}),r.filter("toRegex",["piConsole",function(e){function t(t){var r;if(n.isUndefined(t))return/(?:)/;if(n.isRegExp(t)||n.isString(t))return new RegExp(t);throw r=new Error("Question pattern is not a valid regular expression"),e("text").error(r,t),r}return t}]),r});