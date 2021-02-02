import express from 'express';
import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';
import path from 'path';
import morgan from 'morgan';
import { handleFetch } from './handleFetch';

const config = require('../../webpack.config.js');
const sharedConfig = require('../../webpack.config.shared.js');

const PORT = 7777;

const app = express();

app.use(morgan('tiny'));

app.use(express.json());

const compiler = webpack(config);
app.use(middleware(compiler, {}));

const sharedCompiler = webpack(sharedConfig);
app.use(middleware(sharedCompiler, {}));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html')),
);

app.get('/style.css', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'frontend', 'styles.css')),
);

app.post('/image', handleFetch);

app.listen(PORT, () => {
  console.log(`started on ${PORT}`);
});
