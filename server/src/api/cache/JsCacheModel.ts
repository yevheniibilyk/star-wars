import { ICacheModel } from './interfaces';

export default class JsCacheModel implements ICacheModel {
  model: any;

  constructor() {
    this.model = new Map();
  }

  get<T>(key: T) {
    return this.model.get(key);
  }

  set<T>(key: T, value: any) {
    return this.model.set(key, value);
  }
}