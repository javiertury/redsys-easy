export const createDsControlExpectation = (result: object) => {
  const dsControlKey = Object.keys(result).find(key => key.startsWith('Ds_Control'));
  if (dsControlKey === undefined) {
    throw new Error('Missing Ds_Control_*');
  }

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- untyped jest output
    [dsControlKey]: expect.stringMatching(/[0-9]+/)

  };
};
