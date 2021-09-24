import NodeCache from 'node-cache';
import { ICacheModel } from './interfaces';

const FIVE_MIN = 5 * 60;

export default class NodeCacheModel implements ICacheModel {
  model: any;

  constructor() {
    this.model = new NodeCache( { stdTTL: FIVE_MIN } );
  }

  get<T>(key: T) {
    return this.model.get(key);
  }

  set<T>(key: T, value: any) {
    return this.model.set(key, value);
  }
}