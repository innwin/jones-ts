import Taro from "@tarojs/taro";
import {Ioc} from "jones-ts";
import {IStorage} from "jones-client";
import {TYPE} from "../TYPE";

export class Storage implements IStorage {

  clear(): void {
    Taro.clearStorageSync();
  }

  get<T>(key: string): T {
    return Taro.getStorageSync<T>(key);
  }

  remove(key: string): void {
    Taro.removeStorageSync(key);
  }

  set<T>(key: string, data: T): void {
    Taro.setStorageSync(key, data);
  }
}

export function getStorage() {
  return Ioc.get<IStorage>(TYPE.Storage);
}
