define(["require","text!./gridRow.html"],function(e){function t(){return{template:e("text!./gridRow.html"),require:["ngModel"],controller:"questController",controllerAs:"ctrl",scope:{row:"=questGridRow",data:"=questGridData"},link:function(e,t,n,r){var i=r[0],s=e.ctrl;e.model=i,e.$watch("response",function(t){e.row.$response=t}),s.registerModel(i,{data:e.row})}}}return t});