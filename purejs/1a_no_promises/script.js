
function showContinue() {
	$('#continue-box').removeClass('hidden');
	$('#continue-box').addClass('visible');
}

const DEFAULT_TIMEOUT = 2000;

$('#start-button').click(function () {
	window.setTimeout(function () {
		showContinue();
		$('#continue-button').click(function () {
			window.setTimeout(function () {
				const value = $('#input').val();
				alert(value);
			}, DEFAULT_TIMEOUT);
		});
	}, DEFAULT_TIMEOUT);
});
