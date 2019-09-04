

const DEFAULT_TIMEOUT = 3000;

async function waitAWhile() {
	return new Promise(function (resolve, reject) {
		window.setTimeout(resolve, DEFAULT_TIMEOUT);
	});
}

$('#start-timeout').click(async function () { //Await is only valid in async functions !!!
	await waitAWhile();
	console.log('time passed!');
});

///----------------------------------------------------

async function returnRandomValue() {
	const randomValue = 2; //Obtained using fair, 6-sided dice cast
	return randomValue;
} //async wraps synchronous execution in a already resolved promise.

$('#start-computation').click(async function () {
	const value = await returnRandomValue();
	console.log('value is: ' + value);
});

///----------------------------------------------------

async function longComputation() {
	/*   *x/
	await waitAWhile();
	/*   */
	window.alert('long long synchronous operation...');
	/*   */
	return 5;
}

$('#start-long-computation').click(async function () {
	const value = await longComputation();
	console.log('value is: ' + value);
});
