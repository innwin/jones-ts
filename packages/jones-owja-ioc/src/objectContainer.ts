import {Container, createResolve} from "@owja/ioc";
import {IObjectContainer, IObjectContainerRegister, ObjectCreator} from "@jonests/core";

export const iocContainer = new Container();

export class ObjectContainer implements IObjectContainer {

  resolve: <T = never>(type: symbol, ...args: symbol[]) => () => T;
  constructor(container: Container) {
    this.resolve = createResolve(container);
  }

  get<T>(type: symbol, _?: string): () => T {
    return this.resolve<T>(type);
  }
}

export class ObjectContainerRegister implements IObjectContainerRegister {

  container: Container;
  constructor(container: Container) {
    this.container = container;
  }

  register<T>(type: symbol, creator: ObjectCreator<T>, _?: string): void {
    this.container.bind<T>(type).toFactory(creator);
  }

  registerSingleton<T>(type: symbol, creator: ObjectCreator<T>, _?: string): void {
    this.container.bind<T>(type).toFactory(creator).inSingletonScope();
  }
}
