const DEFAULT_TIMEOUT = 2000

angular.module('promises.tutorial', []);

angular.module('promises.tutorial').service('phantomService', function ($timeout, $q) {
	
	function trowingString() {
		return $q(function (resolve, reject) {
			throw 'sth is wrong'; //Good practice is to wrap it inside new Error class!
		});
	}

	function trowingError() {
		return $q(function (resolve, reject) {
			throw new Error('sth is wrong');
		});
	}

	function rejecting() {
		return $q.reject('sth is wrong');
	}
	
	function resolvedPromise() {
		return $q.resolve('OK!');
	}

	function waitASec(parameter) {
		console.log('Waiting...');
		return $q(function(resolve) {
			window.setTimeout(function () {
				resolve(parameter);
			}, DEFAULT_TIMEOUT);
		});
	}
		
	function selectSource(selected) {
		switch(selected) {
			case 'throw-string':
				return trowingString();
			case 'throw-error':
				return trowingError();
			case 'reject':
				return rejecting();
			default:
				return resolvedPromise();
		}
	}
	return {
		selectSource,
		waitASec
	};
});

angular.module('promises.tutorial').controller('PhantomController',
	function($scope, $q, phantomService) {
		$scope.sources = ['throw-string', 'throw-error', 'reject', 'resolve'];
		$scope.source = $scope.sources[0];
		
		$scope.tryBlock = function () {
			try {
				phantomService.selectSource($scope.source)
					.then(function (result) {
						console.log(`try, inside then: ${result}`);
					});
			} catch (error) {
				console.warn(`caught: ${error}`);
			}
		};
		
		$scope.promiseCatch = function () {
			phantomService.selectSource($scope.source)
				.then(phantomService.waitASec)
				.catch(function (cause) {
					console.warn(`caught: ${cause}`);
					return 'overwritten result';
				})
				.then(function (result) {
					console.log(`after catch: ${result}`);
				});
		};
		
		$scope.promiseFinally = function () {
			phantomService.selectSource($scope.source)
				.then(phantomService.waitASec)
				.finally(function (cause) {
					console.log(`inside finally: ${cause}`);
					return 'overwritten result in finally';
				})
				.then(function (result) {
					console.log(`after finally: ${result}`);
				});
		};
	}
);
