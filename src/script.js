define(['questAPI'], function(Quest){

	var API = new Quest();

	API.addSettings('logger', {
		pulse: 3,
		url: 'mine/sps'
		//DEBUG:true
	});

	API.addSettings('onEnd', function(){
		location.href = location.href;
	});

	//API.addGloba({test:''});

	API.addSequence([

		{
			progressBar: '<%= pagesMeta.number %> out of <%= pagesMeta.outOf%>',
			header: 'Questionnaire: example for realtime branching',
			questions: [
				{
					name: 'myName',
					stem: "What is your name? (try yba!)",
					autoSubmit: true
				},
				{
					mixer:'branch',
					remix:true,
					conditions:[{compare: 'questions.myName.response',to:'yba', DEBUG:false}],
					data:[
						{
							stem: 'how are you?',
							name: 'secondary',
							type: 'selectOne',
							dflt:'good',
							answers: ['good','bad','ugly'],
							errorMsg: {correct:"That may not be correct... say good!"}
						}
					]
				}
			]
		},

		{
			progressBar: '<%= pagesMeta.number %> out of <%= pagesMeta.outOf%>',
			header: '<%= pagesData.pageName %>: Questionnaire page num. <%= 1 + 1 %>',
			decline:"Cutsom decline text",
			noSubmit: 0,
			submitText: "Custom submit text",
			data: {pageName:'page name from data'},
			numbered: true,
			numberStart: 4,
			questions: [
				{
					name:'baat',
					type: 'selectMulti',
					stem: "Multi question",
					dflt: [1,2],
					numericValues: true,
					answers: [
						'plateu',
						'reverie',
						'syndrom',
						'polyAdept'
					],
					required: true,
					correct:true,
					correctValue: [1,3],
					errorMsg: {correct:"answer is reverie polyAdept"}
				},
				{
					name: 'myName',
					stem: "What is your name? (try yba!)",
					autoSubmit: true
				},
				{
					stem: 'how are you?',
					type: 'selectOne',
					autoSubmit: true,
					dflt:'good',
					buttons: true,
					answers: ['good','bad','ugly'],
					correct:true,
					correctValue: 'good',
					errorMsg: {correct:"That may not be correct... say good!"}
				}

			]
		},
		{
			mixer: 'branch',
			conditions: [{compare: 'questions.myName.response', to:'yba', DEBUG:false}],
			data: [{
				progressBar: '<%= pagesMeta.number %> out of <%= pagesMeta.outOf%>',
				header: 'Hi <%= questions.myName.response %>',
				questions: [
					{
						data: {myDflt:'this is a secret page...'},
						stem: 'This question can only be reached if you type yba for the previous question',
						dflt: '<%= questionsData.myDflt %>'
					}
				]
			}]
		},
		{
			mixer: 'repeat',
			times: 2,
			data: [
				{
					progressBar: '<%= pagesMeta.number %> out of <%= pagesMeta.outOf%>',
					reinterpolate:true,
					header: 'This Royal Questionnaire of mine.',
					timeoutMessage: 'My message',
					decline:true,
					numbered: true,
					numberStart: 4,
					questions: [
						{
							mixer: 'random',
							data: [
								{
									stem: "First question",
									required: true
								},
								{
									stem: "Second question"
								}
							]
						}
					]
				}
			]
		},
		{
			progressBar: '<%= pagesMeta.number %> out of <%= pagesMeta.outOf%>',
			questions: [
				{
					stem: 'how are you?',
					type: 'selectOne',
					dflt:2,
					buttons: true,
					answers: ['good','bad','ugly']
				},
				{
					stem: 'how are you?',
					type: 'selectOne',
					answers: ['good','bad','ugly']
				}
			]
		},
		{
			mixer: 'wrapper',
			data: [
				{
					header: 'This Royal Questionnaire of mine.',
					questions: [
						{
							stem: "Third question"
						},
						{
							stem: "Fourth question"
						}
					]
				}
			]
		}


	]);

	return API.script;
});