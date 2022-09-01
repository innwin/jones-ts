import {HttpRequestMessage} from "../httpRequestMessage";
import {HttpResponseMessage} from "../httpResponseMessage";

export interface IHttpClientAction {
  send<T>(request: HttpRequestMessage): Promise<HttpResponseMessage<T>>;
}
