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

const sources = ['fulfilled', 'rejected'];
const middle = ['', '-after-then', '-after-catch', '-after-finally'];
const verify = ['-then', '-catch', '-finally'];

function initialize() {
  function appendAllFailed(prefix) {
    const element = $('#'+prefix);
    if (!element || element.length < 1) {
      console.error(`Error! Cannot find ${prefix}!`);
    }
    verify.forEach(function (testMethod) {
      element.append(generateFailedRow(`${prefix}${testMethod}`));
    });
  }
  sources.forEach(function (source) {
    middle.forEach(function (intermediate) {
      appendAllFailed(`${source}${intermediate}`);
    });
  });
}

function assignAsPassed(id) {
  const element = $(id);
  if (!element || element.length < 1) {
    console.error(`Error! Cannot find ${id}!`);
  }
  element.empty();
  element.append(generatePassedIcon());
}

initialize();

function generateFulfilledPromise() {
  return Promise.resolve();
}

function generateRejectedPromise() {
  return Promise.reject();
}

function switchSource(source) {
  switch(source) {
    case 'fulfilled':
      return generateFulfilledPromise();
    case 'rejected':
      return generateRejectedPromise();
    default:
      throw new Error(`Unknown source: ${source}`);
  }
}

function switchMedium(medium) {
  switch(medium) {
    case '':
      return source => source;
    case '-after-then':
      return source => source.then(() => {});
    case '-after-catch':
      return source => source.catch(() => {});
    case '-after-finally':
      return source => source.finally(() => {});
    default:
      throw new Error(`Unknown medium: ${medium}`);
  }
}

function switchResult(result, elementId) {
  switch(result) {
    case '-then':
      return source => source.then(() => {
        assignAsPassed(elementId);
      });
    case '-catch':
      return source => source.catch(() => {
        assignAsPassed(elementId);
      });
    case '-finally':
      return source => source.finally(() => {
        assignAsPassed(elementId);
      });
    default:
      throw new Error(`Unknown result: ${result}`);
  }
}

function performSpecificExperiment(sourceName, mediumName, resultName) {
  const elementId = `#${sourceName}${mediumName}${resultName}`;
  const source = switchSource(sourceName);
  const medium = switchMedium(mediumName);
  const result = switchResult(resultName, elementId);
  result(medium(source));
}

function performAllExperiments() {
  sources.forEach(function (source) {
    middle.forEach(function (intermediate) {
      verify.forEach(function (testMethod) {
        performSpecificExperiment(source, intermediate, testMethod);
      });
    });
  });
}

performAllExperiments();

//--------------- it should generate something like this: ---------------
/*
generateFulfilledPromise()
  .then(function () {
    assignAsPassed('#fulfilled-then');
  });

generateFulfilledPromise()
  .catch(function () {
    assignAsPassed('#fulfilled-catch');
  });

generateFulfilledPromise()
  .finally(function () {
    assignAsPassed('#fulfilled-finally');
  });

//--------------

generateRejectedPromise()
  .then(function () {
    assignAsPassed('#rejected-then');
  });

generateRejectedPromise()
  .catch(function () {
    assignAsPassed('#rejected-catch');
  });

generateRejectedPromise()
  .finally(function () {
    assignAsPassed('#rejected-finally');
  });

//=========================

generateFulfilledPromise()
  .then(() => {})
  .then(function () {
    assignAsPassed('#fulfilled-after-then-then');
  });

generateFulfilledPromise()
  .then(() => {})
  .catch(function () {
    assignAsPassed('#fulfilled-after-then-catch');
  });

generateFulfilledPromise()
  .then(() => {})
  .finally(function () {
    assignAsPassed('#fulfilled-after-then-finally');
  });

// etc...

  */