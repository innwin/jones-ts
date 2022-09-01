import {IObjectContainer} from "./container/objectContainer";

export class Ioc {
  private static container: IObjectContainer;

  static setContainer(container: IObjectContainer): void {
    this.container = container;
  }

  static get<T>(type: symbol, name?: string): () => T {
    return this.container.get<T>(type, name);
  }
}
