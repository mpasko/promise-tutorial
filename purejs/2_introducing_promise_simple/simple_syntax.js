promise = new Promise(function (resolve, reject) {
  try {
    resolve('hello world!');
  } catch(error) {
    reject();
  }
});

promise.then(function (returned) {
  console.log(returned);
});