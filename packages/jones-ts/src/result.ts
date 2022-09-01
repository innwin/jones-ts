import {ResultNullError} from "./errors";

export abstract class Result<T = any | undefined> {

  message?: string | null;

  protected constructor(message?: string | null) {
    this.message = message;
  }

  isSuccess(): this is Success<T> {
    return this instanceof Success;
  }

  isFailure(): this is Failure<T> {
    return this instanceof Failure;
  }

  dataOrNull(): T | null {
    return this.isSuccess() ? this.data : null;
  }

  static async from<T>(runner: () => Promise<T>): Promise<Result<T>> {
    try {
      const data = await runner();
      if (!data) {
        return Result.failure(null, new ResultNullError());
      }
      return Result.success(data);
    } catch (e) {
      console.error(e);
      return Result.failure(null, e);
    }
  }

  static success<T>(data: T, message?: string | null) {
    return new Success<T>(data, message);
  }

  static successVoid(message?: string | null) {
    return new Success(undefined, message);
  }

  static failure<T>(message?: string | null, error?: any) {
    return new Failure<T>(message, error);
  }
}

export class Success<T> extends Result<T> {

  data: T;

  constructor(data: T, message?: string | null) {
    super(message);
    this.data = data;
  }
}

export class Failure<T> extends Result<T> {

  private readonly _error?: any;

  constructor(message?: string | null, error?: any) {
    super(message);
    this._error = error;
  }

  get error(): Error | null {
    return this._error || null;
  }
}
