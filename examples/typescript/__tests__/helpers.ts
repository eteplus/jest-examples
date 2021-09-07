/**
 * 模拟Iframe下的对象
 * @param object
 * @returns
 */
export function mockObjectInIframe(value: any) {
  const originalSelf = { ...window.self };
  const originalTop = { ...window.top };
  const originalParent = { ...window.parent };

  Object.defineProperty(window, 'self', {
    writable: true,
    value: {},
  });

  Object.defineProperty(window, 'top', {
    writable: true,
    value,
  });

  Object.defineProperty(window, 'parent', {
    writable: true,
    value,
  });

  return function resetMocks() {
    Object.defineProperty(window, 'self', {
      writable: true,
      value: originalSelf,
    });

    Object.defineProperty(window, 'top', {
      writable: true,
      value: originalTop,
    });

    Object.defineProperty(window, 'parent', {
      writable: true,
      value: originalParent,
    });
  };
}
