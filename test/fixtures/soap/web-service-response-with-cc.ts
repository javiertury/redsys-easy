export const webServiceResponseWithCCMerchantKey = 'Mk9m98IfEblmPfrpsawt7BmxObt98Jev';

export const serializedWebServiceResponseWithCCParams =
  '<RETORNOXML>' +
  '<CODIGO>0</CODIGO>' +
  '<OPERACION>' +
  '<Ds_Amount>145</Ds_Amount>' +
  '<Ds_Currency>978</Ds_Currency>' +
  '<Ds_Order>1449821545</Ds_Order>' +
  '<Ds_Signature>6quLImPCOSTFpwhC7+ai1L+SPdKbcGx2sgC2A/1hwQo=</Ds_Signature>' +
  '<Ds_MerchantCode>999008881</Ds_MerchantCode>' +
  '<Ds_Terminal>871</Ds_Terminal>' +
  '<Ds_Response>0000</Ds_Response>' +
  '<Ds_AuthorisationCode>109761</Ds_AuthorisationCode>' +
  '<Ds_TransactionType>0</Ds_TransactionType>' +
  '<Ds_SecurePayment>0</Ds_SecurePayment>' +
  '<Ds_Language>1</Ds_Language>' +
  '<Ds_CardNumber>4548812049400004</Ds_CardNumber>' +
  '<Ds_MerchantData>' +
  '</Ds_MerchantData>' +
  '<Ds_Card_Country>724</Ds_Card_Country>' +
  '</OPERACION>' +
  '</RETORNOXML>';

export const webServiceResponseWithCCSignedString = '14514498215459990088819780000454881204940000400';

export const deserializedWebServiceResponseWithCCParams = {
  Ds_Amount: '145',
  Ds_Currency: '978',
  Ds_Order: '1449821545',
  Ds_Signature: '6quLImPCOSTFpwhC7+ai1L+SPdKbcGx2sgC2A/1hwQo=',
  Ds_MerchantCode: '999008881',
  Ds_Terminal: '871',
  Ds_Response: '0000',
  Ds_AuthorisationCode: '109761',
  Ds_TransactionType: '0',
  Ds_SecurePayment: '0',
  Ds_Language: '1',
  Ds_CardNumber: '4548812049400004',
  Ds_MerchantData: '',
  Ds_Card_Country: '724'
} as const;

export const deserializedWebServiceResponseWithCC = {
  CODIGO: '0',
  OPERACION: deserializedWebServiceResponseWithCCParams
} as const;

export const webServiceResponseWithCC3DESOrder = 'rRfWcxtJ9fU/TyqCTXo8GQ==';
