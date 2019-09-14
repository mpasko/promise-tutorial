
angular.module('promises.tutorial', []);

angular.module('promises.tutorial').service('phantomService', function ($timeout, $q) {
	const DEFAULT_TIMEOUT = 3000;
	
	function unwrap(promise) {
		const data = { value: '' };
		if(promise.then !== undefined) {
			promise.then(result => data.value = result);
		} else {
			data.value = promise;
		}
		return data;
	}
	
	function generateData(checked) {
		if (checked) {
			return $timeout(() => 'Is OK!', DEFAULT_TIMEOUT);
		} else {
			return 'oh! shit! whadupp!';
		}
	}
	
	return {
		unwrap,
		generateData
	};
});

angular.module('promises.tutorial').controller('PhantomController', function($scope, $q, phantomService) {
	
	$scope.checkboxModel = true;
	
	$scope.recalculateName = function () {
		$scope.name = phantomService.unwrap(phantomService.generateData($scope.checkboxModel));
	};
	
	$scope.recalculateName();
	
	$scope.otherReuse = function () {
		phantomService.generateData($scope.checkboxModel)
			.then(function (result) {
				console.log(`Expected result: ${result}`);
			});
	};
});
