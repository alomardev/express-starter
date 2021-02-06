const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.set('views', path.resolve(__dirname, '../pages'));
app.set('view engine', 'vash');

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(require('./routes/pages.js'));
app.use(require('./routes/api.js'));
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});