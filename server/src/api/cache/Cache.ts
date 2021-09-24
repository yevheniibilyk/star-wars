import { ICacheModel } from './interfaces';

export default class Cache {
  private cacheModel: ICacheModel;

  private readonly keyPrefix: string;

  constructor(cacheModel: ICacheModel, keyPrefix: string) {
    this.cacheModel = cacheModel;

    this.keyPrefix = keyPrefix;
  }

  private buildKey(key: string) {
    return `${this.keyPrefix}-${key}`;
  }

  get(key: string) {
    return this.cacheModel.get(this.buildKey(key));
  }

  set(key: string, value: any) {
    return this.cacheModel.set(this.buildKey(key), value);
  }

  public async cachedOperation(
    key: number | string,
    fallback: (arg: string | number) => Promise<any>
  ) {
    const cachedResult = this.cacheModel.get(key);

    if (cachedResult) {
      return cachedResult;
    }

    const result = await fallback(key);

    this.cacheModel.set(key, result);

    return result;
  }
}