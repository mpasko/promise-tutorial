
angular.module('promises.tutorial', []);

angular.module('promises.tutorial').service('phantomService', function ($timeout, $q) {
	function generateArrayOfPromises() {
		const promises = [
			$timeout(() => 2000, 2000),
			$timeout(() => 1000, 1000),
			$timeout(() => 3000, 3000)
		];
		return promises;
	}
	
	function generateFirstFailing() {
		const array = generateArrayOfPromises()
		array.push($timeout(() => 500, 500).then(() => $q.reject(500)),);
		return array;
	}
	
	function generateMiddleFailing() {
		const array = generateArrayOfPromises()
		array.push($timeout(() => 1500, 1500).then(() => $q.reject(1500)),);
		return array;
	}
	
	return {
		raceMiddleFail: function () {
			return $q.race(generateMiddleFailing());
		},
		allSuccess: function () {
			return $q.all(generateArrayOfPromises());
		},
		raceFirstFail: function () {
			return $q.race(generateFirstFailing());
		},
		allMiddleFail: function () {
			return $q.all(generateMiddleFailing());
		}
	};
});

angular.module('promises.tutorial').controller('PhantomController', function($scope, $q, phantomService) {
	$scope.raceMiddleFail = '';
	$scope.allSuccess = [];
	
	phantomService.raceMiddleFail()
		.then(function (value) {
			$scope.raceMiddleFail = value;
		});
	
	phantomService.allSuccess()
		.then(function (values) {
			$scope.allSuccess = values;
		});
	
	phantomService.raceFirstFail()
		.catch(function (error) {
			console.warn('caught in raceFirstFail');
		});
	
	phantomService.allMiddleFail()
		.catch(function (error) {
			console.warn('caught in allMiddleFail');
		});
});
