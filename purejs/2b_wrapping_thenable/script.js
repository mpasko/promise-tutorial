

const DEFAULT_TIMEOUT = 2000;

function buildThenable(operation) {
	let callback = () => {};
	const thenable = {
		then: function (newCallback) {
			callback = newCallback;
			return thenable;
		}
	};
	operation(value => callback(value));
	return thenable;
}

function clickAction() {
	return buildThenable(function (resolve) {
		$('#start-button').click(function () {
			window.setTimeout(function () {
				resolve('It is alive!');
			}, DEFAULT_TIMEOUT);
		});
	});
}

new Promise(clickAction())
	.then(function (value) {
		alert(value);
	});
