import { CacheModelInterface } from './CacheModelInterface';

export default class JsCacheModel implements CacheModelInterface {
  model: any;

  constructor() {
    this.model = new Map();
  }

  get(key: string) {
    return this.model.get(key);
  }

  set(key: string, value: any) {
    return this.model.set(key, value);
  }
}