define(['underscore','./mixer-module', 'utils/randomize/randomizeModuleMock'],function(){

	var mixer;

	describe('Mixer', function(){
		beforeEach(module('mixer','randomizeMock'));

		beforeEach(inject(function(_mixer_){
			mixer = _mixer_;
		}));

		it('should return any non mixer object as is', function(){
			expect(mixer(123)).toEqual([123]);
			expect(mixer([])).toEqual([[]]);
			expect(mixer({a:345})).toEqual([{a:345}]);
		});

		it('should throw an error if an unknow mixer is used', function(){
			expect(function(){
				mixer({mixer:'unknow'});
			}).toThrow();
		});

		it('should repeat any data in a repeat n times', function(){
			expect(mixer({
				mixer:'repeat',
				times:'2',
				data: [1,2]
			})).toEqual([1,2,1,2]);
		});

		it('should return the data in a wrapper as is', function(){
			expect(mixer({
				mixer:'wrapper',
				data: [1,2]
			})).toEqual([1,2]);
		});

		it('should return the data in a random element randomized', function(){
			expect(mixer({
				mixer:'random',
				data: [1,2,3]
			})).toEqual([3,2,1]);
		});

		it('should choose n || 1 random elements', function(){
			expect(mixer({
				mixer:'choose',
				data: [1,2,3,4]
			})).toEqual([4]);

			expect(mixer({
				mixer:'choose',
				n: 2,
				data: [1,2,3,4]
			})).toEqual([4,3]);
		});

		it('should know how to weightedRandom', inject(function(randomizeSettings){
			randomizeSettings.random = 0.5;
			expect(mixer({
				mixer:'weightedRandom',
				weights: [0.2, 0.8],
				data: [1,2]
			})).toEqual([2]);

			randomizeSettings.random = 0.1;
			expect(mixer({
				mixer:'weightedRandom',
				weights: [0.2, 0.8],
				data: [1,2]
			})).toEqual([1]);

			randomizeSettings.random = 0.9;
			expect(mixer({
				mixer:'weightedRandom',
				weights: [0.2, 0.6, 0.2],
				data: [1,2, 3]
			})).toEqual([3]);
		}));
	});

	describe(': mixerSequential', function(){
		var mix;
		var mix1 = {mixer:1};
		var mix2 = {mixer:2};
		var mix3 = {mixer:3};
		var mixerSpy = jasmine.createSpy('mixer').andCallFake(function(a){
			if (a == mix1){
				return ['a','b'];
			}
			if (a == mix2){
				return [mix1,1];
			}
			if (a == mix3){
				return [mix3];
			}
		});

		beforeEach(module('mixer',function($provide){
			$provide.value('mixer', mixerSpy);
		}));

		beforeEach(inject(function(mixerSequential){
			mix = mixerSequential;
			mixerSpy.reset();
		}));

		it('should mix the first element', function(){
			mix([mix1]);
			expect(mixerSpy).toHaveBeenCalledWith(mix1);
		});

		it('should replace first element with the mixed array', function(){
			expect(mix([mix1,2])).toEqual(['a','b',2]);
		});

		it('should mix recursively', function(){
			expect(mix([mix2, 2])).toEqual(['a','b',1,2]);
		});

		it('should break recursion when mixerDepth is reached', function(){
			expect(function(){
				mix([mix3]);
			}).toThrow();
		});
	});

	describe(': mixerRecursive', function(){
		var mix;
		var mix1 = {mixer:1};
		var mix2 = {mixer:2};
		var mix3 = {mixer:3};
		var mixerSpy = jasmine.createSpy('mixer').andCallFake(function(a){
			if (a == mix1){
				return ['a','b'];
			}
			if (a == mix2){
				return [mix1,1];
			}
			if (a == mix3){
				return [mix3];
			}
		});

		beforeEach(module('mixer',function($provide){
			$provide.value('mixer', mixerSpy);
		}));

		beforeEach(inject(function(mixerRecursive){
			mix = mixerRecursive;
			mixerSpy.reset();
		}));

		it('should replace all elements with the mixed array', function(){
			expect(mix([mix1,3,mix1])).toEqual(['a','b',3, 'a','b']);
		});

		it('should mix recursively', function(){
			expect(mix([3, mix2])).toEqual([3, 'a','b',1]);
		});

		it('should break recursion when mixerDepth is reached', function(){
			expect(function(){
				mix([mix3]);
			}).toThrow();
		});
	});
});