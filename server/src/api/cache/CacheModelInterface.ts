export interface CacheModelInterface {
  get(key: string): any;
  set(key: string, value: any): any;
}
