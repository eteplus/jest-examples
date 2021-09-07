import EventEmitter from 'eventemitter3';
import { WebviewType } from './types';

import type { MessageEvent, MessageOptions } from './types';
import type { IChannel } from './IChannel';

export class ChannelService implements IChannel {
  public context = new EventEmitter();

  /** Webview 唯一标识 */
  private webviewId: string;
  /** Webview 类型 */
  private webviewType = WebviewType.Normal;

  constructor() {
    this.webviewId = Date.now().toString();
    try {
      this.webviewType = this.getWebviewType();
      /**
       * 是否内嵌在Iframe中
       */
      if (window.self !== window.top && window.parent?.$channel) {
        this.context = window.parent.$channel.context;
      }
    } catch (error) {
      console.error('[$channel]', error);
    }
  }

  public onMessage(type: string, callback: (data: any, event: MessageEvent) => void, options: MessageOptions = {}) {
    const { prefix = '', origin = '*', once = false } = options;

    const method = once ? 'once' : 'on';
    const messageType = this.prifixify(type, prefix);
    this.context[method](messageType, (message: MessageEvent) => {
      const webviewId = message?._webviewId?.toString();
      const isDifferentWebview = !webviewId || webviewId !== this.webviewId;
      const isSameOrigin = origin === '*' || !message?.origin || origin.includes(message.origin);
      if (isDifferentWebview && isSameOrigin) {
        callback(message?.data, message);
      }
    });
  }

  public postMessage(type: string, data: any, options: MessageOptions = {}) {
    const { prefix = '', origin = '*' } = options;

    const message = {
      origin,
      data: data ?? {},
      type: this.prifixify(type, prefix),
      _webviewId: this.webviewId,
      webviewType: this.webviewType,
    };
    this.context.emit(message.type, message);
  }

  /**
   * 给字符串通过下划线拼接前缀
   * @param type
   * @param prefix
   * @returns prefix_type
   */
  private prifixify(type: string, prefix: string): string {
    return `${prefix}${prefix ? '_' : ''}${type}`;
  }

  /**
   * 获取 webview 类型
   * @returns WebviewType
   */
  private getWebviewType(): WebviewType {
    try {
      if (window.self !== window.top) {
        return WebviewType.Iframe;
      }
    } catch (error) {
      console.error('[$channel](getWebviewType)', error);
    }
    return WebviewType.Normal;
  }
}
