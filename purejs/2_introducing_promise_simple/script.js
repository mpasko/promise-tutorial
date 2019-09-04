
function showDone() {
	$('#done-box').removeClass('hidden');
	$('#done-box').addClass('visible');
}

function waitForStartButtonClick() {
	return new Promise(function (resolve, reject) {
		try {
			$('#start-button').click(function () {
				resolve();
			});
		} catch (error) {
			reject();
		} 
	});
}

waitForStartButtonClick()
	.then(function () {
		showDone();
	});
console.log('Code that stands just after');
