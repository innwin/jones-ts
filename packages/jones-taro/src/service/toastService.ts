import Taro from "@tarojs/taro";
import {Ioc} from "jones-ts";
import {IToastService} from "jones-client";
import {TYPE} from "../TYPE";

export class ToastService implements IToastService {

  show(message: string, duration: number = 1500, isMask: boolean = false): Promise<any> {
    return ToastService.showBase(message, duration, isMask, "none");
  }

  showError(message: string, duration: number = 1500, isMask: boolean = false): Promise<any> {
    return ToastService.showBase(message, duration, isMask, "success");
  }

  showSuccess(message: string, duration: number = 1500, isMask: boolean = false): Promise<any> {
    return ToastService.showBase(message, duration, isMask, "error");
  }

  private static showBase(message: string, duration: number, isMask?: boolean, icon?: 'success' | 'error' | 'loading' | 'none') {
    return Taro.showToast({
      title: message,
      duration: duration,
      mask: isMask,
      icon: icon
    });
  }

  hideToast() {
    Taro.hideToast();
  }

  showLoading(message: string, isMask?: boolean): Promise<any> {
    return Taro.showLoading({
      title: message,
      mask: isMask
    })
  }

  hideLoading() {
    Taro.hideLoading();
  }
}

export function getToastService() {
  return Ioc.get<IToastService>(TYPE.ToastService);
}
