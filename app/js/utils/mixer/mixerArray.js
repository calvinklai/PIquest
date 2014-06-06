define(function(require){
	var _ = require('underscore');

	mixerArrayProvider.$inject = ['mixer'];
	function mixerArrayProvider(mix){
		function mixerArray(sequence, depth){
			var mixed;
			var obj = sequence[0];

			depth = depth || 0;
			if (depth++ >= 10){
				throw new Error('Mixer: the mixer allows a maximum depth of 10');
			}

			if (_.isUndefined(obj.mixer)){
				return sequence;
			}

			// mix obj
			mixed = mix(obj);

			// remove obj from sequence
			sequence.shift();

			// concat mixed and sequence
			mixed = mixed.concat(sequence);

			return _.isUndefined(mixed[0].mixer) ? mixed : mixerArray(mixed, depth);
		}

		return mixerArray;
	}

	return mixerArrayProvider;
});