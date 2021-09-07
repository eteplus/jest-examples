# micro-channel

基于 `eventemitter3`，提供一种在 HTML 页面内进行通信的方式的轻量级脚本，支持 iframe 父子页面间的通信。

## 类型声明

```ts
/**
 * 消息事件类型
 */
export type MessageEvent<T = any> = {
  /** 消息内容 */
  data: T;
  /** 消息类型 */
  type?: string;
  /** 代表当前页面的唯一id */
  _webviewId?: number | string;
  /** 消息类型 */
  webviewType?: string;
  /** 源 */
  origin?: string;
};

/**
 * 消息选项
 */
export type MessageOptions = {
  /** 消息前缀 */
  prefix?: string;
  /** 指定消息来源 */
  origin?: string;
  /** 只监听一次，监听完自动注销 */
  once?: boolean;
};

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
```