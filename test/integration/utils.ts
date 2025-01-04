const fixedEncodeURIComponent = (str: string): string =>
  encodeURIComponent(str)
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- necessary
    .replace(/[!'()]/g, escape)
    .replace(/\*/g, '%2A');

export const encodePostParams = (params: object): string =>
  Object.entries(params)
    .filter((entry): entry is [string, string] => entry[1] != null)
    .map(
      ([key, value]) =>
        `${fixedEncodeURIComponent(key)}=${fixedEncodeURIComponent(value)}`
    )
    .join('&');

export const wait = async (time = 1000): Promise<void> => {
  // eslint-disable-next-line promise/avoid-new -- unavoidable
  await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
