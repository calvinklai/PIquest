define(["questAPI"],function(e){var t=new e;return t.addSettings("DEBUG",!0),t.addSettings("logger",{pulse:2,url:"mine/sps"}),t.addSettings("onEnd",function(){console.log("onEnd"),location.href=location.href}),t.addSequence([{animate:"fade slide bong",prevText:"123",prev:!0,progressBar:"<%= pagesMeta.number %> out of <%= pagesMeta.outOf%>",header:"Questionnaire: example for realtime branching",questions:[{name:"myName",stem:"What is your name? (try yba!)",autoSubmit:!0},{mixer:"branch",remix:!0,conditions:[{compare:"questions.myName.response",to:"yba",DEBUG:!1}],data:[{stem:"how are you?",name:"secondary",type:"dropdown",autoSubmit:!0,dflt:"good",answers:["good","bad","ugly"],errorMsg:{correct:"That may not be correct... say good!"}}]}]}]),t.script});