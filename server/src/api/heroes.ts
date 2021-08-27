import axios from 'axios';
import cachedOperation from './cache';
import { heroesPage } from './cache/models.json';
import { API_URL } from '../constants';

async function heroesRequest(page: string | number = 1) {
  const { data } = await axios.get(`${API_URL}/?page=${page}`);

  return data;
}

async function getHeroes(req: any, res: any, next: any) {
  try {
    const { page = 1 } = req.query;

    const heroes = await cachedOperation(heroesPage, page, heroesRequest);

    return res.send(heroes);
  } catch (e) {
    return next(e);
  }
}

export default getHeroes;
