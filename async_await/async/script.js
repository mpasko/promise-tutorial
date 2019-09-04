

const DEFAULT_TIMEOUT = 1000;

async function waitASecond() {
	return new Promise(function (resolve, reject) {
		window.setTimeout(resolve, DEFAULT_TIMEOUT);
	});
}

$('#start-timeout').click(function () {
	waitASecond()
		.then(function () {
			console.log('time passed!');
		});
	console.log('Time not passed yet!');
});

///-------------------------------------------------

async function returnRandomValue() {
	const randomValue = 2; //Obtained using fair, 6-sided dice cast
	return randomValue;
} //async wraps synchronous execution in a already resolved promise.

$('#start-computation').click(function () {
	returnRandomValue()
		.then(function (value) {
			console.log('value is: ' + value);
		});
});
