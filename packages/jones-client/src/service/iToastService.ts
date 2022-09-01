export interface IToastService {
  show(message: string, duration?: number, isMask?: boolean): Promise<any>;
  showSuccess(message: string, duration?: number, isMask?: boolean): Promise<any>;
  showError(message: string, duration?: number, isMask?: boolean): Promise<any>;
  hideToast(): void;

  showLoading(message: string, isMask?: boolean): Promise<any>;
  hideLoading(): void;
}
