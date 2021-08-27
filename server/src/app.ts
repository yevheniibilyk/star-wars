import express from 'express';
import cors from 'cors';
import config from './config';
import { hero, heroes } from './api';

const app = express();

app.use(cors());

app.get('/api/hero/:id', hero);
app.get('/api/heroes', heroes);

app.listen(config.apiPort, () => {
  console.log(`App listening at http://localhost:${config.apiPort}`);
});
