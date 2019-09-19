

const DEFAULT_TIMEOUT = 2000;

const promise = new Promise(function (resolve) {
	$('#start-button').click(function () {
		window.setTimeout(function () {
			resolve('It works!');
		}, DEFAULT_TIMEOUT);
	});
});

rxjs.from(promise)
	.subscribe(function (value) {
		console.log(value);
	});
