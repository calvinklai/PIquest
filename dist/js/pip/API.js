define(["require","underscore"],function(e){function n(e){this.script={global:{},current:{},trialSets:{},stimulusSets:{},mediaSets:{},sequence:[]},this.script.name=e||"anonymous PIP",this.settings=this.script.settings={canvas:{maxWidth:800,proportions:.8},hooks:{}}}function r(e){function n(n,r){var i=this.script[e+"Sets"]||(this.script[e+"Sets"]={}),s;if(t.isPlainObject(n))t.merge(i,n);else{t.isArray(r)||(r=[r]),i[n]||(i[n]=[]);for(s=0;s<r.length;s++)i[n].push(r[s])}}return n}var t=e("underscore");return t.extend(n.prototype,{addTrialSets:r("trial"),addStimulusSets:r("stimulus"),addMediaSets:r("media"),addSettings:function(e,n){var r;return t.isPlainObject(n)?(r=this.settings[e]=this.settings[e]||{},t.extend(r,n)):this.settings[e]=n,this},addSequence:function(e){var n=this.script;return t.isArray(e)||(e=[e]),n.sequence=n.sequence.concat(e),this},addGlobal:function(e){if(!t.isPlainObject(e))throw new Error("global must be an object");t.merge(this.getGlobal(),e)},getGlobal:function(){return window.piGlobal},addCurrent:function(e){if(!t.isPlainObject(e))throw new Error("current must be an object");t.merge(this.script.current,e)},getCurrent:function(){return this.script.current},addScript:function(e){t.merge(this.script,e)},getScript:function(){return this.script},getLogs:function(){return this.script.current.logs},play:function(){throw new Error("you should return API.script instead of calling API.play()!!")}}),n});