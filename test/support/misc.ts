export const createDsControlExpectation = (result: object) => {
  const dsControlKey = Object.keys(result).find(key => /^Ds_Control/.test(key));
  if (dsControlKey === undefined) {
    throw new Error('Missing Ds_Control_*');
  }

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    [dsControlKey]: expect.stringMatching(/[0-9]+/)

  };
};
