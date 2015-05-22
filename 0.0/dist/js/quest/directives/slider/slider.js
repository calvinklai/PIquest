(function(e,t){if(typeof define=="function"&&define.amd)define([],t);else{var n=angular.module("pi",[]);n.directive("piSlider",t(e.angular))}})(this,function(){function t(t){return{scope:{options:"=piSliderOptions"},replace:!0,require:"ngModel",template:['<div class="slider" ng-mousedown="onSliderMouseDown($event)">','<div class="slider-label-left">{{options.leftLabel}}</div>','<div class="slider-label-right">{{options.rightLabel}}</div>','<div class="slider-container">','<div class="slider-bar">','<div class="slider-bar-highlight" ng-style="highlightStyle"></div>',"</div>",'<div class="slider-handle" ng-mousedown="onHandleMousedown($event)" ng-style="handleStyle"></div>',"</div>",'<ul class="slider-pips" ng-if="!options.hidePips">','<li ng-repeat="i in getNumber(steps) track by $index" ng-style="{width: pipWidth + \'%\'}" ng-class="{last:$last}"></li>',"</ul>",'<ul class="slider-labels">','<li ng-repeat="label in labels track by $index" ng-style="{width: labelsWidth + \'%\'}" ng-class="{first:$first, last:$last}">{{label}}</li>',"</ul>","</div>"].join("\n"),link:function(i,s,o,u){function l(e){u.$setViewValue(e),u.$render()}function c(e){return!i.steps||u.$isEmpty(e)?e:Math.round(e*i.steps)/i.steps}function h(){var e=c(u.$viewValue),t=!isNaN(e),n=t?"block":"none",r=t&&f.highlight?"block":"none";i.highlightStyle={right:100-e*100+"%",display:r},i.handleStyle={left:e*100+"%",display:n}}function p(e){return u.$isEmpty(e)?NaN:(e=Math.min(Math.max(e,i.min),i.max),(e-i.min)/i.range)}function d(e){return+(i.min+c(e)*i.range).toFixed(4)}function v(r){function c(e){n(e),e.preventDefault();var t=o+(e.pageX-f)/(s.prop("clientWidth")-a);t=Math.min(t,1),t=Math.max(t,0),i.$apply(function(){l(t)})}function h(){t.off("mousemove",c),t.off("mouseup",h),i.$emit(e,u.$viewValue)}n(r);var o,f;r.preventDefault(),r.stopPropagation(),f=r.pageX,o=u.$viewValue,t.on("mousemove",c),t.on("mouseup",h)}function m(t){n(t),t.preventDefault();var r=s.prop("clientWidth"),o=s[0].getBoundingClientRect().left,f=(t.pageX-o-a/2)/(r-a);f=Math.min(f,1),f=Math.max(f,0),l(f),i.$emit(e,u.$viewValue)}var a,f=i.options||{};a=s[0].querySelector(".slider-handle").clientWidth,i.ngModel=u,i.min=f.min||0,i.max=f.max||i.min+100,i.range=i.max-i.min,i.steps=f.steps?f.steps-1:0,i.pipWidth=f.steps&&100/i.steps,i.labels=f.labels,i.labelsWidth=f.labels&&100/f.labels.length,u.$isEmpty=r,u.$render=h,u.$formatters.push(p),u.$parsers.push(d),i.onHandleMousedown=v,i.onSliderMouseDown=m,i.getNumber=function(t){return new Array(t)}}}}function n(e){var t,n,r;e.pageX==null&&e.clientX!=null&&(t=e.target.ownerDocument||document,n=t.documentElement,r=t.body,e.pageX=e.clientX+(n&&n.scrollLeft||r&&r.scrollLeft||0)-(n&&n.clientLeft||r&&r.clientLeft||0),e.pageY=e.clientY+(n&&n.scrollTop||r&&r.scrollTop||0)-(n&&n.clientTop||r&&r.clientTop||0))}function r(e){return isNaN(parseFloat(e))||!isFinite(e)}var e="slider:change";return t.$inject=["$document","$sce"],t});