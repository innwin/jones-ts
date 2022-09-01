// https://harttle.land/2019/03/05/typescript-extend-error.html

export class ResultNullError extends Error {
  constructor(message?: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ResultNullError.prototype);
  }
}
