export abstract class EmptyState {
  message?: string | null;

  constructor(message?: string | null) {
    this.message = message;
  }

  isEmptyLoading(): this is EmptyLoading {
    return this instanceof EmptyLoading;
  }

  isEmpty(): this is Empty {
    return this instanceof Empty;
  }

  isEmptyFailure(): this is EmptyFailure {
    return this instanceof EmptyFailure;
  }

  isHasContent(): this is HasContent {
    return this instanceof HasContent;
  }

  static EmptyLoading(message?: string | null) {
    return new EmptyLoading(message);
  }

  static Empty(message?: string | null) {
    return new Empty(message);
  }

  static EmptyFailure(message?: string | null) {
    return new EmptyFailure(message);
  }

  static HasContent(message?: string | null) {
    return new HasContent(message);
  }
}

export class EmptyLoading extends EmptyState {}

export class Empty extends EmptyState {}

export class EmptyFailure extends EmptyState {}

export class HasContent extends EmptyState {}

// export type EmptyState = EmptyLoading | Empty | EmptyFailure | HasContent;
