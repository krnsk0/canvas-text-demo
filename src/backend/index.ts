import express from 'express';
import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';
import path from 'path';
const config = require('../../webpack.config.js');

const PORT = 7777;

const app = express();

const compiler = webpack(config);

app.use(middleware(compiler, {}));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html')),
);

app.get('/style.css', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'frontend', 'styles.css')),
);

app.listen(PORT, () => {
  console.log(`started on ${PORT}`);
});
