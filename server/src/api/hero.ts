import axios from 'axios';
import cachedOperation from "./cache";
import { hero } from './cache/models.json';
import { API_URL } from "../constants";

async function heroRequest(id: string | number = 1) {
  const { data } = await axios.get(`${API_URL}/${id}`);

  return data;
}

async function getHero(req: any, res: any) {
  try {
    const heroItem = await cachedOperation(hero, req.params.id, heroRequest);

    return res.send(heroItem);
  } catch (e) {
    return res.status(500).send(e);
  }
}

export default getHero;
