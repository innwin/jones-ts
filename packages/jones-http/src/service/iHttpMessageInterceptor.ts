import {HttpRequestMessage} from "../httpRequestMessage";
import {HttpResponseMessage} from "../httpResponseMessage";
import {IHttpMessageInvocation} from "./iHttpMessageInvocation";

export interface IHttpMessageInterceptor {
  send<T>(request: HttpRequestMessage, invocation: IHttpMessageInvocation): Promise<HttpResponseMessage<T>>;
}
