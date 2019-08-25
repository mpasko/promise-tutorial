
angular.module('promises.tutorial', []);

angular.module('promises.tutorial').config(function ($parseProvider) {
	//$parseProvider.unwrapPromises(true); //deprecated 
});

angular.module('promises.tutorial').service('phantomService', function ($timeout, $q) {
	function phantomMethod () {
		return $timeout(function () {
			return 'some value';
		}, 200);
	}
	function badMethod () {
		return new Promise (function (resolve, reject) {
			window.setTimeout(function () {
				resolve('some value2');
			}, 2000);
		});
	}
	function otherMethod () {
		return $q(function (resolve, reject) {
			window.setTimeout(function () {
				resolve('some value3');
			}, 4000);
		});
	}
	return {
		phantomMethod,
		badMethod,
		otherMethod
	};
});

angular.module('promises.tutorial').controller('PhantomController', function($scope, $q, phantomService) {
	$scope.customValue = '';
	$scope.customValue2 = '';
	$scope.customValue3 = '';
	
	phantomService.phantomMethod()
		.then(function (newValue) {
			$scope.customValue = newValue;
		});
		
	phantomService.badMethod()
		.then(function (newValue) {
			$scope.customValue2 = newValue;
			console.log('bad promise resolved!');
			//$scope.$apply();
		});
		
	phantomService.otherMethod()
		.then(function (newValue) {
			$scope.customValue3 = newValue;
			console.log('third promise resolved!');
			$scope.$apply();
		});
	
});
