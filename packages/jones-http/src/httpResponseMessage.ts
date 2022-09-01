export class HttpResponseMessage<T> {
  statusCode: number;
  headers: Record<string, string>;
  body?: T;

  constructor(statusCode: number, headers: Record<string, string>, body: T) {
    this.statusCode = statusCode;
    this.headers = headers;
    this.body = body;
  }
}
