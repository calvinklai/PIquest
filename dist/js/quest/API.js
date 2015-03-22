define(["require","underscore","angular"],function(e){function r(){this.script={settings:{},pages:[],questions:[],sequence:[],global:{},current:{}},this.settings=this.script.settings}var t=e("underscore"),n=e("angular");return t.extend(r.prototype,{addSettings:function(e,n){var r;return t.isPlainObject(n)?(r=this.script.settings[e]=this.script.settings[e]||{},t.extend(r,n)):this.script.settings[e]=n,this},addPagesSet:function(e,n){var r=this.script;return t.isArray(n)||(n=[n]),t.each(n,function(t){t.set=e,r.pages.push(t)}),this},addQuestionsSet:function(e,n){var r=this.script;return t.isArray(n)||(n=[n]),t.each(n,function(t){t.set=e,r.questions.push(t)}),this},addSequence:function(e){var n=this.script;return t.isArray(e)||(e=[e]),n.sequence=n.sequence.concat(e),this},getGlobal:function(){return this.script.global},addGlobal:function(e){if(!t.isPlainObject(e))throw new Error("global must be an object");t.merge(this.getGlobal(),e)},getCurrent:function(){return this.script.current},addCurrent:function(e){if(!t.isPlainObject(e))throw new Error("current must be an object");t.merge(this.getCurrent(),e)},post:function(e,t){var r=n.injector(["ng"]);return r.invoke(["$http",function(n){return n.post(e,t)}])}}),r});