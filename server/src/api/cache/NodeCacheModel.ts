import NodeCache from 'node-cache';
import { CacheModelInterface } from './CacheModelInterface';

const FIVE_MIN = 5 * 60;

export default class NodeCacheModel implements CacheModelInterface {
  model: any;

  constructor() {
    this.model = new NodeCache( { stdTTL: FIVE_MIN } );
  }

  get(key: string) {
    return this.model.get(key);
  }

  set(key: string, value: any) {
    return this.model.set(key, value);
  }
}