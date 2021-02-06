const path = require('path');
const express = require('express');
const { isMap } = require('../helpers/type-checking');
const router = express.Router();

const dirRoutes = require('../helpers/dir-routes');

dirRoutes({
  dir: path.resolve(__dirname, '../../api'),
  prefix: '/api'
}).filter(({ ext }) => {
  return ext.toLowerCase() === '.js';
}).forEach(({ file, route }) => {
  /** @type {Map<[string, string], (req: Express.Request, res: Express.Response) => void>} */
  const apiMap = require(path.relative(__dirname, file));
  if (!isMap(apiMap)) {
    console.error(`API controller must export a Map\n${file}`);
    return;
  }
  apiMap.forEach((handler, key) => {
    let method, endpoint;
    if (Array.isArray(key)) {
      method = key[0];
      endpoint = key[1];
    } else {
      method = key;
      endpoint = '';
    }
    let fullRoute = `${route}/${endpoint.replace(/^\/+/, '')}`;
    fullRoute = fullRoute.replace(/\/(?:index)?\/?$/, '');
    console.log(`Mapping API: ${method.toUpperCase()} ${fullRoute}`);
    router[method](fullRoute, handler);
  });
});

module.exports = router;