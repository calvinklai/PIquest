define(["require","underscore"],function(e){function n(e,n,r,i){function s(e,t){var n=this;if(!(this instanceof s))return new s(e,t);this.$scope=e,this.script=t,this.sequence=new r(t),e.$on("manager:next",function(){n.next()}),e.$on("manager:prev",function(){n.prev()})}return t.extend(s.prototype,{next:function(){this.sequence.next(),this.load()},prev:function(){this.sequence.prev(),this.load()},current:function(){var e=this.sequence.current();return e},load:function(){var e=this.current(),t=this.$scope;e?i(e).then(function(){t.$emit("manager:loaded",e.$script)}):t.$emit("manager:loaded")}}),s}var t=e("underscore");return n.$inject=["$rootScope","$q","managerSequence","taskLoad"],n});