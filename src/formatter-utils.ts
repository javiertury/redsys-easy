/**
 * Applies an input formatter to the first argument of a function
 *
 * @remarks
 * The signature of this function is so complex because tries to suport
 * formatters with generics that provide a default type. This should remain
 * until [variadic generics](https://github.com/microsoft/TypeScript/issues/5453)
 * land in typescript
 *
 * @public
 */
export const useSingleInputFormatter = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- used to build a generic type
  AF extends (input: any) => B,
  B,
  C extends readonly unknown[],
  D
>(
  fn: (...args: [B, ...C]) => D,
  inputFormatter: AF
): ((input: Parameters<AF>[0], ...otherArgs: [...C]) => D) =>
  (input: Parameters<AF>[0], ...otherArgs): D =>
    fn(inputFormatter(input), ...otherArgs);

/**
 * Applies an output formatter to a function
 *
 * @public
 */
export const useOutputFormatter = <A, B, C>(
  fn: (a: A) => B,
  outputFormatter: (b: B) => C
) => (a: A): C => outputFormatter(fn(a));

/**
 * Applies an output formatter to the resolved ouput promise of a function
 *
 * @public
 */
export const usePromiseOutputFormatter = <A, B, C>(
  fn: (a: A) => Promise<B>,
  outputFormatter: (b: B) => C
) => async (a: A): Promise<C> => outputFormatter(await fn(a));
