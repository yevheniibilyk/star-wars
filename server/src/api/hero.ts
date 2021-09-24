import axios from 'axios';
import { API_URL } from '../constants';
import { Cache, NodeCacheModel } from './cache';

const HeroCacheModel = new NodeCacheModel();
const HeroCache = new Cache(HeroCacheModel, 'hero');

async function heroRequest(id: string | number = 1) {
  const { data } = await axios.get(`${API_URL}/${id}`);

  return data;
}

async function getHero(req: any, res: any) {
  try {
    const heroItem = await HeroCache.cachedOperation(req.params.id, heroRequest);

    return res.send(heroItem);
  } catch (e) {
    return res.status(404).send(e.message);
  }
}

export default getHero;
