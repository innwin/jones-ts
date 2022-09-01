export interface IStorage {
  get<T>(key: string,): T;
  set<T>(key: string, data: T): void;
  remove(key: string): void;
  clear(): void;
}
