define([],function(){function e(e,t,n){return{scope:{task:"=piTask"},link:function(r,i){var s=r.task,o,u,a;if(!s)return;a=e(s,i,r.$new()),o=t(s.canvas),a["finally"](o),s.title&&(u=n[0].title,n[0].title=s.title,a["finally"](function(){n[0].title=u})),a["finally"](function(){r.$emit("task:done",arguments)})}}}return e.$inject=["taskActivate","managerCanvas","$document"],e});