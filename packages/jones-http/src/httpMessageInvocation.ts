import {IHttpMessageInvocation} from "./service/iHttpMessageInvocation";
import {HttpResponseMessage} from "./httpResponseMessage";
import {HttpRequestMessage} from "./httpRequestMessage";
import {IHttpClientAction} from "./service/iHttpClientAction";
import {IHttpMessageInterceptor} from "./service/iHttpMessageInterceptor";

export class HttpMessageInvocation implements IHttpMessageInvocation {

  private readonly httpClientAction: IHttpClientAction;
  private readonly interceptions: IHttpMessageInterceptor[];

  constructor(httpClientAction: IHttpClientAction, interceptions: IHttpMessageInterceptor[]) {
    this.httpClientAction = httpClientAction;
    this.interceptions = interceptions;
  }

  index = 0;
  send<T>(request: HttpRequestMessage): Promise<HttpResponseMessage<T>> {
    if (this.index == this.interceptions.length) {
      this.index = 0;
      return this.httpClientAction.send(request);
    }
    else {
      const interceptor = this.interceptions[this.index];
      this.index++;
      return interceptor.send(request, this);
    }
  }
}
