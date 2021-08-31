import { axios } from '../utils';

export async function fetchHero(id: string) {
  const { data: hero }: any = await axios.get(`/hero/${id}`);

  return hero;
}
