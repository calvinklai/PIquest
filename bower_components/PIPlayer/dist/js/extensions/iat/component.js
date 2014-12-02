define("extensions/iat/data/properties",[],function(){return{DEBUG:!0,font:"Arial",fontSize:"2em",fontColor:"#31b404",defaultStimulus:{},instructionsStimulus:{css:{"font-size":"1.3em",color:"black",lineHeight:1.2,"text-align":"left",margin:"25px"}},background:"#EEEEEE",canvas:{maxWidth:800,proportions:.8},left:"e",right:"i",leftTouch:void 0,rightTouch:void 0,notouch:!0,timeout:0,randomize_order:!0,IATversion:"long",inter_trial_interval:250,post_instructions_interval:500,correct_errors:!0,error_feedback:{active:!0,media:"X",duration:"static"},correct_feedback:{active:!1,media:"OK",duration:300},timeout_feedback:{active:!0,media:"X",duration:500},simpleLayout:!0,separatorColor:"black",separatorSize:"1em",separator:{media:"or",height:5,css:{fontSize:"1.2em"}},endMedia:void 0,pulse:20,images_base_url:"",templates_base_url:"extensions/iat/jst"}}),define("extensions/iat/data/categories",[],function(){return{}}),define("extensions/iat/trial/input_decorator",["../data/properties"],function(t){var e=function(e){var a=e.input,i=e.interactions;switch(t.DEBUG&&a.push({handle:"skip1",on:"keypressed",key:27}),typeof t.left){case"undefined":a.push({handle:"left",on:"keypressed",key:"e"});break;case"string":case"number":a.push({handle:"left",on:"keypressed",key:t.left});break;default:t.left.handle="left",a.push(t.left)}switch(typeof t.right){case"undefined":a.push({handle:"right",on:"keypressed",key:"i"});break;case"string":case"number":a.push({handle:"right",on:"keypressed",key:t.right});break;default:t.right.handle="right",a.push(t.right)}if(!t.notouch){switch(typeof t.leftTouch){case"undefined":a.push({handle:"left",on:"leftTouch",touch:!0});break;default:a.push({handle:"left",on:"click",element:t.leftTouch,touch:!0})}switch(typeof t.rightTouch){case"undefined":a.push({handle:"right",on:"rightTouch",touch:!0});break;default:a.push({handle:"right",on:"click",element:t.rightTouch,touch:!0})}}return t.timeout&&(a.push({handle:"timeout",on:"timeout",duration:t.timeout}),i.push({conditions:[{type:"inputEquals",value:"timeout"}],actions:[{type:"removeInput",handle:["left","right"]},{type:"setTrialAttr",setter:{score:9}},{type:"log"},{type:"trigger",handle:"timeout_feedback"}]})),e};return e}),define("extensions/iat/trial/feedback_decorator",["../data/properties"],function(t){var e=function(e){for(var a=["correct","error","timeout"],i=e.interactions,n=0;n<a.length;n++){var r=a[n]+"_feedback",o=t[r]||{};i.push(o.active?{conditions:[{type:"inputEquals",value:r}],actions:[{type:"showStim",handle:r},{type:"setInput",input:{handle:"remove_"+r,on:"timeout",duration:o.duration>=0?o.duration:300}}]}:{conditions:[{type:"inputEquals",value:r}],actions:[{type:"trigger",handle:"remove_"+r}]}),"error_feedback"===r&&t.correct_errors?"static"!==o.duration&&i.push({conditions:[{type:"inputEquals",value:"remove_"+r}],actions:[{type:"hideStim",handle:r}]}):i.push({conditions:[{type:"inputEquals",value:"remove_"+r}],actions:[{type:"trigger",handle:"end"}]})}return e};return e}),define("extensions/iat/trial/default",["../data/properties","./input_decorator","./feedback_decorator"],function(t,e,a){function i(){var i={data:{score:0},input:[],layout:[{inherit:{type:"byData",set:"layout",data:"left"}},{inherit:{type:"byData",set:"layout",data:"right"}}],interactions:[{conditions:[{type:"begin"}],actions:[{type:"showStim",handle:"target"}]},{conditions:[{type:"inputEqualsStim",property:"side",handle:"target"}],actions:[{type:"removeInput",handle:["left","right","timeout"]},{type:"hideStim",handle:"error_feedback"},{type:"log"},{type:"trigger",handle:"correct_feedback"}]},{conditions:[{type:"inputEquals",value:"end"}],actions:[{type:"hideStim",handle:"All"},{type:"setInput",input:{handle:"endTrial",on:"timeout",duration:t.inter_trial_interval||0}}]},{conditions:[{type:"inputEquals",value:"endTrial"}],actions:[{type:"endTrial"}]},{conditions:[{type:"inputEquals",value:"skip1"}],actions:[{type:"setInput",input:{handle:"skip2",on:"enter"}}]},{conditions:[{type:"inputEquals",value:"skip2"}],actions:[{type:"goto",destination:"nextWhere",properties:{blockStart:!0}},{type:"endTrial"}]}],stimuli:[]},n={conditions:[{type:"inputEqualsStim",property:"side",handle:"target",negate:!0},{type:"inputEquals",value:["right","left"]}],actions:[{type:"trigger",handle:"error_feedback"},{type:"setTrialAttr",setter:{score:1}}]};return t.correct_errors||n.actions.unshift({type:"removeInput",handle:["left","right","timeout"]}),i.interactions.push(n),a(i),e(i),i}return i}),define("extensions/iat/stimuli/separator",["../data/properties"],function(t){return function(e,a){var i=t.separator,n={media:i.media,css:i.css||{color:"black"}},r=i.margin||0;switch(e){case"left":n.location={left:2+r,top:a};break;case"right":n.location={right:2+r,top:a};break;case"center":n.location={top:a}}return n}}),define("extensions/iat/stimuli/category",["../data/categories"],function(t){return function(e,a,i){var n=t[e],r=n.margin||0;if(!n)throw new Error(e+" is not a category name (or has not been loaded yet)");var o=n.title||n.name,s={media:o,css:n.titleCss||{fontSize:"1.3em",color:"black"},height:n.height||5};switch(a){case"left":s.location={left:2+r,top:i};break;case"right":s.location={right:2+r,top:i};break;case"center":s.location={top:i};break;default:throw new Error("Unknow side in category")}return s}}),define("extensions/iat/trial/layout",["underscore","../data/properties","../stimuli/separator","../stimuli/category"],function(t,e,a,i){var n=function(n){var r=[];return t.each(n,function(n,o){var s=2;t.each(n,function(n,c){var l,u;c>0&&t.isObject(e.separator)&&(l=new a(o,s),r.push(l),s+=e.separator.height||4),u=new i(n,o,s),r.push(u),s+=u.height})}),r};return n}),define("extensions/iat/trial/simple_layout",["underscore","../data/properties","../data/categories"],function(t,e,a){var i=function(i){var n=[];return t.each(i,function(i,r){var o={media:{template:"layout.jst"},data:{separatorColor:e.separatorColor,separatorSize:e.separatorSize}},s=o.data;switch(r){case"left":o.location={left:2,top:2};break;case"right":o.location={right:2,top:2};break;default:throw new Error("Unknow side")}t.each(i,function(e){var n=e.replace(/[0-9]/g,""),r=a[e],o=t.isObject(r.title)?r.title.word:r.title;if(!o)throw new Error("We are missing a title for "+i+". are you using an advanced media type by any chance?");s[n]=o,r.titleColor&&(s[n+"Color"]=r.titleColor),r.titleSize&&(s[n+"Size"]=r.titleSize)}),n.push(o)}),n};return i}),define("extensions/iat/trial/IATlayout",["../data/properties","./layout","./simple_layout"],function(t,e,a){var i={1:{left:["concept1"],right:["concept2"]},2:{left:["attribute1"],right:["attribute2"]},3:{left:["attribute1","concept1"],right:["attribute2","concept2"]},4:{left:["attribute1","concept1"],right:["attribute2","concept2"]},5:{left:["concept2"],right:["concept1"]},6:{left:["attribute1","concept2"],right:["attribute2","concept1"]},7:{left:["attribute1","concept2"],right:["attribute2","concept1"]}};return function(n){return t.simpleLayout?a(i[n]):e(i[n])}}),define("extensions/iat/trial/instructions",["underscore","../data/properties","../data/categories","./IATlayout"],function(t,e,a,i){function n(){var t={data:{block:"generic"},input:[{handle:"space",on:"space"}],interactions:[{conditions:[{type:"begin"}],actions:[{type:"showStim",handle:"All"}]},{conditions:[{type:"inputEquals",value:"space"}],actions:[{type:"hideStim",handle:"All"},{type:"setInput",input:{handle:"endTrial",on:"timeout",duration:e.post_instructions_interval||0}}]},{conditions:[{type:"inputEquals",value:"endTrial"}],actions:[{type:"endTrial"}]},{conditions:[{type:"inputEquals",value:"skip1"}],actions:[{type:"setInput",input:{handle:"skip2",on:"enter"}}]},{conditions:[{type:"inputEquals",value:"skip2"}],actions:[{type:"goto",destination:"nextWhere",properties:{blockStart:!0}},{type:"endTrial"}]}]};return e.DEBUG&&t.input.push({handle:"skip1",on:"keypressed",key:27}),e.notouch||t.input.push({handle:"space",on:"bottomTouch",touch:!0}),t}function r(){for(var r,c,l,u=n(),d=[u],p=function(){this.layout=i(this.data.part)},f=1;7>=f;f++)l=s[f]||{},r={data:{block:f},inherit:{set:"instructions",type:"byData",data:{block:"generic"}},customize:p},c={inherit:"instructions",media:{template:"inst"+f+".jst"}},l.media&&(c.media=l.media),l.template&&(c.media={inlineTemplate:l.template}),l.css&&(c.css=l.css),l.extend&&t.extend(r,l.extend),r.stimuli=[c],d.push(r);return t.each(a,function(t,e){u.data[e]=t.name,u.data[e+"Color"]=t.titleColor}),o.stimuli.push({inherit:"instructions",media:e.endMedia||{html:'<div><p style="font-size:1.4em"><color="#FFFAFA">You have completed this task<br/><br/>Thank you very much for your participation.<br/><br/> Press "space" in order to continue.</p></div>'}}),d.push(o),d}var o={data:{block:"last"},input:[{handle:"space",on:"space"}],interactions:[{conditions:[{type:"begin"}],actions:[{type:"showStim",handle:"All"}]},{conditions:[{type:"inputEquals",value:"space"}],actions:[{type:"endTrial"}]}],stimuli:[]},s=[];return function(t,e){return arguments.length?void(s[t]=e):r()}}),define("extensions/iat/trial/trials",["../data/categories","./default","./instructions","./IATlayout"],function(t,e,a,i){return function(){var n={},r=t.attribute1.name,o=t.attribute2.name,s=t.concept1.name,c=t.concept2.name;return n.Default=[e()],n.instructions=a(),n.IAT=[{data:{part:1,condition:s+","+c},layout:i(1),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"concept1_left"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:2,condition:r+","+o},layout:i(2),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"attribute1_left"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:3,row:1,condition:r+"/"+s+","+o+"/"+c,parcel:"first"},layout:i(3),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"concept1_left"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:3,row:2,condition:r+"/"+s+","+o+"/"+c,parcel:"first"},layout:i(3),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"attribute1_left"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:4,row:1,condition:r+"/"+s+","+o+"/"+c,parcel:"second"},layout:i(4),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"concept1_left"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:4,row:2,condition:r+"/"+s+","+o+"/"+c,parcel:"second"},layout:i(4),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"attribute1_left"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:5,condition:c+","+s},layout:i(5),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"concept1_right"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:6,row:1,condition:r+"/"+c+","+o+"/"+s,parcel:"first"},layout:i(6),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"concept1_right"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:6,row:2,condition:r+"/"+c+","+o+"/"+s,parcel:"first"},layout:i(6),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"attribute1_left"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:7,row:1,condition:r+"/"+c+","+o+"/"+s,parcel:"second"},layout:i(7),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"concept1_right"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:7,row:2,condition:r+"/"+c+","+o+"/"+s,parcel:"second"},layout:i(7),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"attribute1_left"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]}],n}}),define("extensions/iat/stimuli/stimuli",["underscore","../data/properties","../data/categories"],function(t,e,a){return function(){var i,n,r={};i=e.defaultStimulus,i.css=t.defaults(i.css||{},{font:e.font,fontSize:e.fontSize,color:e.fontColor}),r.Default=[i],r.instructions=[e.instructionsStimulus],r.attribute1=[t.extend(a.attribute1.stimulus||{},{inherit:"Default",css:a.attribute1.css||i.css})],r.attribute2=[t.extend(a.attribute2.stimulus||{},{inherit:"Default",css:a.attribute2.css||i.css})],r.concept1=[t.extend(a.concept1.stimulus||{},{inherit:"Default",css:a.concept1.css||i.css})],r.concept2=[t.extend(a.concept2.stimulus||{},{inherit:"Default",css:a.concept2.css||i.css})],t.extend(r,{attribute1_left:[],attribute1_right:[],concept1_left:[],concept1_right:[]});for(var o=0;5>o;o++)r.attribute1_left=r.attribute1_left.concat([{data:{side:"left",handle:"target",alias:a.attribute1.name},inherit:"attribute1",media:{inherit:{type:"exRandom",set:"attribute1"}}},{data:{side:"right",handle:"target",alias:a.attribute2.name},inherit:"attribute2",media:{inherit:{type:"exRandom",set:"attribute2"}}}]),r.attribute1_right=r.attribute1_right.concat([{data:{side:"left",handle:"target",alias:a.attribute2.name},inherit:"attribute2",media:{inherit:{type:"exRandom",set:"attribute2"}}},{data:{side:"right",handle:"target",alias:a.attribute1.name},inherit:"attribute1",media:{inherit:{type:"exRandom",set:"attribute1"}}}]),r.concept1_left=r.concept1_left.concat([{data:{side:"left",handle:"target",alias:a.concept1.name},inherit:"concept1",media:{inherit:{type:"exRandom",set:"concept1"}}},{data:{side:"right",handle:"target",alias:a.concept2.name},inherit:"concept2",media:{inherit:{type:"exRandom",set:"concept2"}}}]),r.concept1_right=r.concept1_right.concat([{data:{side:"left",handle:"target",alias:a.concept2.name},inherit:"concept2",media:{inherit:{type:"exRandom",set:"concept2"}}},{data:{side:"right",handle:"target",alias:a.concept1.name},inherit:"concept1",media:{inherit:{type:"exRandom",set:"concept1"}}}]);return n={correct:{handle:"correct_feedback",location:{top:80},css:{color:"green","font-size":"4em"},media:{word:"OK"},nolog:!0},error:{handle:"error_feedback",location:{top:80},css:{color:"red","font-size":"4em"},media:{word:"X"},nolog:!0},timeout:{handle:"timeout_feedback",location:{top:80},css:{color:"red","font-size":"4em"},media:{word:"X"},nolog:!0}},r.feedback=[],t.each(["correct","error","timeout"],function(t){var a=n[t];e[t+"_feedback"].css&&(a.css=e[t+"_feedback"].css),e[t+"_feedback"].media&&(a.media=e[t+"_feedback"].media),r.feedback.push(a)}),r}}),define("extensions/iat/data/sequence",["./properties"],function(t){function e(e,a){return t.trialsPerBlock&&"number"==typeof t.trialsPerBlock[e]?t.trialsPerBlock[e]:a}function a(){var a=[],i=[];return n(a,{part:1,block:1,trials:e(1,20),twoRows:!1}),n(a,{part:2,block:2,trials:e(2,20),twoRows:!1}),n(a,{part:3,block:3,trials:e(3,20),twoRows:!0}),n(a,{part:4,block:4,trials:e(4,40),twoRows:!0}),n(a,{part:5,block:5,trials:e(5,40),twoRows:!1}),n(a,{part:6,block:6,trials:e(6,20),twoRows:!0}),n(a,{part:7,block:7,trials:e(7,40),twoRows:!0}),n(i,{part:5,block:1,trials:e(5,20),twoRows:!1}),n(i,{part:2,block:2,trials:e(2,20),twoRows:!1}),n(i,{part:6,block:3,trials:e(6,20),twoRows:!0}),n(i,{part:7,block:4,trials:e(7,40),twoRows:!0}),n(i,{part:1,block:5,trials:e(1,40),twoRows:!1}),n(i,{part:3,block:6,trials:e(3,20),twoRows:!0}),n(i,{part:4,block:7,trials:e(4,40),twoRows:!0}),t.randomize_order?[{mixer:"choose",data:[{mixer:"wrapper",data:a},{mixer:"wrapper",data:i}]}]:a}function i(){var a=[],i=[];return n(a,{part:1,block:1,trials:e(1,20),twoRows:!1}),n(a,{part:2,block:2,trials:e(2,20),twoRows:!1}),n(a,{part:3,block:3,trials:e(3,50),twoRows:!0}),n(a,{part:5,block:4,trials:e(5,30),twoRows:!1}),n(a,{part:6,block:5,trials:e(6,50),twoRows:!0}),n(i,{part:5,block:1,trials:e(5,20),twoRows:!1}),n(i,{part:2,block:2,trials:e(2,20),twoRows:!1}),n(i,{part:6,block:3,trials:e(6,50),twoRows:!0}),n(i,{part:1,block:4,trials:e(1,30),twoRows:!1}),n(i,{part:3,block:5,trials:e(3,50),twoRows:!0}),t.randomize_order?[{mixer:"choose",data:[{mixer:"wrapper",data:a},{mixer:"wrapper",data:i}]}]:a}var n=function(e,a){e.push({data:{part:a.part,block:a.block,IATversion:t.IATversion,blockStart:!0},inherit:{set:"instructions",type:"byData",data:{block:a.block}}}),e.push({mixer:"repeat",times:a.twoRows?Math.floor(a.trials/2):a.trials,data:a.twoRows?[{inherit:{type:"byData",data:{part:a.part,row:1},set:"IAT"},data:{block:a.block}},{inherit:{type:"byData",data:{part:a.part,row:2},set:"IAT"},data:{block:a.block}}]:[{inherit:{type:"byData",data:{part:a.part},set:"IAT"},data:{block:a.block}}]})};return function(){var e="short"==t.IATversion?i():a();return e.push({data:{blockStart:!0},inherit:{set:"instructions",type:"byData",data:{block:"last"}}}),e}}),define("extensions/iat/component",["require","underscore","app/API","./data/properties","./data/categories","./trial/trials","./trial/instructions","./stimuli/stimuli","./data/sequence"],function(t){var e=t("underscore"),a=t("app/API"),i=t("./data/properties"),n=t("./data/categories"),r=t("./trial/trials"),o=t("./trial/instructions"),s=t("./stimuli/stimuli"),c=t("./data/sequence"),l=a.play;return e.extend(a,{setProperties:function(t){e.extend(i,t)},setCategory:function(t,i){var r=["concept1","concept2","attribute1","attribute2"];if(-1===e.indexOf(r,t))throw new Error(t+" is not a valid category name, please use one of the folowing: 'concept1','concept2', 'attribute1', 'attribute2'.");if(i.name||(i.name=t),i.title||(i.title=i.name),!i.media||!i.media.length)throw new Error("You must supply a media list for "+t);a.addMediaSets(t,i.media),n[t]=i},setInstructions:function(){o.apply(this,arguments)},play:function(){a.addSettings("canvas",e.defaults(i.canvas,{background:i.background,canvasBackground:i.background})),a.addSettings("base_url",{image:i.images_base_url,template:i.templates_base_url}),a.addSettings("logger",{pulse:i.pulse,url:i.post_url}),a.addSettings("redirect",i.next_url),a.addTrialSets(r()),a.addStimulusSets(s()),a.addSequence(c()),l.apply(this)}}),a}),define("text",["module"],function(t){var e,a,i,n,r,o=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],s=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,c=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,l="undefined"!=typeof location&&location.href,u=l&&location.protocol&&location.protocol.replace(/\:/,""),d=l&&location.hostname,p=l&&(location.port||void 0),f={},h=t.config&&t.config()||{};return e={version:"2.0.12",strip:function(t){if(t){t=t.replace(s,"");var e=t.match(c);e&&(t=e[1])}else t="";return t},jsEscape:function(t){return t.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:h.createXhr||function(){var t,e,a;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(e=0;3>e;e+=1){a=o[e];try{t=new ActiveXObject(a)}catch(i){}if(t){o=[a];break}}return t},parseName:function(t){var e,a,i,n=!1,r=t.indexOf("."),o=0===t.indexOf("./")||0===t.indexOf("../");return-1!==r&&(!o||r>1)?(e=t.substring(0,r),a=t.substring(r+1,t.length)):e=t,i=a||e,r=i.indexOf("!"),-1!==r&&(n="strip"===i.substring(r+1),i=i.substring(0,r),a?a=i:e=i),{moduleName:e,ext:a,strip:n}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(t,a,i,n){var r,o,s,c=e.xdRegExp.exec(t);return c?(r=c[2],o=c[3],o=o.split(":"),s=o[1],o=o[0],!(r&&r!==a||o&&o.toLowerCase()!==i.toLowerCase()||(s||o)&&s!==n)):!0},finishLoad:function(t,a,i,n){i=a?e.strip(i):i,h.isBuild&&(f[t]=i),n(i)},load:function(t,a,i,n){if(n&&n.isBuild&&!n.inlineText)return void i();h.isBuild=n&&n.isBuild;var r=e.parseName(t),o=r.moduleName+(r.ext?"."+r.ext:""),s=a.toUrl(o),c=h.useXhr||e.useXhr;return 0===s.indexOf("empty:")?void i():void(!l||c(s,u,d,p)?e.get(s,function(a){e.finishLoad(t,r.strip,a,i)},function(t){i.error&&i.error(t)}):a([o],function(t){e.finishLoad(r.moduleName+"."+r.ext,r.strip,t,i)}))},write:function(t,a,i){if(f.hasOwnProperty(a)){var n=e.jsEscape(f[a]);i.asModule(t+"!"+a,"define(function () { return '"+n+"';});\n")}},writeFile:function(t,a,i,n,r){var o=e.parseName(a),s=o.ext?"."+o.ext:"",c=o.moduleName+s,l=i.toUrl(o.moduleName+s)+".js";e.load(c,i,function(){var a=function(t){return n(l,t)};a.asModule=function(t,e){return n.asModule(t,l,e)},e.write(t,c,a,r)},r)}},"node"===h.env||!h.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]?(a=require.nodeRequire("fs"),e.get=function(t,e,i){try{var n=a.readFileSync(t,"utf8");0===n.indexOf("﻿")&&(n=n.substring(1)),e(n)}catch(r){i&&i(r)}}):"xhr"===h.env||!h.env&&e.createXhr()?e.get=function(t,a,i,n){var r,o=e.createXhr();if(o.open("GET",t,!0),n)for(r in n)n.hasOwnProperty(r)&&o.setRequestHeader(r.toLowerCase(),n[r]);h.onXhr&&h.onXhr(o,t),o.onreadystatechange=function(){var e,n;4===o.readyState&&(e=o.status||0,e>399&&600>e?(n=new Error(t+" HTTP status: "+e),n.xhr=o,i&&i(n)):a(o.responseText),h.onXhrComplete&&h.onXhrComplete(o,t))},o.send(null)}:"rhino"===h.env||!h.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?e.get=function(t,e){var a,i,n="utf-8",r=new java.io.File(t),o=java.lang.System.getProperty("line.separator"),s=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(r),n)),c="";try{for(a=new java.lang.StringBuffer,i=s.readLine(),i&&i.length()&&65279===i.charAt(0)&&(i=i.substring(1)),null!==i&&a.append(i);null!==(i=s.readLine());)a.append(o),a.append(i);c=String(a.toString())}finally{s.close()}e(c)}:("xpconnect"===h.env||!h.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(i=Components.classes,n=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),r="@mozilla.org/windows-registry-key;1"in i,e.get=function(t,e){var a,o,s,c={};r&&(t=t.replace(/\//g,"\\")),s=new FileUtils.File(t);try{a=i["@mozilla.org/network/file-input-stream;1"].createInstance(n.nsIFileInputStream),a.init(s,1,0,!1),o=i["@mozilla.org/intl/converter-input-stream;1"].createInstance(n.nsIConverterInputStream),o.init(a,"utf-8",a.available(),n.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),o.readString(a.available(),c),o.close(),a.close(),e(c.value)}catch(l){throw new Error((s&&s.path||"")+": "+l)}}),e}),define("text!extensions/iat/jst/layout.jst",[],function(){return"<div>\r\n	<% if (stimulusData.attribute) { %>\r\n		<span style=\"color:<%= stimulusData.attributeColor || '#31b404' %>; font-size:<%= stimulusData.attributeSize || '1.3em'%>\"><%= stimulusData.attribute%></span>\r\n	<%}%>\r\n	<% if (stimulusData.attribute && stimulusData.concept) { %>\r\n		</br>\r\n		<span style=\"color:<%= stimulusData.separatorColor %>; font-size:<%= stimulusData.separatorSize %>\">or</span>\r\n		</br>\r\n	<%}%>\r\n	<% if (stimulusData.concept) { %>\r\n		<span style=\"color:<%= stimulusData.conceptColor || '#0000FF' %>; font-size:<%= stimulusData.conceptSize || '1.3em'%>\"><%= stimulusData.concept%></span>\r\n	<%}%>\r\n</div>"});
//# sourceMappingURL=component.js.map