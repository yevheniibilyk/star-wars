import express from 'express';
import cors from 'cors';
import config from './config';
import { hero, heroes } from './api';

const app = express();

app.use(cors());

app.get('/api/hero/:id', hero);
app.get('/api/heroes', heroes);

// catch 404 and forward to error handler
app.use((req: any, res: any) => {
  res.status(404).send('Not Found');
});

app.use((err: Error, req: any, res: any) => {
  res.status(500);
  res.json({
    errors: {
      message: err.message
    }
  });
});

app.listen(config.apiPort, () => {
  console.log(`App listening at http://localhost:${config.apiPort}`);
});
