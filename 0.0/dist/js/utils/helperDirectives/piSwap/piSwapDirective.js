define(["require","underscore"],function(e){function n(e){this.$scope=e}function r(e,r){return{transclude:!0,controller:n,controllerAs:"ctrl",compile:function(){return{pre:this.pre,post:function(){}}},pre:function(e,n,i,s,o){function c(e){var t=e||{};f&&(f.remove(),f=null),u&&(u.$destroy(),u=null),a&&(r.leave(a,function(){f=null,t.postLeave&&t.postLeave()}),f=a,a=null)}function h(n,i){var s=i||{};s.pre&&s.pre();if(!n)return c(s);var f=t.extend(e.$new(),n);o(f,function(e){d(e,s.animate),c(s),a=e,u=f,r.enter(a,l,null,function(){s.post&&s.post()})})}function p(e){t.extend(u,e)}function d(e,n){if(!n)return;var r=n.split(" ");t.each(r,function(e){$injector.has("."+e+"-animation")||piConsole(["page","animation"]).error('Unknown animation type: "'+e+'"')}),e.addClass(n)}e.enter=h,e.empty=c,e.refresh=p;var u,a,f,l=n}}}var t=e("underscore");return n.$inject=["$scope"],t.extend(n.prototype,{next:function(e,t){this.$scope.enter(e,t)},prev:function(e,t){this.$scope.enter(e,t)},refresh:function(e){this.$scope.refresh(e)},empty:function(e){this.$scope.empty(e)}}),r.$inject=["$compile","$animate"],r});