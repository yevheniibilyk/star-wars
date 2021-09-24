export interface ICacheModel {
  get<T>(key: T): any;
  set<T>(key: T, value: any): any;
}
