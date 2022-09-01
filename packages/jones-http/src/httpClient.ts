import {resolveComponents, URIComponents} from "uri-js";
import {IHttpClientAction} from "./service/iHttpClientAction";
import {IHttpMessageInterceptor} from "./service/iHttpMessageInterceptor";
import {HttpRequestMessage} from "./httpRequestMessage";
import {HttpResponseMessage} from "./httpResponseMessage";
import {HttpMessageInvocation} from "./httpMessageInvocation";

export class HttpClient {
  private readonly baseAddress?: URIComponents;
  private readonly httpClientAction: IHttpClientAction;
  readonly interceptions: IHttpMessageInterceptor[];

  constructor(baseAddress: URIComponents, httpClientAction: IHttpClientAction, interceptions: IHttpMessageInterceptor[] = []) {
    this.baseAddress = baseAddress;
    this.httpClientAction = httpClientAction;
    this.interceptions = interceptions;
  }

  send<T>(request: HttpRequestMessage): Promise<HttpResponseMessage<T>> {
    request.uri = this.prepareRequestUri(request.uri);
    return (new HttpMessageInvocation(this.httpClientAction, this.interceptions)).send(request);
  }

  prepareRequestUri(originalRequestUri?: URIComponents): URIComponents {
    let requestUri;
    if (!originalRequestUri && !this.baseAddress)
    {
      throw Error("baseAddress 和 Request Uri 不能同时为null");
    }
    if (!originalRequestUri)
    {
      return this.baseAddress!;
    }

    // If the request Uri is an absolute Uri, just use it. Otherwise try to combine it with the base Uri.
    if (originalRequestUri.reference != "absolute")
    {
      if (!this.baseAddress)
      {
        throw Error("非法的 Request Uri : " + originalRequestUri);
      }
      else
      {
        requestUri = resolveComponents(this.baseAddress, originalRequestUri);
      }
    }
    return requestUri ?? originalRequestUri;
  }
}
