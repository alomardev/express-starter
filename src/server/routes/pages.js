const fs = require('fs');
const path = require('path');
const vash = require('vash');
const express = require('express');
const router = express.Router();

const dirRoutes = require('../helpers/dir-routes');

const root = path.resolve(__dirname, '../../pages');

dirRoutes({
  dir: root,
  prefix: '/',
}).filter(({ basename, ext }) => {
  return !basename.startsWith('_') && ['.vash', '.html'].includes(ext.toLowerCase());
}).map(({ route, ...props }) => {
  route = route.replace(/\/index\/?$/, '').replace(/^\s*$/, '/');
  return { ...props, route };
}).forEach(({ file, route, basename, ext }) => {
  if (ext === '.vash') {
    let controller;
    const controllerPath = path.resolve(path.dirname(file), basename.replace(/\.vash$/, '.js'));
    if (fs.existsSync(controllerPath)) {
      const module = require(controllerPath);
      if (typeof module !== 'function') {
        console.error(`Vash controller must export a function\n${controllerPath}`);
      } else {
        controller = module;
      }
    }
    const viewPath = getCorrectViewPath(basename, route);
    router.get(route, (req, res) => {
      res.type('html');
      const model = controller ? controller(req) : null;
      res.render(viewPath, model);
    });
    console.log(`Mapping (vash): ${route} => ${path.relative(root, file)}`);
  } else if (ext === '.html') {
    router.get(route, (_, res) => res.sendFile(file));
    console.log(`Mapping (html): ${route} => ${path.relative(root, file)}`);
  }
});

function getCorrectViewPath(basename, route) {
  let viewPath = basename === 'index.vash' ? `${route}index` : route;
  return viewPath.startsWith('/') ? viewPath.replace(/^\//, '') : viewPath;
}

module.exports = router;
