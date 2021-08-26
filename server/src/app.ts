import express from 'express';
import config from './config';
const { hero, heroes } = require('./api');

const app = express();

app.get('/api/hero/:id', hero);
app.get('/api/heroes', heroes);

app.listen(config.apiPort, () => {
  console.log(`App listening at http://localhost:${config.apiPort}`);
});
