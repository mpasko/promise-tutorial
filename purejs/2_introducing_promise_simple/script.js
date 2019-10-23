
function showDone() {
	$('#done-box').removeClass('hidden');
	$('#done-box').addClass('visible');
}
function waitForStartButtonClick() {
	return new Promise(function (resolve, reject) {
    console.log('Code invoked inside promise constructor');
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
    console.log('Code invoked inside then');
		showDone();
	});
console.log('Code that stands just after');
