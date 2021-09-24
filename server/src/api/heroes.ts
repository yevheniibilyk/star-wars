import axios from 'axios';
import { API_URL } from '../constants';
import { Cache, JsCacheModel } from './cache';

const HeroCacheModel = new JsCacheModel();
const HeroesCache = new Cache(HeroCacheModel, 'heroes-page');

async function heroesRequest(page: string | number = 1) {
  const { data } = await axios.get(`${API_URL}/?page=${page}`);

  return data;
}

async function getHeroes(req: any, res: any, next: any) {
  try {
    const { page = 1 } = req.query;

    const heroes = await HeroesCache.cachedOperation(page, heroesRequest);

    return res.send(heroes);
  } catch (e) {
    return next(e);
  }
}

export default getHeroes;
