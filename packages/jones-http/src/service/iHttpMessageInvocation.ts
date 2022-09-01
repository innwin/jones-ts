import {HttpRequestMessage} from "../httpRequestMessage";
import {HttpResponseMessage} from "../httpResponseMessage";

export interface IHttpMessageInvocation {
  send<T>(request: HttpRequestMessage): Promise<HttpResponseMessage<T>>;
}
