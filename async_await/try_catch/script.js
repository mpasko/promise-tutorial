const DEFAULT_TIMEOUT = 2000;

async function waitAWhile() {
	return new Promise(function (resolve, reject) {
		window.setTimeout(resolve, DEFAULT_TIMEOUT);
	});
}

async function longComputation() {
	await waitAWhile();
  
  throw new Error('Something wrong happened!');
}

$('#start-timeout').click(async function () {
  try {
    const value = await longComputation();
  } catch (error) {
    console.warn(error);
  }
});
