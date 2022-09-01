// import Taro from "@tarojs/taro";
// import {serialize} from "uri-js";
// import {IHttpClientAction} from "./service/iHttpClientAction";
// import {HttpMethod, HttpRequestMessage} from "./httpRequestMessage";
// import {HttpResponseMessage} from "./httpResponseMessage";
//
// export class HttpClientAction implements IHttpClientAction {
//
//   private readonly timeout?: number;
//   constructor(timeout?: number) {
//     this.timeout = timeout;
//   }
//
//   async send<T>(request: HttpRequestMessage): Promise<HttpResponseMessage<T>> {
//     const response = await Taro.request({
//       url: serialize(request.uri!),
//       data: request.body,
//       header: request.headers,
//       method: this.getHttpMethod(request.method),
//       timeout: this.timeout
//     });
//     return new HttpResponseMessage(response.statusCode, response.header, response.data);
//   }
//
//   getHttpMethod(httpMethod: HttpMethod) {
//     switch (httpMethod) {
//       case HttpMethod.OPTIONS:
//         return "OPTIONS";
//       case HttpMethod.GET:
//         return "GET";
//       case HttpMethod.HEAD:
//         return "HEAD";
//       case HttpMethod.POST:
//         return "POST";
//       case HttpMethod.PUT:
//         return "PUT";
//       case HttpMethod.DELETE:
//         return "DELETE";
//       case HttpMethod.TRACE:
//         return "TRACE";
//       case HttpMethod.CONNECT:
//         return "CONNECT";
//     }
//   }
// }
