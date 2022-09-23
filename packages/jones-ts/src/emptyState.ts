export const EmptyStateEmptyLoading: string = "empty-state-EmptyLoading";
export const EmptyStateEmpty: string = "empty-state-Empty";
export const EmptyStateEmptyFailure: string = "empty-state-empty-failure";
export const EmptyStateHasContent: string = "empty-state-has-content";

abstract class IEmptyState {

  abstract kind: string;
  message?: string | null;

  constructor(message?: string | null) {
    this.message = message;
  }

  isEmptyLoading(): this is EmptyLoading {
    return this.kind === EmptyStateEmptyLoading;
  }

  isEmpty(): this is Empty {
    return this.kind === EmptyStateEmpty;
  }

  isEmptyFailure(): this is EmptyFailure {
    return this.kind === EmptyStateEmptyFailure;
  }

  isHasContent(): this is HasContent {
    return this.kind === EmptyStateHasContent;
  }
}

export class EmptyLoading extends IEmptyState {
  kind = EmptyStateEmptyLoading;

  static create(message?: string | null) {
    return new EmptyLoading(message);
  }
}

export class Empty extends IEmptyState {
  kind = EmptyStateEmpty;

  static create(message?: string | null) {
    return new Empty(message);
  }
}

export class EmptyFailure extends IEmptyState {
  kind = EmptyStateEmptyFailure;

  static create(message?: string | null) {
    return new EmptyFailure(message);
  }
}

export class HasContent extends IEmptyState {
  kind = EmptyStateHasContent;

  static create(message?: string | null) {
    return new HasContent(message);
  }
}

export type EmptyState = EmptyLoading | Empty | EmptyFailure | HasContent;
