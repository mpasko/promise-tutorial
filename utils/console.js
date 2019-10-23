window.attachConsoleTo = function (id) {
  const containerElement = jQuery(id);
  containerElement.addClass('console-container');
  containerElement.append(renderConsole());
  jQuery('#clear-console').on('click', clear);
};

function renderConsole() {
  return `<div id="console" class="console">${renderClearButton()}</div>`;
}

function renderClearButton() {
  return `<button id="clear-console" class="clear-btn">clear</button>`;
}

function clear() {
  const consoleElement = jQuery("#console");
  consoleElement.empty();
  consoleElement.append(renderClearButton());
  jQuery('#clear-console').on('click', clear);
}

function appendLog(text, level) {
  const timestamp = new Date().toGMTString();
  const logElement = jQuery(`<span class="log date-log">${timestamp} [${level}]</span><span class="log ${level}-log">${text}</span><br/>`);
  const consoleElement = jQuery("#console");
  consoleElement.append(logElement);
  consoleElement.scrollTop(consoleElement[0].scrollHeight);
}

console.log = function (text) {
  appendLog(text, "normal");
};

console.warn = function (text) {
  appendLog(text, "warn");
};

console.error = function (text) {
  appendLog(text, "error");
};

console.info = function (text) {
  appendLog(text, "info");
};

console.debug = function (text) {
  appendLog(text, "debug");
};

window.attachConsoleTo("body");