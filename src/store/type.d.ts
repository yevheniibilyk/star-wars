import { Hero } from '../types/Hero';

type HeroesPage = {
  [key: stirng]: Array<Hero> | undefined;
}

type Pagination = {
  loading: boolean;
  total: number;
  pages: HeroesPage
}

type AppState = {
  currentHero?: Hero;
  heroLoading: boolean;
  pagination: Pagination
}

type Action = {
  type: string,
  value: any
}

type DispatchType = (args: Action) => Action;
