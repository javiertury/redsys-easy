export const waitForIframeToPostMessage = async ({
  iframe,
  condition,
  timeout
}: {
  /** Iframe */
  iframe: HTMLIFrameElement
  /** Condition */
  condition?: (event: MessageEvent) => boolean
  /** Max time to wait, in milliseconds */
  timeout?: number
}): Promise<{ loaded: boolean }> => {
  const maybeTimeoutPromise = timeout != null
    ? new Promise(resolve => setTimeout(resolve, timeout))
    : undefined;

  let timedout = true;

  // Promise resolves after the iframe redirects, if it ever does
  const iframeMessagePromise = new Promise<void>((resolve) => {
    const onIframeMessage = (event: MessageEvent) => {
      // If condition matches or there is no condition, resolve
      if (condition?.(event) ?? true) {
        resolve();
        timedout = false;
        iframe.removeEventListener('message', onIframeMessage);
      }
    };

    iframe.addEventListener('message', onIframeMessage);

    // Clean everything afer timeout
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    maybeTimeoutPromise?.then(() => {
      iframe.removeEventListener('message', onIframeMessage);
    });
  });

  // Wait until iframe completes or timeout ellapses
  await Promise.race([iframeMessagePromise, maybeTimeoutPromise]);

  return { loaded: timedout };
};
