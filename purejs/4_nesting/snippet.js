Promise.resolve([])
	.then(function (array) {
		array.push('a');
		return array;
	})
	.then(function (array) {
		return Promise.resolve(array)
			.then(function (array) {
				array.push('b1');
				return array;
			})
			.then(function (array) {
				array.push('b2');
				return array;
			});
	})
	.then(function (array) {
		array.push('c');
		return array;
	})
	.then(function (value) {
		console.log(value);
	});
