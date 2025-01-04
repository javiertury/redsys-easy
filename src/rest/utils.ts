/**
 * Tries to decode x-www-form-urlencoded values of an object
 */
export const decodeUrlEntries = <T extends object>(
  params: T
): T =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- type is unchanged
  Object.fromEntries(
    Object.entries(params).map((entry) => {
      let processedValue: unknown = entry[1];

      if (typeof entry[1] === 'string') {
        try {
          processedValue = decodeURIComponent(entry[1].replaceAll('+', ' '));
        } catch (_) {}
      }

      return [entry[0], processedValue];
    })
  ) as unknown as T;
