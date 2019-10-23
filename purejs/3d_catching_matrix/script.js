function generateFailedIcon() {
  return `<i class="failed">X</i>`;
}

function generatePassedIcon() {
  return `<i class="passed">V</i>`;
}

function generateFailedRow(id) {
  return `<td id=${id}>${generateFailedIcon()}</td>`;
}

function generatePassedRow(id) {
  return `<td id=${id}>${generatePassedIcon()}</td>`;
}

function initialize() {
  function appendAllFailed(prefix) {
    const element = $('#'+prefix);
    element.append(generateFailedRow(`${prefix}-then`))
    element.append(generateFailedRow(`${prefix}-catch`))
    element.append(generateFailedRow(`${prefix}-finally`));
  }
  appendAllFailed('fulfilled');
  appendAllFailed('rejected');
}

function assignAsPassed(id) {
  $(id).empty().append(generatePassedIcon());
}

initialize();

function generateFulfilledPromise() {
  return Promise.resolve();
}

function generateRejectedPromise() {
  return Promise.reject();
}

//--------------- it starts here: ---------------

generateFulfilledPromise()
  .then(function () {
    assignAsPassed('#fulfilled-then');
  })
  .catch(function () {
    assignAsPassed('#fulfilled-catch');
  })
  .finally(function () {
    assignAsPassed('#fulfilled-finally');
  });

generateRejectedPromise()
  .then(function () {
    assignAsPassed('#rejected-then');
  })
  .catch(function () {
    assignAsPassed('#rejected-catch');
  })
  .finally(function () {
    assignAsPassed('#rejected-finally');
  });