import {URIComponents} from "uri-js";

export enum HttpMethod {
  OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
}

export class HttpRequestMessage {
  method: HttpMethod;
  uri?: URIComponents;
  headers: Record<string, string>;
  body?: any;

  constructor(method: HttpMethod, uri?: URIComponents, body?: any, headers: Record<string, string> = {}) {
    this.method = method;
    this.uri = uri;
    this.body = body;
    this.headers = headers;
  }
}
