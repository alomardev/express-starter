const fs = require('fs');
const path = require('path');

/**
 * @param {{ dir: string, prefix: string }} options 
 * @return {({ file: string, route: string, basename: string, ext: string })[]}
 */
function dirRoutes(options) {
  let { dir, prefix, _parent, _result } = options;
  prefix = prefix?.trim() ? prefix.trim().replace(/\/*$/, '/') : '';
  _result = _result ?? [];
  _parent = _parent ?? prefix;
  fs.readdirSync(dir).forEach(item => {
    const file = path.resolve(dir, item);
    const ext = path.extname(item);
    const current = path.basename(item, ext);
    const route = `${_parent}${current}`;
    if (fs.lstatSync(file).isDirectory()) {
      dirRoutes({...options, dir: file, _parent: `${route}/`, _result });
      return;
    }
    _result.push({ file, route, ext, basename: path.basename(item) });
  });
  return _result;
}

module.exports = dirRoutes;
