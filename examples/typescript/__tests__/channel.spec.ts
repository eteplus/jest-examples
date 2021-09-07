import { ChannelService } from '@/ChannelService';
import { mockObjectInIframe } from './helpers';

describe('Test ChannelService', () => {
  afterEach(() => {
    Object.defineProperty(window, 'parent.$channel', {
      writable: true,
      value: undefined,
    });
    Object.defineProperty(window, '$channel', {
      writable: true,
      value: undefined,
    });
  });

  test('window.top throw error', () => {
    const spy = jest.spyOn(window, 'top', 'get');
    spy.mockImplementation(() => {
      throw new Error('inaccessible');
    });
    window.$channel = new ChannelService();
    expect(window.$channel).toBeInstanceOf(ChannelService);
    spy.mockRestore();
  });

  test('window.$channel is undefined', () => {
    expect(window.$channel).toBeUndefined();
  });

  test('window.$channel is instance of ChannelService', () => {
    window.$channel = new ChannelService();
    expect(window.$channel).toBeInstanceOf(ChannelService);
  });

  test('window.$channel.context is window.parent.$channel.context', () => {
    const resetMocks = mockObjectInIframe({ $channel: new ChannelService() });
    const isEmbedded = window.self !== window.top;
    window.$channel = new ChannelService();
    expect(isEmbedded).toBeTruthy();
    expect(window.parent?.$channel).toBeInstanceOf(ChannelService);
    expect(window.$channel?.context).toEqual(window.parent.$channel?.context);
    resetMocks();
  });
});
