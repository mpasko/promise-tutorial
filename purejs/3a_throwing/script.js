const DEFAULT_TIMEOUT = 2000

function trowingInside() {
	return new Promise(function (resolve, reject) {
		throw 'sth is wrong'; //Good practice is to wrap it inside new Error class!
	});
}

function rejectingInside() {
	return new Promise(function (resolve, reject) {
		reject('sth is wrong'); //Good practice is to wrap it inside new Error class too!
	});
}

function rejectedPromise() {
	return Promise.reject('sth is wrong'); //Same here
}

function waitASec() {
	console.log('Waiting...');
	return new Promise(function(resolve) {
		window.setTimeout(function () {
      console.log('Waiting complete!');
			resolve();
		}, DEFAULT_TIMEOUT);
	});
}

$('#start-throwing').click(function () {
	trowingInside()
		.then(waitASec)
		.catch(function (cause) {
			console.warn(cause);
		});
});

$('#start-rejecting').click(function () {
	rejectingInside()
		.then(waitASec)
		.catch(function (cause) {
			console.warn(cause);
		});
});

$('#start-rejected-promise').click(function () {
	rejectedPromise()
		.then(waitASec)
		.catch(function (cause) {
			console.warn(cause);
		});
});

$('#start-chaining').click(function () {
	rejectedPromise()
		.then(waitASec)
		.catch(function (cause) {
			throw `${cause} but slightly different`;
		})
		.catch(function (cause) {
			console.warn(cause);
		});
});
