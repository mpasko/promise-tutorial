
angular.module('promises.tutorial', []);

angular.module('promises.tutorial').service('phantomService', function ($timeout, $q) {
	function generateArrayOfPromises () {
		const promises = [
			$timeout(() => 2000, 2000),
			$timeout(() => 1000, 1000),
			$timeout(() => 3000, 3000)
		];
		return promises;
	}
	
	return {
		race: function () {
			return $q.race(generateArrayOfPromises());
		},
		all: function () {
			return $q.all(generateArrayOfPromises());
		}
	};
});

angular.module('promises.tutorial').controller('PhantomController', function($scope, $q, phantomService) {
	$scope.race = '';
	$scope.allValues = [];
	phantomService.race()
		.then(function (value) {
			$scope.race = value;
		});
	phantomService.all()
		.then(function (values) {
			$scope.allValues = values;
		});
});
