export interface IDialogService {
  show(option?: Dialog.Option): Promise<Dialog.SuccessCallbackResult>;
  showActionSheet(option: ActionSheet.Option): Promise<ActionSheet.SuccessCallbackResult>;
}

export namespace Dialog {
  export interface Option {
    /** 取消按钮的文字颜色，必须是 16 进制格式的颜色字符串 */
    cancelColor?: string
    /** 取消按钮的文字，最多 4 个字符 */
    cancelText?: string
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: (res: CallbackResult) => void
    /** 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串 */
    confirmColor?: string
    /** 确认按钮的文字，最多 4 个字符 */
    confirmText?: string
    /** 提示的内容 */
    content?: string
    /** 接口调用失败的回调函数 */
    fail?: (res: CallbackResult) => void
    /** 是否显示取消按钮 */
    showCancel?: boolean
    /** 接口调用成功的回调函数 */
    success?: (result: SuccessCallbackResult) => void
    /** 提示的标题 */
    title?: string
  }

  export interface SuccessCallbackResult extends CallbackResult {
    /** 为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭） */
    cancel: boolean
    /** 为 true 时，表示用户点击了确定按钮 */
    confirm: boolean
    /** 调用结果 */
    errMsg: string
  }

  export interface CallbackResult {
    /** 错误信息 */
    errMsg: string
  }
}

export namespace ActionSheet {
  export interface Option {
    /** 警示文案 */
    alertText?: string
    /** 按钮的文字数组，数组长度最大为 6 */
    itemList: string[]
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: (res: Dialog.CallbackResult) => void
    /** 接口调用失败的回调函数 */
    fail?: (res: Dialog.CallbackResult) => void
    /** 按钮的文字颜色 */
    itemColor?: string
    /** 接口调用成功的回调函数 */
    success?: (result: SuccessCallbackResult) => void
  }
  export interface SuccessCallbackResult extends Dialog.CallbackResult {
    /** 用户点击的按钮序号，从上到下的顺序，从0开始 */
    tapIndex: number
    /** 调用结果 */
    errMsg: string
  }
}
