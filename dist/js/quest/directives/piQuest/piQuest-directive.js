define(["underscore","text!./piQuest.html"],function(e,t){function n(t,n,r,i,s){function h(e,t){u.next(t),d()}function p(e,t){u.prev(t),d()}function d(){var e=u.current();e&&(t.page=e)}var o=this,u=o.task=new r(t.script),a,f=n.global,l=t.script,c=n.global[l.name||"current"]=n.current={questions:{}};l.current&&e.extend(c,l.current),l.global&&e.extend(f,l.global),this.init=h,a={global:f,current:c,questions:t.current.questions},e.extend(i,a),e.extend(s,a),t.$on("quest:next",h),t.$on("quest:prev",p),t.$on("quest:refresh",d),t.$on("quest:log",function(e,n,r){u.log(n,r,t.global)})}function r(){return{replace:!0,controller:n,template:t,link:function(e,t,n,r){r.init()}}}return n.$inject=["$scope","$rootScope","Task","templateDefaultContext","mixerDefaultContext"],r});