import Taro from "@tarojs/taro";
import {Ioc} from "jones-ts";
import {ActionSheet, Dialog, IDialogService} from "jones-client";
import {TYPE} from "../TYPE";

export class DialogService implements IDialogService {

  show(option?: Dialog.Option): Promise<Dialog.SuccessCallbackResult> {
    return Taro.showModal(option);
  }

  showActionSheet(option: ActionSheet.Option): Promise<ActionSheet.SuccessCallbackResult> {
    return Taro.showActionSheet(option);
  }
}

export function getDialogService() {
  return Ioc.get<IDialogService>(TYPE.DialogService);
}
