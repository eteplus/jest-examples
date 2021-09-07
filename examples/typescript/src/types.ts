/**
 * Webview的类型
 */
export enum WebviewType {
  /** 不在播放底层页内webview */
  Normal = 'Normal',
  /** 横屏播放器内webview */
  Big = 'Big',
  /** 播放底层页竖屏webview */
  Small = 'Small',
  /** UN Webview */
  UN = 'UN',
  /** Web端内嵌iframe */
  Iframe = 'Iframe',
}

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
  /** 只监听一次 */
  once?: boolean;
};
