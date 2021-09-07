import type EventEmitter from 'eventemitter3';
import type { MessageEvent, MessageOptions } from './types';

export interface IChannel {
  /** 频道上下文 */
  context: EventEmitter;

  /**
   * 监听频道消息回调
   * @param name 消息名称
   * @param callback 消息回调
   * @param options 选项
   */
  onMessage<Data = any>(
    type: string | symbol,
    callback: (data: Data, event: MessageEvent<Data>) => void,
    options?: MessageOptions,
  ): void;

  /**
   * 发送频道消息
   * @param type 消息类型
   * @param data 携带数据
   * @param options 选项
   */
  postMessage<Data = any>(
    type: string,
    data: Data,
    options?: MessageOptions,
  ): void;
}
