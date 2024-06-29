import { decodeUrlEntries } from './utils';

describe('decodeUrlEntries', () => {

  it('correctly deserializes merchant params with markup percentage', () => {
    expect(
      decodeUrlEntries({
        Ds_Date: '23%2F06%2F2024',
        Ds_Hour: '12%3A30',
        Ds_Markup_DCC: '5.5%'
      })
    ).toEqual({
      Ds_Date: '23/06/2024',
      Ds_Hour: '12:30',
      Ds_Markup_DCC: '5.5%'
    });
  });

});
