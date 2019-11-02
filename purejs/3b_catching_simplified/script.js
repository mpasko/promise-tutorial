const DEFAULT_TIMEOUT = 2000


function trowingString() {
	return new Promise(function (resolve, reject) {
		throw 'sth is wrong'; //Good practice is to wrap it inside new Error class!
	});
}

function trowingError() {
	return new Promise(function (resolve, reject) {
		throw new Error('sth is wrong');
	});
}

function rejecting() {
	return new Promise(function (resolve, reject) {
		reject('sth is wrong');
	});
}

function resolvedPromise() {
	return Promise.resolve('OK!');
}

function waitASec(parameter) {
	console.log('Waiting...');
	return new Promise(function(resolve) {
		window.setTimeout(function () {
      console.log('Waiting complete!');
			resolve(parameter);
		}, DEFAULT_TIMEOUT);
	});
}

function selectSource() {
	const selected = $('#source-option').val();
	switch(selected) {
		case 'throw-string':
			return trowingString();
		case 'throw-error':
			return trowingError();
		case 'reject':
			return rejecting();
		default:
			return resolvedPromise();
	}
}

$('#try-catch-button').click(function () {
	try {
		selectSource()
			.then(function (result) {
				console.log(`try, inside then: ${result}`);
			});
	} catch (error) {
		console.warn(`caught: ${error}`);
	}
});

$('#catch-button').click(function () {
	selectSource()
		.then(waitASec)
		.catch(function (cause) {
			console.warn(`caught: ${cause}`);
			return 'overwritten result';
		})
		.then(function (result) {
			console.log(`after catch: ${result}`);
		});
});

$('#finally-button').click(function () {
	selectSource()
		.then(waitASec)
		.finally(function (cause) {
			console.log(`inside finally: ${cause}`);
			return 'overwritten result in finally';
		})
		.then(function (result) {
			console.log(`after finally: ${result}`);
		});
});
