export class QueryParameter {

  private _queryParameters: Record<string, string>;
  get queryParameters(): Record<string, string> {
    return this._queryParameters;
  }

  constructor(_queryParameters: Record<string, string> = {}) {
    this._queryParameters = _queryParameters;
  }

  omit(keys: string[]): QueryParameter {
    if (this._queryParameters) {
      this._queryParameters = Object.keys(this._queryParameters).reduce((acc, key) =>
              !keys.includes(key) && this._queryParameters[key] ? {...acc, [key]: this._queryParameters[key]} : acc,
          {});
    }
    return this;
  }

  toUrlQueryParameters(): string | null {
    if (this._queryParameters && Object.keys(this._queryParameters).length > 0) {
      return Object.keys(this._queryParameters).map(key => key + '=' + encodeURIComponent(this._queryParameters[key])).join('&');
    }
    return null;
  }
}
