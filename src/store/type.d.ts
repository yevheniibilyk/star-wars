import { Hero } from '../types/Hero';

type AppState = {
  currentHero?: Hero;
  heroLoading: boolean;
}

type Action = {
  type: string,
  value: any
}

type DispatchType = (args: Action) => Action;
