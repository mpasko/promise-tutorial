
angular.module('promises.tutorial', []);

angular.module('promises.tutorial').service('phantomService', function ($timeout, $q) {
	return {
	};
});

angular.module('promises.tutorial').controller('PhantomController', function($scope, $q, phantomService) {
	$scope.name = 'Plunker';
});
