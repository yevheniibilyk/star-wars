import { axios } from '../utils';
import { Hero } from '../types/Hero';
import getHeroIdFromUrl from '../components/HeroesList/utils/getHeroIdFromUrl';

export async function fetchHero(id: string): Promise<Hero> {
  const { data: hero }: any = await axios.get(`/hero/${id}`);

  return hero;
}

export async function fetchHeroesPage(
  page: number
): Promise<{ total: number; heroes: Array<Hero> }> {
  const { data: { count, results = [] } }: any = await axios.get(`/heroes?page=${page}`);
  
  return {
    total: count,
    heroes: results.map((item: Hero) => ({
      ...item,
      id: getHeroIdFromUrl(item.url)
    }))
  };
}
