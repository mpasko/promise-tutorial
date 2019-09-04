

const DEFAULT_TIMEOUT = 1000;

function listenTo(id, value) {
	const promise = new Promise(function (resolve, reject) {
		try {
			$(id).click(function () {
				window.setTimeout(function () {
					resolve(value);
				}, DEFAULT_TIMEOUT);
			});
		} catch (error) {
			reject(error);
		}
	});
	return promise;
}

const promises = [
	listenTo('#button1', 1),
	listenTo('#button2', 2),
	listenTo('#button3', 3),
];

rxjs.from(promises)
	.pipe(
		rxjs.operators.flatMap(promise => rxjs.from(promise))
		//,rxjs.operators.bufferCount(promises.length)
	)
	.subscribe(function (value) {
		console.log('It works! ', value);
	});
