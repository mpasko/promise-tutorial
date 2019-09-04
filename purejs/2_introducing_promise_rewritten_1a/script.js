
function showContinue() {
	$('#continue-box').removeClass('hidden');
	$('#continue-box').addClass('visible');
}

const DEFAULT_TIMEOUT = 2000;

function listenOnStartButton() {
	return new Promise(function (resolve) {
		$('#start-button').click(function () {
			resolve();
		});
	});
}

function waitASec() {
	return new Promise(function(resolve) {
		//Notice: no async here!
		window.setTimeout(function () {
			resolve();
		}, DEFAULT_TIMEOUT);
	});
}

function listenOnContinueButton() {
	return new Promise(function (resolve) {
		$('#continue-button').click(function () {
			const value = $('#input').val();
			/*  */
			resolve(value);
			/*  *x/
			resolve();
			return value;
			/*  */
		});
	});
}

listenOnStartButton()
	.then(function () {
		/* */return/* */ waitASec(); //Common error is to forget the return keyword!
	})
	.then(function () {
		showContinue();
		return listenOnContinueButton();
	})
	.then(function (value) {
		return waitASec()
			.then(() => value); //To pass value next
	})
	.then(function (value) {
		alert(value);
	});
