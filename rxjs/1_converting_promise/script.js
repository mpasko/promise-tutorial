

const DEFAULT_TIMEOUT = 2000;

const promise = new Promise(function (resolve, reject) {
	try {
	$('#start-button').click(function () {
		window.setTimeout(function () {
			resolve();
		}, DEFAULT_TIMEOUT);
	});
	} catch (error) {
		reject(error);
	}
});

rxjs.from(promise)
	.subscribe(function () {
		console.log('It works!');
	});
