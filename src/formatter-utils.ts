export const useInputFormatter = <A extends readonly unknown[], B extends readonly unknown[], C>(
  fn: (...args: Readonly<B>) => C,
  inputFormatter: (...args: A) => B
) => {
  return (...args: Readonly<A>): C => fn(...inputFormatter(...args));
};

export const useOutputFormatter = <A, B, C>(
  fn: (a: A) => B,
  outputFormatter: (b: B) => C
) => {
  return (a: A): C => outputFormatter(fn(a));
};

export const usePromiseOutputFormatter = <A, B, C>(
  fn: (a: A) => Promise<B>,
  outputFormatter: (b: B) => C
) => {
  return async (a: A): Promise<C> => outputFormatter(await fn(a));
};
