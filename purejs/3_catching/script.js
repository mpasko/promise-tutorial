
function showContinue() {
	$('#continue-box').removeClass('hidden');
	$('#continue-box').addClass('visible');
}

function hideContinue() {
	$('#continue-box').addClass('hidden');
	$('#continue-box').removeClass('visible');
}

const DEFAULT_TIMEOUT = 2000;

function listenOnStartButton() {
	return new Promise(function (resolve, reject) {
		$('#start-button').click(function () {
			/*  *x/
			throw "error cause";
			/*  */
			resolve();
		});
	}).then(function () {
		/*  *x/
		throw "second error cause";
		/*  */
		return waitASec();
	});
}

function waitASec() {
	return new Promise(function(resolve) {
		window.setTimeout(function () {
			resolve();
		}, DEFAULT_TIMEOUT);
	});
}

function listenOnContinueButton() {
	return new Promise(function (resolve) {
		$('#continue-button').click(function () {
			const value = $('#input').val();
			resolve(value);
		});
	});
}

listenOnStartButton()
// waitASec moved inside listenOnStartButton
	.then(function () {
		showContinue();
		/*  */
		throw "error another cause";
		/*  */
		return listenOnContinueButton();
	})
	.then(function (value) {
		return waitASec()
			.then(() => value);
	})
	.then(function (value) {
		alert(value);
	})
	.catch(function (cause) {
		alert(cause);
	})
	.finally(function () {
		//finnaly wil be invoked always
		hideContinue();
	});
