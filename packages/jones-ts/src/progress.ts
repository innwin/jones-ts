import {Result} from "./result";

export abstract class Progress<T> {

  isInProgress(): this is InProgress<T> {
    return this instanceof InProgress;
  }

  isComplete(): this is Complete<T> {
    return this instanceof Complete;
  }

  resultOrNull(): T | null {
    return (this.isComplete() ? this.result : null) || null;
  }

  static contentOrNull<T>(progress: Progress<Result<T>>): T | null {
    const result = progress.resultOrNull();
    return result?.dataOrNull() || null;
  }

  static InProgress<T>() {
    return new InProgress<T>();
  }

  static Complete<T>(result?: T) {
    return new Complete<T>(result);
  }
}

export class InProgress<T> extends Progress<T> {}

export class Complete<T> extends Progress<T> {

  result?: T | null;

  constructor(result?: T) {
    super();
    this.result = result || null;
  }
}

// export type Progress<T> = InProgress<T> | Complete<T>;
