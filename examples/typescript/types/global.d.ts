import type { IChannel } from '@/IChannel';

declare global {
  interface Window {
    $channel?: IChannel;
  }
}
