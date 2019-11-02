const promise = Promise.reject('error!');

promise.then(function() {}, function (code) {
  console.error(code);
});