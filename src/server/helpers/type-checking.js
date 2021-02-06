/**
 * @return {boolean}
 */
function isMap(obj) {
  return typeof obj['get'] === 'function' &&
    typeof obj['set'] === 'function' &&
    typeof obj['has'] === 'function' &&
    typeof obj['get'] === 'function' &&
    typeof obj['entries'] === 'function' &&
    typeof obj['forEach'] === 'function';
}

module.exports = { isMap };