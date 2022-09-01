export interface IObjectContainer {
  get<T>(type: symbol, name?: string): () => T;
}

export type ObjectCreator<T> = () => T;

export interface IObjectContainerRegister {
  register<T>(type: symbol, creator: ObjectCreator<T>, name?: string): void;
  registerSingleton<T>(type: symbol, creator: ObjectCreator<T>, name?: string): void;
}
