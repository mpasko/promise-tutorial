
angular.module('promises.tutorial', []);

var deferred; //Putting here to be playable from console. Enjoy! ;)

angular.module('promises.tutorial').controller('PhantomController', function($scope, $q) {
  
  $scope.value = '';
  
  $scope.start = function () {
    $scope.value = '';
    deferred = $q.defer();
    $scope.currentDeferred = deferred;
    const promise = deferred.promise;
    promise.then(newValue => $scope.value = newValue)
      .catch(error => alert(error));
  };

  $scope.resolve = function () {
    deferred.resolve('something');
    delete $scope.currentDeferred;
  };

  $scope.reject = function () {
    deferred.reject('error!');
    delete $scope.currentDeferred;
  };
});
