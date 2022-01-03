import { Injectable, TemplateRef } from '@angular/core';
import { NzMessageService } from "ng-zorro-antd/message";
import { NzMessageDataOptions } from "ng-zorro-antd/message/typings";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  /**
   * 提示显示时间, 默认为3s
   * @private
   */
  private duration: number = 3000;

  constructor(private nzMessageService: NzMessageService) {
  }

  /**
   * 成功提示
   * @param content
   * @param options
   */
  success(content: string | TemplateRef<void>, options?: NzMessageDataOptions) {
    this.create('success', content)
  }

  /**
   * 信息提示
   * @param content
   * @param options
   */
  info(content: string | TemplateRef<void>, options?: NzMessageDataOptions) {
    this.create('info', content)
  }

  /**
   * 告警提示
   * @param content
   * @param options
   */
  warning(content: string | TemplateRef<void>, options?: NzMessageDataOptions) {
    this.create('warning', content)
  }

  /**
   * 失败提示
   * @param content
   * @param options
   */
  error(content: string | TemplateRef<void>, options?: NzMessageDataOptions) {
    this.create('error', content)
  }

  /**
   * 创建提示
   * @param type 提示类型
   * @param content
   * @param options
   */
  create(type: 'success' | 'info' | 'warning' | 'error' | 'loading' | string, content: string | TemplateRef<void>, options?: NzMessageDataOptions) {
    this.nzMessageService.create(type, content, {
      nzDuration: this.duration,
      ...options
    });
  }
}
