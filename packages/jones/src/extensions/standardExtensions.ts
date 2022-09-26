// https://github.com/TheDavidDelta/scope-extensions-js/blob/master/src/index.ts

export {};

declare global {
  interface Number {
    /**
     * Calls the specified function block with `this` value as its argument and returns its result
     * @param block - The function to be executed with `this` as argument
     * @returns `block`'s result
     */
    let<R>(this: Number, block: (it: number) => R): R;
    /**
     * Calls the specified function block with `this` value as its argument and returns `this` value
     * @param block - The function to be executed with `this` as argument
     * @returns `this`
     */
    also(this: Number, block: (it: number) => void): number;
    /**
     * Calls the specified function block with `this` value as its receiver and returns its value
     * @param block - The function to be executed with `this` as context
     * @returns `block`'s result
     */
    run<R>(this: Number, block: (this: number) => R): R;
    /**
     * Calls the specified function block with `this` value as its receiver and returns `this` value
     * @param block - The function to be executed with `this` as context
     * @returns `this`
     */
    apply(this: Number, block: (this: number) => void): number;
    /**
     * Returns `this` value if it satisfies the given predicate or `undefined` if it doesn't
     * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
     * @returns `this` or `undefined`
     */
    takeIf(this: Number, predicate: (it: number) => boolean): number | undefined;
    /**
     * Returns `this` value if it does not satisfy the given predicate or `undefined` if it does
     * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
     * @returns `this` or `undefined`
     */
    takeUnless(this: Number, predicate: (it: number) => boolean): number | undefined;
  }
  interface String {
    /**
     * Calls the specified function block with `this` value as its argument and returns its result
     * @param block - The function to be executed with `this` as argument
     * @returns `block`'s result
     */
    let<R>(this: String, block: (it: string) => R): R;
    /**
     * Calls the specified function block with `this` value as its argument and returns `this` value
     * @param block - The function to be executed with `this` as argument
     * @returns `this`
     */
    also(this: String, block: (it: string) => void): string;
    /**
     * Calls the specified function block with `this` value as its receiver and returns its value
     * @param block - The function to be executed with `this` as context
     * @returns `block`'s result
     */
    run<R>(this: String, block: (this: string) => R): R;
    /**
     * Calls the specified function block with `this` value as its receiver and returns `this` value
     * @param block - The function to be executed with `this` as context
     * @returns `this`
     */
    apply(this: String, block: (this: string) => void): string;
    /**
     * Returns `this` value if it satisfies the given predicate or `undefined` if it doesn't
     * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
     * @returns `this` or `undefined`
     */
    takeIf(this: String, predicate: (it: string) => boolean): string | undefined;
    /**
     * Returns `this` value if it does not satisfy the given predicate or `undefined` if it does
     * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
     * @returns `this` or `undefined`
     */
    takeUnless(this: String, predicate: (it: string) => boolean): string | undefined;
  }
  interface Boolean {
    /**
     * Calls the specified function block with `this` value as its argument and returns its result
     * @param block - The function to be executed with `this` as argument
     * @returns `block`'s result
     */
    let<R>(this: Boolean, block: (it: boolean) => R): R;
    /**
     * Calls the specified function block with `this` value as its argument and returns `this` value
     * @param block - The function to be executed with `this` as argument
     * @returns `this`
     */
    also(this: Boolean, block: (it: boolean) => void): boolean;
    /**
     * Calls the specified function block with `this` value as its receiver and returns its value
     * @param block - The function to be executed with `this` as context
     * @returns `block`'s result
     */
    run<R>(this: Boolean, block: (this: boolean) => R): R;
    /**
     * Calls the specified function block with `this` value as its receiver and returns `this` value
     * @param block - The function to be executed with `this` as context
     * @returns `this`
     */
    apply(this: Boolean, block: (this: boolean) => void): boolean;
    /**
     * Returns `this` value if it satisfies the given predicate or `undefined` if it doesn't
     * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
     * @returns `this` or `undefined`
     */
    takeIf(this: Boolean, predicate?: (it: boolean) => boolean): boolean | undefined;
    /**
     * Returns `this` value if it does not satisfy the given predicate or `undefined` if it does
     * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
     * @returns `this` or `undefined`
     */
    takeUnless(this: Boolean, predicate?: (it: boolean) => boolean): boolean | undefined;
  }
}

Number.prototype.let = function(this, block) {
  return block(this.valueOf());
}

Number.prototype.also = function(this, block) {
  block(this.valueOf());
  return this.valueOf();
}

Number.prototype.run = function(this, block) {
  return block.call(this.valueOf());
}

Number.prototype.apply = function(this, block) {
  block.call(this.valueOf());
  return this.valueOf();
}

Number.prototype.takeIf = function(this, predicate) {
  return predicate(this.valueOf()) ? this.valueOf() : undefined;
}

Number.prototype.takeUnless = function(this, predicate) {
  return predicate(this.valueOf()) ? undefined : this.valueOf();
}

String.prototype.let = function(this, block) {
  return block(this.valueOf());
}

String.prototype.also = function(this, block) {
  block(this.valueOf());
  return this.valueOf();
}

String.prototype.run = function(this, block) {
  return block.call(this.valueOf());
}

String.prototype.apply = function(this, block) {
  block.call(this.valueOf());
  return this.valueOf();
}

String.prototype.takeIf = function(this, predicate) {
  return predicate(this.valueOf()) ? this.valueOf() : undefined;
}

String.prototype.takeUnless = function(this, predicate) {
  return predicate(this.valueOf()) ? undefined : this.valueOf();
}

Boolean.prototype.let = function(this, block) {
  return block(this.valueOf());
}

Boolean.prototype.also = function(this, block) {
  block(this.valueOf());
  return this.valueOf();
}

Boolean.prototype.run = function(this, block) {
  return block.call(this.valueOf());
}

Boolean.prototype.apply = function(this, block) {
  block.call(this.valueOf());
  return this.valueOf();
}

Boolean.prototype.takeIf = function(this, predicate) {
  return predicate && predicate(this.valueOf()) || this.valueOf() ? this.valueOf() : undefined;
}

Boolean.prototype.takeUnless = function(this, predicate) {
  return predicate && predicate(this.valueOf()) || this.valueOf() ? undefined : this.valueOf();
}
