define(['underscore','./task-module'],function(){

	describe('Task',function(){
		var task;
		var sendSpy = jasmine.createSpy("send");
		var logSpy = jasmine.createSpy("log");
		var createSpy = jasmine.createSpy('create');
		var parseSpy = jasmine.createSpy('parse');
		var nextSpy = jasmine.createSpy('next').andReturn('nextObj');
		var script = {};

		// stubout constructors
		beforeEach(module('task', 'logger','database', function($provide) {
			$provide.value('Logger', jasmine.createSpy('Logger').andCallFake(function(){
				this.send = sendSpy;
				this.log = logSpy;
				this.setSettings = jasmine.createSpy('setSettings');
			}));
			$provide.value('Database', function(){
				this.createColl = createSpy;
			});
			$provide.value('taskParse',parseSpy);
			$provide.value('TaskSequence',function(){
				this.proceed = nextSpy;
			});
		}));

		beforeEach(inject(function(Task){
			task = new Task(script);
		}));

		it('should setup the db', inject(function(Database){
			expect(task.db).toBeDefined();
			expect(task.db).toEqual(jasmine.any(Database));
		}));

		it('should setup the sequence', inject(function(TaskSequence){
			expect(task.sequence).toBeDefined();
			expect(task.sequence).toEqual(jasmine.any(TaskSequence));
		}));

		it('should setup the logger', inject(function(Task){
			var script = {
				settings: {
					logger:{a:1}
				}
			};
			task = new Task(script);
			expect(task.logger.setSettings).toHaveBeenCalledWith(script.settings.logger);
		}));

		it('should call settings.onEnd at the end of the task (if there is no endObject)', inject(function(Task, $rootScope){
			var script = {
				settings: {
					onEnd:jasmine.createSpy('onEnd')
				}
			};
			task = new Task(script);
			nextSpy.andReturn(null);
			task.next();
			$rootScope.$apply();
			expect(script.settings.onEnd).toHaveBeenCalled();
			nextSpy.andReturn('nextObj');
		}));

		it('should log anything left at the end of the task', inject(function($rootScope){
			nextSpy.andReturn(null);
			task.next();
			$rootScope.$apply();
			expect(sendSpy).toHaveBeenCalled();
			nextSpy.andReturn('nextObj');
		}));


		it('should call the parser', inject(function(Database){
			expect(parseSpy).toHaveBeenCalledWith(script, jasmine.any(Database), jasmine.any(Object));
		}));

		it('should ask for the next object to display', function(){
			var nextObj = "nextContent";
			var result = task.next(nextObj);
			expect(result).toBe('nextObj');
			expect(nextSpy).toHaveBeenCalledWith(nextObj, task.db);
		});

		it('should log user responses', function(){
			var logObj = "logContent";
			task.log(logObj);
			expect(logSpy).toHaveBeenCalledWith(logObj);
		});
	});

	describe('parser', function(){
		var script = {
				pages: {},
				questions: {},
				sequence: {}
			},

			db = jasmine.createSpyObj('db', ['createColl', 'add']),
			sequence = jasmine.createSpyObj('sequence', ['add']);


		beforeEach(module('task'));

		beforeEach(inject(function(taskParse){
			taskParse(script, db, sequence);
		}));

		it('should create the appropriate tables for the db', function(){
			expect(db.createColl.argsForCall[0]).toEqual(['pages']);
			expect(db.createColl.argsForCall[1]).toEqual(['questions']);
		});

		it('should add appropriate elements to the tables', function(){
			expect(db.add.argsForCall[0]).toEqual(['pages', script.pages]);
			expect(db.add.argsForCall[1]).toEqual(['questions', script.questions]);
		});

		it('should add sequence to sequenceObj', function(){
			expect(sequence.add).toHaveBeenCalledWith(script.sequence);
		});

		it('should throw an error if no sequence is provided',inject(function(taskParse){
			expect(function(){
				taskParse({} ,db, sequence);
			}).toThrow();
		}));
	});

	describe('sequence', function(){
		var db = jasmine.createSpyObj('db', ['inflate']);
		var sequence;
		// mock the mixer without mixing
		var mixerSpy = jasmine.createSpy('mixerSequential');
		var recursiveMixerSpy = jasmine.createSpy('mixerRecursive').andCallFake(function(a){return a;});

		beforeEach(module('task', function($provide){
			$provide.value('mixerSequential', mixerSpy);
			$provide.value('mixerRecursive', recursiveMixerSpy);
		}));
		beforeEach(inject(function(TaskSequence){
			mixerSpy.andCallFake(function(a){return [a[0],a[0]];});
			sequence = new TaskSequence([1,2,3,4], db);
		}));

		it('should be an instance of Collection and of Sequence', inject(function(TaskSequence, Collection){
			expect(sequence).toEqual(jasmine.any(TaskSequence));
			expect(sequence).toEqual(jasmine.any(Collection));
		}));

		it('should have a db, and throw an exception if its missing', inject(function(TaskSequence){
			expect(sequence.db).toBe(db);
			expect(function(){
				new TaskSequence([]);
			}).toThrow();
		}));

		describe(': buildPage', function(){
			it('should know how to inflate a page', function(){
				var page = {};
				db.inflate.andReturn(page); // make sure the inflate function gets a page too
				sequence.buildPage(page);
				expect(db.inflate).toHaveBeenCalledWith('pages',page);
			});

			it('should know how to inflate questions', function(){
				var questions = [1,2,3];
				var page = {questions:questions};
				db.inflate.andReturn(page); // make sure the inflate function gets a page too
				sequence.buildPage(page);

				expect(db.inflate).toHaveBeenCalledWith('questions',1);
				expect(db.inflate).toHaveBeenCalledWith('questions',2);
				expect(db.inflate).toHaveBeenCalledWith('questions',3);
			});

			it('should mix the questions', function(){
				var page = {questions:[1,23,2]};
				db.inflate.andReturn(page);
				sequence.buildPage(page);
				expect(recursiveMixerSpy).toHaveBeenCalledWith([1,23,2]);
			});

			it('should inflate the page templates', function(){
				var page = {data:{value:'test'}, foo:'<%= pageData.value%>'};
				db.inflate.andReturn(page);
				sequence.buildPage(page);
				expect(page.foo).toBe('test');
			});

			it('should inflate the questions templates', function(){
				var question = {data:{value:'quest data'}, foo:'<%= pageData.value%>', bar: '<%= questData.value %>'};
				var page = {data:{value:'page data'}, questions:[question]};
				db.inflate.andCallFake(function(a){return a == 'questions' ? question : page;});
				sequence.buildPage(page);
				expect(question.foo).toBe('page data');
				expect(question.bar).toBe('quest data');
			});

		});

		describe(': proceed', function(){
			it('should mix the sequence before proceeding', function(){
				spyOn(sequence,'buildPage').andCallFake(function(value){return value;});
				spyOn(sequence,'mix').andCallFake(function(){
					expect(sequence.buildPage).not.toHaveBeenCalled();
				});
				sequence.proceed();
				expect(sequence.mix).toHaveBeenCalled();
			});

			it('should return undefined and not mix when we reach the end', function(){
				spyOn(sequence,'buildPage').andCallFake(function(value){return value;});
				sequence.last();
				expect(sequence.proceed()).toBe(undefined);
				expect(mixerSpy).not.toHaveBeenCalled();
			});

			it('should return an infalted version of the next obj', function(){
				spyOn(sequence,'buildPage').andCallFake(function(value){return value;});
				spyOn(sequence,'mix'); // neutralize mix

				expect(sequence.proceed()).toBe(1);
				expect(sequence.buildPage).toHaveBeenCalledWith(1);
				expect(sequence.proceed()).toBe(2);
				expect(sequence.buildPage).toHaveBeenCalledWith(2);
			});
		});

		describe(': mix',function(){
			beforeEach(inject(function($rootScope){
				$rootScope.global = {};
				$rootScope.current = {questions:{}};
			}));

			it('should mix the current object', function(){
				sequence.last();
				sequence.mix();
				expect(mixerSpy).toHaveBeenCalledWith([4]);
			});

			it('should proceed and remix, if an empty mixer was returned', function(){
				var mixerStack = [[], [7], [8]];
				mixerSpy.andCallFake(function(){return mixerStack.shift();});
				sequence.next();
				sequence.mix();
				expect(sequence.collection).toEqual([7,3,4]);
			});

			it('should replace the object with the mixed array', function(){
				sequence.next();
				sequence.next();
				sequence.mix();
				expect(sequence.collection).toEqual([1,2,2,3,4]);
			});

			it('should update sequence length', function(){
				sequence.next();
				sequence.mix();
				expect(sequence.length).toEqual(5);
			});

		});
	});
});