const fixedEncodeURIComponent = (str: string): string => {
  return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, '%2A');
};

export const encodePostParams = (params: object): string =>
  Object.entries(params)
    .filter((entry): entry is [string, string] => {
      return entry[1] != null;
    })
    .map(([key, value]) => {
      return `${fixedEncodeURIComponent(key)}=${fixedEncodeURIComponent(value)}`;
    }).join('&');

export const wait = async (time = 1000): Promise<void> => {
  await new Promise(resolve => {
    setTimeout(resolve, time);
  });
};
