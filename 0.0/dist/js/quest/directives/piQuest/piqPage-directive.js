define(["require","text!./piqPage.html","underscore","angular"],function(e){function i(e,t,i,s){function u(){e.$emit("quest:refresh")}function a(t){function u(){var t=r.timer.message,u;o.log.timeout=!0,e.$broadcast("quest:timeout"),t?(u={pagesMeta:r.$meta,pagesData:r.data,global:i.global,current:i.current},n.isString(t)&&(t={body:t}),n.defaults(t,{header:"Timer Done",$context:u,$scope:e}),s.open(t).then(a)):a()}function a(){var t=r.timer.submitOnEnd||n.isUndefined(r.timer.submitOnEnd);t&&e.submit(!0)}var r=e.page;o.timer=t,o.log={name:r.name,startTime:+(new Date)},r.timer&&(t.start(r.timer),t.getScope().$on("timer-end",u))}var o=this;e.global=i.global,e.current=i.current,this.harvest=function(t){var r=e.current.questions;n.each(e.page.questions,function(n){if(!n.name||!t&&!n.lognow)return;var i=r[n.name];if(i.$logged)return;e.$emit("quest:log",i,o.log),i.$logged=!0})},e.submit=function(t){var n=e.pageForm.$valid;e.submitAttempt=!0;if(!n&&t!==!0)return!0;e.$broadcast("quest:submit"),o.proceed(),e.$emit("quest:next")},e.decline=function(t){var n=r.element(t.target),i=this.page.decline!=="double";i||n.hasClass("active")?(e.$broadcast("quest:decline"),o.proceed(),e.$emit("quest:next")):n.addClass("active")},e.prev=function(){o.proceed(),e.$broadcast("quest:prev")},this.proceed=function(){o.timer.stop(),o.harvest(e.page.lognow)},this.setup=a,e.$watch("current.questions",u,!0),e.$on("quest:submit:now",function(){e.submit()})}function s(){return{replace:!0,controller:i,template:t,require:["piqPage","piTimer"],link:function(e,t,n,r){r[0].setup(r[1])}}}var t=e("text!./piqPage.html"),n=e("underscore"),r=e("angular");return i.$inject=["$scope","$timeout","$rootScope","piModal"],s});