type ErrorRecord =
  | { code: number; sisCode: null; text: string }
  | { code: null; sisCode: string; text: string }
  | { code: number; sisCode: string; text: string };

export const ALL_ERRORS: ErrorRecord[] = [
  {
    sisCode: 'SIS0001',
    code: 9001,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0002',
    code: 9002,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0003',
    code: 9003,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0004',
    code: 9004,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0005',
    code: 9005,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0006',
    code: 9006,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0007',
    code: 9007,
    text: 'El mensaje enviado por el comercio no es correcto'
  },
  { sisCode: 'SIS0008', code: 9008, text: 'falta Ds_Merchant_MerchantCode' },
  {
    sisCode: 'SIS0009',
    code: 9009,
    text: 'Error de formato en Ds_Merchant_MerchantCode'
  },
  { sisCode: 'SIS0010', code: 9010, text: 'Error falta Ds_Merchant_Terminal' },
  {
    sisCode: 'SIS0011',
    code: 9011,
    text: 'Error de formato en Ds_Merchant_Terminal'
  },
  {
    sisCode: 'SIS0012',
    code: 9012,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0013',
    code: 9013,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0014',
    code: 9014,
    text: 'Error de formato en Ds_Merchant_Order'
  },
  { sisCode: 'SIS0015', code: 9015, text: 'Falta Ds_Merchant_Currency' },
  {
    sisCode: 'SIS0016',
    code: 9016,
    text: 'Error de formato en Ds_Merchant_Currency'
  },
  { sisCode: 'SIS0018', code: 9018, text: 'Falta Ds_Merchant_Amount' },
  { sisCode: 'SIS0019', code: 9019, text: 'Falta Ds_Merchant_Amount' },
  {
    sisCode: 'SIS0020',
    code: 9020,
    text: 'Falta Ds_Merchant_MerchantSignature'
  },
  {
    sisCode: 'SIS0021',
    code: 9021,
    text: 'Ds_Merchant_MerchantSignature viene vacía'
  },
  {
    sisCode: 'SIS0022',
    code: 9022,
    text: 'Error de formato en Ds_Merchant_TransactionType'
  },
  {
    sisCode: 'SIS0023',
    code: 9023,
    text: 'Ds_Merchant_TransactionType desconocido'
  },
  {
    sisCode: 'SIS0024',
    code: 9024,
    text: 'Error Ds_Merchant_ConsumerLanguage tiene mas de 3 posiciones'
  },
  {
    sisCode: 'SIS0025',
    code: 9025,
    text: 'Error de formato en Ds_Merchant_ConsumerLanguage'
  },
  {
    sisCode: 'SIS0026',
    code: 9026,
    text: 'No existe el comercio / terminal enviado'
  },
  {
    sisCode: 'SIS0027',
    code: 9027,
    text: 'Error Moneda enviada por el comercio'
  },
  {
    sisCode: 'SIS0028',
    code: 9028,
    text: 'Comercio / terminal está dado de baja'
  },
  {
    sisCode: 'SIS0029',
    code: 9029,
    text: 'Error genérico. Consulte con Soporte'
  },
  { sisCode: 'SIS0030', code: 9030, text: 'tipo de operación errónea' },
  { sisCode: 'SIS0031', code: 9031, text: 'método de pago erróneo' },
  {
    sisCode: 'SIS0032',
    code: 9032,
    text: 'Error al montar el mensaje para una devolución'
  },
  { sisCode: 'SIS0033', code: 9033, text: 'tipo de operación es erróneo' },
  { sisCode: 'SIS0034', code: 9034, text: 'Error en el acceso a la BBDD' },
  {
    sisCode: 'SIS0035',
    code: 9035,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0037',
    code: 9037,
    text: 'El número de teléfono no es válido'
  },
  {
    sisCode: 'SIS0038',
    code: 9038,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0039',
    code: 9039,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0040',
    code: 9040,
    text: 'El comercio / terminal no tiene ningún método de pago asignado'
  },
  { sisCode: 'SIS0041', code: 9041, text: 'Error en el cálculo de la firma' },
  { sisCode: 'SIS0042', code: 9042, text: 'Error en el cálculo de la firma' },
  {
    sisCode: 'SIS0043',
    code: 9043,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0044',
    code: 9044,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0046',
    code: 9046,
    text: 'El bin de la tarjeta no está dado de alta en FINANET'
  },
  {
    sisCode: 'SIS0047',
    code: 9047,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0048',
    code: 9048,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0049',
    code: 9049,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0050',
    code: 9050,
    text: 'Error genérico. Consulte con Soporte'
  },
  { sisCode: 'SIS0051', code: 9051, text: 'Número de pedido repetido' },
  {
    sisCode: 'SIS0052',
    code: 9052,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0053',
    code: 9053,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0054',
    code: 9054,
    text: 'No existe operación sobre la que realizar la devolución'
  },
  {
    sisCode: 'SIS0055',
    code: 9055,
    text: 'existe más de un pago con el mismo número de pedido'
  },
  {
    sisCode: 'SIS0056',
    code: 9056,
    text: 'La operación sobre la que se desea devolver no está autorizada'
  },
  {
    sisCode: 'SIS0057',
    code: 9057,
    text: 'El importe a devolver supera el permitido'
  },
  {
    sisCode: 'SIS0058',
    code: 9058,
    text: 'Los datos de la validación son erróneos'
  },
  {
    sisCode: 'SIS0059',
    code: 9059,
    text: 'No existe operación sobre la que realizar la confirmación'
  },
  {
    sisCode: 'SIS0060',
    code: 9060,
    text: 'Ya existe una confirmación asociada a la preautorización'
  },
  {
    sisCode: 'SIS0061',
    code: 9061,
    text: 'La preautorización sobre la que se desea confirmar no está autorizada'
  },
  {
    sisCode: 'SIS0062',
    code: 9062,
    text: 'El importe a confirmar supera el permitido'
  },
  { sisCode: 'SIS0063', code: 9063, text: 'Número de tarjeta no valido.' },
  {
    sisCode: 'SIS0064',
    code: 9064,
    text: 'Número de posiciones de la tarjeta incorrecto'
  },
  {
    sisCode: 'SIS0065',
    code: 9065,
    text: 'El número de tarjeta no es numérico'
  },
  { sisCode: 'SIS0066', code: 9066, text: 'Error en el mes de caducidad' },
  {
    sisCode: 'SIS0067',
    code: 9067,
    text: 'El mes de la caducidad no es numérico'
  },
  {
    sisCode: 'SIS0068',
    code: 9068,
    text: 'El mes de la caducidad no es válido'
  },
  { sisCode: 'SIS0069', code: 9069, text: 'Año de caducidad no valido' },
  {
    sisCode: 'SIS0070',
    code: 9070,
    text: 'El Año de la caducidad no es numérico'
  },
  { sisCode: 'SIS0071', code: 9071, text: 'Tarjeta caducada' },
  { sisCode: 'SIS0072', code: 9072, text: 'Operación no anulable' },
  { sisCode: 'SIS0073', code: 9073, text: 'Error en la anulación' },
  { sisCode: 'SIS0074', code: 9074, text: 'Falta Ds_Merchant_Order ( Pedido)' },
  {
    sisCode: 'SIS0075',
    code: 9075,
    text: 'El «Ds_Merchant_Order» tiene menos de 4 o más de 12 posiciones .'
  },
  {
    sisCode: 'SIS0077',
    code: 9077,
    text: 'Error de formato en Ds_Merchant_Order'
  },
  {
    sisCode: 'SIS0078',
    code: 9078,
    text: 'Tipo de operación no permitida para esa tarjeta'
  },
  {
    sisCode: 'SIS0079',
    code: 9079,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0080',
    code: 9080,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0081',
    code: 9081,
    text: 'Se han perdico los datos de la sesión'
  },
  {
    sisCode: 'SIS0082',
    code: 9082,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0083',
    code: 9083,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0084',
    code: 9084,
    text: 'El valor de Ds_Merchant_Conciliation es nulo'
  },
  {
    sisCode: 'SIS0085',
    code: 9085,
    text: 'El valor de Ds_Merchant_Conciliation no es numérico'
  },
  {
    sisCode: 'SIS0086',
    code: 9086,
    text: 'El valor de Ds_Merchant_Conciliation no ocupa 6 posiciones'
  },
  {
    sisCode: 'SIS0087',
    code: 9087,
    text: 'El valor de Ds_Merchant_Session es nulo'
  },
  {
    sisCode: 'SIS0088',
    code: 9088,
    text: 'El valor de Ds_Merchant_Session no es numérico'
  },
  {
    sisCode: 'SIS0089',
    code: 9089,
    text: 'El valor de caducidad no ocupa 4 posiciones'
  },
  {
    sisCode: 'SIS0090',
    code: 9090,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0091',
    code: 9091,
    text: 'Error genérico. Consulte con Soporte'
  },
  { sisCode: 'SIS0092', code: 9092, text: 'El valor de caducidad es nulo' },
  { sisCode: 'SIS0093', code: 9093, text: 'Denegación emisor' },
  { sisCode: 'SIS0094', code: 9094, text: 'Denegación emisor' },
  { sisCode: 'SIS0095', code: 9095, text: 'Denegación emisor' },
  {
    sisCode: 'SIS0097',
    code: 9097,
    text: 'Valor del campo Ds_Merchant_CComercio no válido'
  },
  {
    sisCode: 'SIS0098',
    code: 9098,
    text: 'Valor del campo Ds_Merchant_CVentana no válido'
  },
  {
    sisCode: 'SIS0099',
    code: 9098,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0103',
    code: 9103,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0104',
    code: 9104,
    text: 'Comercio con “titular seguro” y titular sin clave de compra segura'
  },
  {
    sisCode: 'SIS0112',
    code: 9112,
    text: 'El tipo de transacción especificado en Ds_Merchant_Transaction_Type no esta permitido'
  },
  {
    sisCode: 'SIS0113',
    code: 9113,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0114',
    code: 9114,
    text: 'Se está realizando la llamada por GET, la tiene que realizar por POST'
  },
  {
    sisCode: 'SIS0115',
    code: 9115,
    text: 'No existe operación sobre la que realizar el pago de la cuota'
  },
  {
    sisCode: 'SIS0116',
    code: 9116,
    text: 'La operación sobre la que se desea pagar una cuota no es una operación válida'
  },
  {
    sisCode: 'SIS0117',
    code: 9117,
    text: 'La operación sobre la que se desea pagar una cuota no está autorizada'
  },
  {
    sisCode: 'SIS0118',
    code: 9118,
    text: 'Se ha excedido el importe total de las cuotas'
  },
  {
    sisCode: 'SIS0119',
    code: 9119,
    text: 'Valor del campo Ds_Merchant_DateFrecuency no válido'
  },
  {
    sisCode: 'SIS0120',
    code: 9120,
    text: 'Valor del campo Ds_Merchant_ChargeExpiryDate no válido'
  },
  {
    sisCode: 'SIS0121',
    code: 9121,
    text: 'Valor del campo Ds_Merchant_SumTotal no válido'
  },
  {
    sisCode: 'SIS0122',
    code: 9122,
    text: 'Formato incorrecto  del campo Ds_Merchant_DateFrecuency o  Ds_Merchant_SumTotal'
  },
  {
    sisCode: 'SIS0123',
    code: 9123,
    text: 'Se ha excedido la fecha tope para realiza la Transacción'
  },
  {
    sisCode: 'SIS0124',
    code: 9124,
    text: 'No ha transcurrido la frecuencia mínima en un pago recurrente sucesivo'
  },
  {
    sisCode: 'SIS0125',
    code: 9125,
    text: 'Error genérico. Consulte con Soporte'
  },
  { sisCode: 'SIS0126', code: 9126, text: 'Operación Duplicada' },
  {
    sisCode: 'SIS0127',
    code: 9127,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0128',
    code: 9128,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0130',
    code: 9130,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0131',
    code: 9131,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0132',
    code: 9132,
    text: 'La fecha de Confirmación de Autorización no puede superar en mas de 7 dias a la de Preautorización.'
  },
  {
    sisCode: 'SIS0133',
    code: 9133,
    text: 'La fecha de Confirmación de Autenticación no puede superar en mas de 45 días a la de Autenticacion Previa'
  },
  {
    sisCode: 'SIS0134',
    code: 9134,
    text: 'El valor del Ds_MerchantCiers enviado no es válido'
  },
  {
    sisCode: 'SIS0139',
    code: 9139,
    text: 'El pago recurrente inicial está duplicado'
  },
  {
    sisCode: 'SIS0140',
    code: 9140,
    text: 'Error genérico. Consulte con Soporte'
  },
  { sisCode: 'SIS0142', code: 9142, text: 'Tiempo excecido para el pago' },
  {
    sisCode: 'SIS0151',
    code: 9151,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0169',
    code: 9169,
    text: 'Valor PUCE Ds_Merchant_MatchingData no válido'
  },
  {
    sisCode: 'SIS0170',
    code: 9170,
    text: 'Valor PUCE Ds_Acquirer_Identifier no válido'
  },
  {
    sisCode: 'SIS0171',
    code: 9171,
    text: 'Valor PUCE Ds_Merchant_Csb no válido'
  },
  {
    sisCode: 'SIS0172',
    code: 9172,
    text: 'El valor  del campo PUCE Ds_Merchant_MerchantCode no es válido'
  },
  {
    sisCode: 'SIS0173',
    code: 9173,
    text: 'El valor del campo  PUCE Ds_Merchant_UrlOK no válido'
  },
  {
    sisCode: 'SIS0174',
    code: 9174,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0175',
    code: 9175,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0181',
    code: 9181,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0182',
    code: 9182,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0183',
    code: 9183,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0184',
    code: 9184,
    text: 'Error genérico. Consulte con Soporte'
  },
  { sisCode: 'SIS0186', code: 9186, text: 'Faltan datos para operación' },
  {
    sisCode: 'SIS0187',
    code: 9187,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0197',
    code: 9197,
    text: 'Error al obtener los datos de cesta de la compra'
  },
  {
    sisCode: 'SIS0214',
    code: 9214,
    text: 'El comercio no permite devoluciones. Se requiere usar firma ampliada.'
  },
  { sisCode: 'SIS0216', code: 9216, text: 'El CVV2 tiene mas de 3 posiciones' },
  { sisCode: 'SIS0217', code: 9217, text: 'Error de formato en el CVV2' },
  {
    sisCode: 'SIS0218',
    code: 9218,
    text: 'El comercio solo permite operaciones seguras y se está mandando una operación  NO SEGURA por entradas Host to Host'
  },
  {
    sisCode: 'SIS0219',
    code: 9219,
    text: 'El número de operaciones de la tarjeta supera el límite permitido para el comercio'
  },
  {
    sisCode: 'SIS0220',
    code: 9220,
    text: 'El importe acumulado de la tarjeta supera el límite permitido para el comercio'
  },
  { sisCode: 'SIS0221', code: 9221, text: 'El CVV2 es obligatorio' },
  {
    sisCode: 'SIS0222',
    code: 9222,
    text: 'Ya existe una anulación asociada a la preautorización'
  },
  {
    sisCode: 'SIS0223',
    code: 9223,
    text: 'La preautorización que se desea anular no está autorizada'
  },
  {
    sisCode: 'SIS0224',
    code: 9224,
    text: 'El comercio no permite anulaciones por no tener firma ampliada'
  },
  {
    sisCode: 'SIS0225',
    code: 9225,
    text: 'No existe operación sobre la que realizar la anulación'
  },
  {
    sisCode: 'SIS0226',
    code: 9226,
    text: 'Error en en los datos de la anulación'
  },
  {
    sisCode: 'SIS0227',
    code: 9227,
    text: 'Valor del campo Ds_Merchant_TransactionDate no válido'
  },
  {
    sisCode: 'SIS0228',
    code: 9228,
    text: 'Sólo se puede hacer pago aplazado con tarjeta de crédito On-us'
  },
  {
    sisCode: 'SIS0229',
    code: 9229,
    text: 'No existe el codigo de pago aplazado solicitado'
  },
  {
    sisCode: 'SIS0230',
    code: 9230,
    text: 'El comercio no está configurado para aceptar pago fraccionado o el código de fraccionamiento  que nos envía no está dado de alta.'
  },
  { sisCode: 'SIS0231', code: 9231, text: 'No hay forma de pago aplicable' },
  { sisCode: 'SIS0232', code: 9232, text: 'Forma de pago no disponible' },
  { sisCode: 'SIS0233', code: 9233, text: 'Forma de pago desconocida' },
  {
    sisCode: 'SIS0234',
    code: 9234,
    text: 'Nombre del titular de la cuenta no disponible'
  },
  {
    sisCode: 'SIS0235',
    code: 9235,
    text: 'Campo Sis_Numero_Entidad no disponible'
  },
  {
    sisCode: 'SIS0236',
    code: 9236,
    text: 'El valor del campo Sis_Numero_Entidad no tiene la longitud requerida'
  },
  {
    sisCode: 'SIS0237',
    code: 9237,
    text: 'El valor del campo Sis_Numero_Entidad no es numérico'
  },
  {
    sisCode: 'SIS0238',
    code: 9238,
    text: 'El valor del Campo Sis_Numero_Oficina no está disponible'
  },
  {
    sisCode: 'SIS0239',
    code: 9239,
    text: 'El valor del  campo Sis_Numero_Oficina no tiene la longitud requerida'
  },
  {
    sisCode: 'SIS0240',
    code: 9240,
    text: 'El Valor del campo Sis_Numero_Oficina no es numérico'
  },
  { sisCode: 'SIS0241', code: 9241, text: 'Campo Sis_Numero_DC no disponible' },
  {
    sisCode: 'SIS0242',
    code: 9242,
    text: 'El valor del campo Sis_Numero_DC no tiene la longitud requerida'
  },
  {
    sisCode: 'SIS0243',
    code: 9243,
    text: 'El Valor del  campo Sis_Numero_DC no es numérico'
  },
  {
    sisCode: 'SIS0244',
    code: 9244,
    text: 'Campo Sis_Numero_Cuenta no disponible'
  },
  {
    sisCode: 'SIS0245',
    code: 9245,
    text: 'El Valor del campo Sis_Numero_Cuenta no tiene la longitud requerida'
  },
  {
    sisCode: 'SIS0246',
    code: 9246,
    text: 'El Valor del campo Sis_Numero_Cuenta no es numérico'
  },
  {
    sisCode: 'SIS0247',
    code: 9247,
    text: 'Dígito de Control de Cuenta Cliente no válido'
  },
  {
    sisCode: 'SIS0248',
    code: 9248,
    text: 'El comercio no permite pago por domiciliación'
  },
  {
    sisCode: 'SIS0249',
    code: 9249,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0250',
    code: 9250,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0251',
    code: 9251,
    text: 'El comercio no permite pago por transferencia'
  },
  {
    sisCode: 'SIS0252',
    code: 9252,
    text: 'Por su configuración no puede enviar la tarjeta'
  },
  { sisCode: 'SIS0253', code: 9253, text: 'Tarjeta no cumple check digit' },
  {
    sisCode: 'SIS0254',
    code: 9254,
    text: 'El número de operaciones de la IP supera el límite permitido por el comercio'
  },
  {
    sisCode: 'SIS0255',
    code: 9255,
    text: 'El importe acumulado por la IP supera el límite permitido por el comerci'
  },
  {
    sisCode: 'SIS0256',
    code: 9256,
    text: 'El comercio no permite operativa de preautorizacion'
  },
  {
    sisCode: 'SIS0257',
    code: 9257,
    text: 'La tarjeta no permite operativa de preautorizacion'
  },
  {
    sisCode: 'SIS0258',
    code: 9258,
    text: 'No se tiene el IDETRA emisor necesario para realizar la confirmación'
  },
  {
    sisCode: 'SIS0259',
    code: 9259,
    text: 'No existe la operacion original para notificar o consultar'
  },
  { sisCode: 'SIS0260', code: 9260, text: 'Entrada incorrecta al SIS' },
  { sisCode: 'SIS0261', code: 9261, text: 'Restricciones superadas' },
  {
    sisCode: 'SIS0262',
    code: 9262,
    text: 'Moneda no permitida para operación de transferencia o domiciliacion'
  },
  {
    sisCode: 'SIS0263',
    code: 9263,
    text: 'Error calculando datos para procesar operación'
  },
  {
    sisCode: 'SIS0264',
    code: 9264,
    text: 'Error procesando datos de respuesta recibidos'
  },
  {
    sisCode: 'SIS0265',
    code: 9265,
    text: 'Error de firma en los datos recibidos'
  },
  {
    sisCode: 'SIS0266',
    code: 9266,
    text: 'No se pueden recuperar los datos de la operación recibida'
  },
  {
    sisCode: 'SIS0267',
    code: 9267,
    text: 'La operación no se puede procesar por no existir Codigo Cuenta Cliente'
  },
  {
    sisCode: 'SIS0268',
    code: 9268,
    text: 'La devolución no se puede procesar por WebService'
  },
  {
    sisCode: 'SIS0269',
    code: 9269,
    text: 'No se pueden realizar devoluciones de operaciones de domiciliacion no descargadas'
  },
  {
    sisCode: 'SIS0270',
    code: 9270,
    text: 'El comercio no puede realizar preautorizaciones en diferido'
  },
  {
    sisCode: 'SIS0274',
    code: 9274,
    text: 'Tipo de operación desconocida o no permitida por esta entrada al SIS'
  },
  { sisCode: 'SIS0275', code: 9275, text: 'Premio sin IdPremio' },
  { sisCode: 'SIS0276', code: 9276, text: 'Unidades del Premio no numericas.' },
  {
    sisCode: 'SIS0277',
    code: 9277,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0278',
    code: 9278,
    text: 'Error en el proceso de consulta de premios'
  },
  {
    sisCode: 'SIS0279',
    code: 9279,
    text: 'El comercio no tiene activada la operativa de fidelización'
  },
  { sisCode: 'SIS0280', code: 9280, text: 'Bloqueo por control de Seguridad' },
  { sisCode: 'SIS0281', code: 9281, text: 'Bloqueo por control de Seguridad' },
  { sisCode: 'SIS0282', code: 9282, text: 'Bloqueo por control de Seguridad' },
  { sisCode: 'SIS0283', code: 9283, text: 'Bloqueo por control de Seguridad' },
  {
    sisCode: 'SIS0284',
    code: 9284,
    text: 'No existe operacion sobre la que realizar el Pago Adicional'
  },
  {
    sisCode: 'SIS0285',
    code: 9285,
    text: 'No existe operacion sobre la que realizar el Pago Adicional'
  },
  {
    sisCode: 'SIS0286',
    code: 9286,
    text: 'La operación sobre la que se quiere hacer la operación adicional no esta Aceptada'
  },
  {
    sisCode: 'SIS0287',
    code: 9287,
    text: 'la Operacion ha sobrepasado el importe para el Pago Adicional'
  },
  {
    sisCode: 'SIS0288',
    code: 9288,
    text: 'No se puede realizar otro pago Adicional. se ha superado el numero de pagos'
  },
  {
    sisCode: 'SIS0289',
    code: 9289,
    text: 'El importe del pago Adicional supera el maximo días permitido'
  },
  { sisCode: 'SIS0290', code: 9290, text: 'Bloqueo por control de Seguridad' },
  { sisCode: 'SIS0291', code: 9291, text: 'Bloqueo por control de Seguridad' },
  { sisCode: 'SIS0292', code: 9292, text: 'Bloqueo por control de Seguridad' },
  { sisCode: 'SIS0293', code: 9293, text: 'Bloqueo por control de Seguridad' },
  { sisCode: 'SIS0294', code: 9294, text: 'La tarjeta no es Privada' },
  {
    sisCode: 'SIS0295',
    code: 9295,
    text: 'Error de duplicidad de operación. Se puede intentar de nuevo'
  },
  {
    sisCode: 'SIS0296',
    code: 9296,
    text: 'No se encuentra la operación Tarjeta en Archivo inicial'
  },
  {
    sisCode: 'SIS0297',
    code: 9297,
    text: 'Número de operaciones sucesivas de Tarjeta en Archivo superado'
  },
  {
    sisCode: 'SIS0298',
    code: 9298,
    text: 'El comercio no permite realizar operaciones de Tarjeta en Archivo'
  },
  { sisCode: 'SIS0299', code: 9299, text: 'Error en pago con PayPal' },
  { sisCode: 'SIS0300', code: 9300, text: 'Error en pago con PayPal' },
  { sisCode: 'SIS0301', code: 9301, text: 'Error en pago con PayPal' },
  {
    sisCode: 'SIS0302',
    code: 9302,
    text: 'Moneda no válida para pago con PayPal'
  },
  {
    sisCode: 'SIS0304',
    code: 9304,
    text: 'No se permite pago fraccionado si la tarjeta no es de FINCONSUM'
  },
  {
    sisCode: 'SIS0305',
    code: 9305,
    text: 'No se permite pago fraccionado FINCONSUM en moneda diferente de euro'
  },
  {
    sisCode: 'SIS0306',
    code: 9306,
    text: 'Valor del campo  Ds_Merchant_PrepaidCard no válido'
  },
  {
    sisCode: 'SIS0307',
    code: 9307,
    text: 'Operativa de tarjeta regalo no permitida'
  },
  {
    sisCode: 'SIS0308',
    code: 9308,
    text: 'Tiempo límite para recarga de tarjeta regalo superado'
  },
  {
    sisCode: 'SIS0309',
    code: 9309,
    text: 'Faltan datos adicionales para realizar la recarga de tarjeta prepago'
  },
  {
    sisCode: 'SIS0310',
    code: 9310,
    text: 'Valor del campo Ds_Merchant_Prepaid_Expiry no válido'
  },
  {
    sisCode: 'SIS0311',
    code: 9311,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0319',
    code: 9319,
    text: 'El comercio no pertenece al grupo enviado en Ds_Merchant_Group'
  },
  { sisCode: 'SIS0320', code: 9320, text: 'Error generando la referencia' },
  {
    sisCode: 'SIS0321',
    code: 9321,
    text: 'El identificador indicado en Ds_Merchant_Identifier no está asociado al comercio'
  },
  {
    sisCode: 'SIS0322',
    code: 9322,
    text: 'Error de formato en Ds_Merchant_Group'
  },
  {
    sisCode: 'SIS0323',
    code: 9323,
    text: 'Es necesario el campo Ds_Merchant_Customer_Mobile o Ds_Merchant_Customer_Mail'
  },
  { sisCode: 'SIS0324', code: 9324, text: 'Imposible enviar link al titular' },
  {
    sisCode: 'SIS0326',
    code: 9326,
    text: 'Se han enviado datos de tarjeta en fase primera de un pago con dos fases'
  },
  {
    sisCode: 'SIS0327',
    code: 9327,
    text: 'No se ha enviado ni móvil ni email en fase primera de un pago con dos fases'
  },
  {
    sisCode: 'SIS0328',
    code: 9328,
    text: 'Token de pago en dos fases inválido'
  },
  {
    sisCode: 'SIS0329',
    code: 9329,
    text: 'No se puede recuperar el Token de pago en dos fases'
  },
  {
    sisCode: 'SIS0330',
    code: 9330,
    text: 'Fechas incorrectas de pago dos fases'
  },
  {
    sisCode: 'SIS0331',
    code: 9331,
    text: 'La operación no tiene un estado válido o no existe.'
  },
  {
    sisCode: 'SIS0332',
    code: 9332,
    text: 'El importe de la operación original y de la devolución debe ser idéntico'
  },
  {
    sisCode: 'SIS0333',
    code: 9333,
    text: 'Error en una petición a MasterPass Wallet'
  },
  { sisCode: 'SIS0334', code: 9334, text: 'Bloqueo por control de Seguridad' },
  { sisCode: 'SIS0334', code: 9334, text: 'Bloqueo por control de Seguridad' },
  {
    sisCode: 'SIS0335',
    code: 9335,
    text: 'El valor del campo Ds_Merchant_Recharge_Commission no es válido'
  },
  {
    sisCode: 'SIS0336',
    code: 9336,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0337',
    code: 9337,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0338',
    code: 9338,
    text: 'No se encuentra la operación iUPAY'
  },
  {
    sisCode: 'SIS0339',
    code: 9339,
    text: 'El comercio no dispone de pago iUPAY'
  },
  {
    sisCode: 'SIS0340',
    code: 9340,
    text: 'Respuesta recibida desde iUPAY no válida'
  },
  {
    sisCode: 'SIS0341',
    code: 9341,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0342',
    code: 9342,
    text: 'El comercio no permite realizar operaciones de pago de tributos'
  },
  {
    sisCode: 'SIS0343',
    code: 9343,
    text: 'Falta o es incorrecto el parámetro Ds_Merchant_Tax_Reference'
  },
  {
    sisCode: 'SIS0344',
    code: 9344,
    text: 'No se  han aceptado las condiciones de las cuotas'
  },
  {
    sisCode: 'SIS0345',
    code: 9345,
    text: 'Se ha elegido un número de plazos incorrecto'
  },
  {
    sisCode: 'SIS0346',
    code: 9346,
    text: 'Error en el formato del campo  DS_MERCHANT_PAY_TYPE'
  },
  {
    sisCode: 'SIS0347',
    code: 9347,
    text: 'El comercio no está configurado para realizar la consulta de BIN.'
  },
  {
    sisCode: 'SIS0348',
    code: 9348,
    text: 'El BIN indicado en la consulta no se reconoce'
  },
  {
    sisCode: 'SIS0349',
    code: 9349,
    text: 'Los datos de importe y DCC enviados no coinciden con los registrados en SIS'
  },
  {
    sisCode: 'SIS0350',
    code: 9350,
    text: 'No hay datos DCC registrados en SIS para este número de pedido'
  },
  { sisCode: 'SIS0351', code: 9351, text: 'Autenticación prepago incorrecta' },
  {
    sisCode: 'SIS0352',
    code: 9352,
    text: 'El tipo de firma del comercio no permite esta operativa'
  },
  {
    sisCode: 'SIS0353',
    code: 9353,
    text: 'El comercio no tiene definida una clave 3DES válida'
  },
  { sisCode: 'SIS0354', code: 9354, text: 'Error descifrando petición' },
  {
    sisCode: 'SIS0355',
    code: 9355,
    text: 'El comercio-terminal enviado en los datos cifrados no coincide con el enviado en la petición'
  },
  {
    sisCode: 'SIS0356',
    code: 9356,
    text: 'Existen datos de entrada para control de fraude y el comercio no tiene activo control de fraude'
  },
  {
    sisCode: 'SIS0357',
    code: 9357,
    text: 'El comercio tiene activo control de fraude y no existe campo ds_merchant_merchantscf'
  },
  {
    sisCode: 'SIS0358',
    code: 9358,
    text: 'La entidad no dispone de pago iUPAY'
  },
  {
    sisCode: 'SIS0359',
    code: 9359,
    text: 'El comercio solamente permite pago de tributos y no se está informando el campo Ds_Merchant_TaxReference'
  },
  {
    sisCode: 'SIS0370',
    code: 9370,
    text: 'Error en formato Scf_Merchant_Nif. Longitud máxima 16'
  },
  {
    sisCode: 'SIS0371',
    code: 9371,
    text: 'Error en formato Scf_Merchant_Name. Longitud máxima 30'
  },
  {
    sisCode: 'SIS0372',
    code: 9372,
    text: 'Error en formato Scf_Merchant_First_Name. Longitud máxima 30'
  },
  {
    sisCode: 'SIS0373',
    code: 9373,
    text: 'Error en formato Scf_Merchant_Last_Name. Longitud máxima 30'
  },
  {
    sisCode: 'SIS0374',
    code: 9374,
    text: 'Error en formato Scf_Merchant_User. Longitud máxima 45'
  },
  {
    sisCode: 'SIS0375',
    code: 9375,
    text: "Error en formato Scf_Affinity_Card. Valores posibles 'S' o 'N'. Longitud máxima 1"
  },
  {
    sisCode: 'SIS0376',
    code: 9376,
    text: "Error en formato Scf_Payment_Financed. Valores posibles 'S' o 'N'. Longitud máxima 1"
  },
  {
    sisCode: 'SIS0377',
    code: 9377,
    text: 'Error en formato Scf_Ticket_Departure_Point. Longitud máxima 30'
  },
  {
    sisCode: 'SIS0378',
    code: 9378,
    text: 'Error en formato Scf_Ticket_Destination. Longitud máxima 30'
  },
  {
    sisCode: 'SIS0379',
    code: 9379,
    text: 'Error en formato Scf_Ticket_Departure_Date. Debe tener formato yyyyMMddHHmmss.'
  },
  {
    sisCode: 'SIS0380',
    code: 9380,
    text: 'Error en formato Scf_Ticket_Num_Passengers. Longitud máxima 1.'
  },
  {
    sisCode: 'SIS0381',
    code: 9381,
    text: 'Error en formato Scf_Passenger_Dni. Longitud máxima 16.'
  },
  {
    sisCode: 'SIS0382',
    code: 9382,
    text: 'Error en formato Scf_Passenger_Name. Longitud máxima 30.'
  },
  {
    sisCode: 'SIS0383',
    code: 9383,
    text: 'Error en formato Scf_Passenger_First_Name. Longitud máxima 30.'
  },
  {
    sisCode: 'SIS0384',
    code: 9384,
    text: 'Error en formato Scf_Passenger_Last_Name. Longitud máxima 30.'
  },
  {
    sisCode: 'SIS0385',
    code: 9385,
    text: "Error en formato Scf_Passenger_Check_Luggage. Valores posibles 'S' o 'N'. Longitud máxima 1."
  },
  {
    sisCode: 'SIS0386',
    code: 9386,
    text: "Error en formato Scf_Passenger_Special_luggage. Valores posibles 'S' o 'N'. Longitud máxima 1."
  },
  {
    sisCode: 'SIS0387',
    code: 9387,
    text: "Error en formato Scf_Passenger_Insurance_Trip. Valores posibles 'S' o 'N'. Longitud máxima 1."
  },
  {
    sisCode: 'SIS0388',
    code: 9388,
    text: "Error en formato Scf_Passenger_Type_Trip. Valores posibles 'N' o 'I'. Longitud máxima 1."
  },
  {
    sisCode: 'SIS0389',
    code: 9389,
    text: "Error en formato Scf_Passenger_Pet. Valores posibles 'S' o 'N'. Longitud máxima 1."
  },
  {
    sisCode: 'SIS0390',
    code: 9390,
    text: "Error en formato Scf_Order_Channel. Valores posibles 'M'(móvil), 'P'(PC) o 'T'(Tablet)"
  },
  {
    sisCode: 'SIS0391',
    code: 9391,
    text: 'Error en formato Scf_Order_Total_Products. Debe tener formato numérico y longitud máxima de 3.'
  },
  {
    sisCode: 'SIS0392',
    code: 9392,
    text: 'Error en formato Scf_Order_Different_Products. Debe tener formato numérico y longitud máxima de 3.'
  },
  {
    sisCode: 'SIS0393',
    code: 9393,
    text: 'Error en formato Scf_Order_Amount. Debe tener formato numérico y longitud máxima de 19.'
  },
  {
    sisCode: 'SIS0394',
    code: 9394,
    text: 'Error en formato Scf_Order_Max_Amount. Debe tener formato numérico y longitud máxima de 19.'
  },
  {
    sisCode: 'SIS0395',
    code: 9395,
    text: "Error en formato Scf_Order_Coupon. Valores posibles 'S' o 'N'"
  },
  {
    sisCode: 'SIS0396',
    code: 9396,
    text: 'Error en formato Scf_Order_Show_Type. Debe longitud máxima de 30.'
  },
  {
    sisCode: 'SIS0397',
    code: 9397,
    text: 'Error en formato Scf_Wallet_Identifier'
  },
  {
    sisCode: 'SIS0398',
    code: 9398,
    text: 'Error en formato Scf_Wallet_Client_Identifier'
  },
  {
    sisCode: 'SIS0399',
    code: 9399,
    text: 'Error en formato Scf_Merchant_Ip_Address'
  },
  {
    sisCode: 'SIS0400',
    code: 9400,
    text: 'Error en formato Scf_Merchant_Proxy'
  },
  {
    sisCode: 'SIS0401',
    code: 9401,
    text: 'Error en formato Ds_Merchant_Mail_Phone_Number. Debe ser numérico y de longitud máxima 19'
  },
  {
    sisCode: 'SIS0402',
    code: 9402,
    text: 'Error en llamada a SafetyPay para solicitar token url'
  },
  {
    sisCode: 'SIS0403',
    code: 9403,
    text: 'Error en proceso de solicitud de token url a SafetyPay'
  },
  { sisCode: 'SIS0404', code: 9404, text: 'Error en una petición a SafetyPay' },
  {
    sisCode: 'SIS0405',
    code: 9405,
    text: 'Solicitud de token url denegada  SAFETYPAY'
  },
  {
    sisCode: 'SIS0406',
    code: 9406,
    text: 'El sector del comercio no está permitido para realizar un pago de premio de apuesta (Gambling)'
  },
  {
    sisCode: 'SIS0407',
    code: 9407,
    text: 'El importe de la operación supera el máximo permitido para realizar un pago de premio de apuesta(Gambling)'
  },
  {
    sisCode: 'SIS0408',
    code: 9408,
    text: 'La tarjeta debe de haber operado durante el último año para poder realizar un pago de premio de apuesta (Gambling)'
  },
  {
    sisCode: 'SIS0409',
    code: 9409,
    text: 'La tarjeta debe ser una Visa o MasterCard nacional para realizar un pago de premio de apuesta (Gambling)'
  },
  {
    sisCode: 'SIS0410',
    code: 9410,
    text: 'Bloqueo por Operación con Tarjeta Privada del Cajamar, en comercio que no es de Cajamar'
  },
  {
    sisCode: 'SIS0411',
    code: 9411,
    text: 'No existe el comercio en la tabla de datos adicionales de RSI Directo'
  },
  { sisCode: 'SIS0412', code: 9412, text: 'La firma enviada no es correcta' },
  {
    sisCode: 'SIS0413',
    code: 9413,
    text: 'La operación ha sido denegada por Lynx'
  },
  { sisCode: 'SIS0414', code: 9414, text: 'El plan de ventas no es correcto' },
  {
    sisCode: 'SIS0415',
    code: 9415,
    text: 'El tipo de producto no es correcto'
  },
  {
    sisCode: 'SIS0416',
    code: 9416,
    text: 'Importe no permitido en devolucion'
  },
  { sisCode: 'SIS0417', code: 9417, text: 'Fecha de devolucion no permitida' },
  { sisCode: 'SIS0418', code: 9418, text: 'No existe plan de ventas vigente' },
  { sisCode: 'SIS0419', code: 9419, text: 'Tipo de cuenta no permitida' },
  {
    sisCode: 'SIS0420',
    code: 9420,
    text: 'El comercio no dispone de formas de pago para esta operación'
  },
  {
    sisCode: 'SIS0421',
    code: 9421,
    text: 'Tarjeta no permitida. No es producto Agro'
  },
  { sisCode: 'SIS0422', code: 9422, text: 'Faltan datos para operacion Agro' },
  { sisCode: 'SIS0423', code: 9423, text: 'CNPJ del comecio incorrecto' },
  {
    sisCode: 'SIS0424',
    code: 9424,
    text: 'No se ha encontrado el establecimiento'
  },
  { sisCode: 'SIS0425', code: 9425, text: 'No se ha encontrado la tarjeta' },
  {
    sisCode: 'SIS0426',
    code: 9426,
    text: 'Enrrutamiento no valido para el comercio'
  },
  {
    sisCode: 'SIS0427',
    code: 9427,
    text: 'La conexion con CECA no ha sido posible'
  },
  { sisCode: 'SIS0428', code: 9428, text: 'Operacion debito no segura' },
  {
    sisCode: 'SIS0429',
    code: 9429,
    text: 'Error en la versión  (Ds_SignatureVersion)'
  },
  {
    sisCode: 'SIS0430',
    code: 9430,
    text: 'Error al decodificar el parámetro Ds_MerchantParameters'
  },
  {
    sisCode: 'SIS0431',
    code: 9431,
    text: 'Error del objeto JSON que se envía codificado en el parámetro Ds_MerchantParameters'
  },
  { sisCode: 'SIS0432', code: 9432, text: 'FUC del comercio erróneo' },
  { sisCode: 'SIS0433', code: 9433, text: 'Terminal del comercio erróneo' },
  { sisCode: 'SIS0434', code: 9434, text: 'Formato de pedido no válido' },
  {
    sisCode: 'SIS0435',
    code: 9435,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0436',
    code: 9436,
    text: 'Error en la construcción del elemento'
  },
  {
    sisCode: 'SIS0437',
    code: 9437,
    text: 'Error en la construcción del elemento'
  },
  {
    sisCode: 'SIS0438',
    code: 9438,
    text: 'Error en la construcción del elemento'
  },
  {
    sisCode: 'SIS0439',
    code: 9439,
    text: 'Error en la construcción del elemento'
  },
  {
    sisCode: 'SIS0440',
    code: 9440,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0442',
    code: 9442,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0443',
    code: 9443,
    text: 'No se permite pago en terminales ONEY con tarjetas ajenas'
  },
  {
    sisCode: 'SIS0444',
    code: 9444,
    text: 'Se está intentando acceder usando firmas antiguas y el comercio está configurado como HMAC  SHA256'
  },
  {
    sisCode: 'SIS0445',
    code: 9445,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0446',
    code: 9446,
    text: 'Para terminales Oney es obligatorio indicar la forma de pago'
  },
  {
    sisCode: 'SIS0448',
    code: 9448,
    text: 'El comercio no tiene el método de Pago Diners'
  },
  {
    sisCode: 'SIS0449',
    code: 9449,
    text: 'El comercio tiene configurado «Prohibir Pago A»'
  },
  {
    sisCode: 'SIS0450',
    code: 9450,
    text: 'El comercio tiene configurado «Prohibir Pago A AMEX»'
  },
  {
    sisCode: 'SIS0451',
    code: 9451,
    text: 'El comercio tiene el método de pago «Prohibir Pago A»'
  },
  {
    sisCode: 'SIS0453',
    code: 9453,
    text: 'El comercio no tiene configurado  método de pago «Pago JCB»'
  },
  {
    sisCode: 'SIS0454',
    code: 9454,
    text: 'El comercio no tiene configurado métoco de pago «Pago Amex»'
  },
  {
    sisCode: 'SIS0455',
    code: 9455,
    text: 'El comercio no tiene el método de pago «Tarjetas Propias»'
  },
  {
    sisCode: 'SIS0456',
    code: 9456,
    text: 'El comercio no tiene cnfigurado Segundo Intento'
  },
  {
    sisCode: 'SIS0459',
    code: 9459,
    text: 'El comercio no tiene configurado el método de pago «Pago JCB»'
  },
  {
    sisCode: 'SIS0460',
    code: 9460,
    text: 'El comercio no tiene el método de pago «Pago AMEX»'
  },
  {
    sisCode: 'SIS0461',
    code: 9461,
    text: 'El comercio no tiene el método de pago «Pago AMEX»'
  },
  {
    sisCode: 'SIS0462',
    code: 9462,
    text: 'Método de pago Seguro no disponible por la entrada Host to Host'
  },
  {
    sisCode: 'SIS0463',
    code: 9463,
    text: 'El comercio está intentando realizar una operación no segura sin metodo de pago No seguro'
  },
  {
    sisCode: 'SIS0464',
    code: 9464,
    text: 'El comercio no tiene el método de pago «MasterCard Comercial»'
  },
  {
    sisCode: 'SIS0465',
    code: 9465,
    text: 'El comercio no tiene el método de pago «Tradicional Mundial»'
  },
  {
    sisCode: 'SIS0466',
    code: 9466,
    text: 'La referencia que se está utilizando no existe.'
  },
  {
    sisCode: 'SIS0467',
    code: 9467,
    text: 'La referencia que se está utilizando está dada de baja'
  },
  {
    sisCode: 'SIS0468',
    code: 9468,
    text: 'Se está utilizando una referencia que se generó con un adquirente distinto al adquirente que la utiliza.'
  },
  {
    sisCode: 'SIS0469',
    code: 9469,
    text: 'No se ha superado el proceso de fraude MR'
  },
  {
    sisCode: 'SIS0470',
    code: 9470,
    text: 'La solicitud del primer factor ha fallado.SDK'
  },
  {
    sisCode: 'SIS0471',
    code: 9471,
    text: 'Error en la URL de redirección de solicitud del primer factor.PPII'
  },
  {
    sisCode: 'SIS0472',
    code: 9472,
    text: 'Error al montar la petición de Autenticación de PPII'
  },
  {
    sisCode: 'SIS0473',
    code: 9473,
    text: 'la respuesta de la petición de Autenticación de PPII es nula.'
  },
  {
    sisCode: 'SIS0474',
    code: 9474,
    text: 'El statusCode de la respuesta de la petición de Autenticación de PPII es nulo'
  },
  {
    sisCode: 'SIS0475',
    code: 9475,
    text: 'El idOperación de la respuesta de la petición de Autenticación de PPII es nulo'
  },
  {
    sisCode: 'SIS0476',
    code: 9476,
    text: 'Error tratando la respuesta de la Autenticación de PPII'
  },
  {
    sisCode: 'SIS0477',
    code: 9477,
    text: 'Se ha superado el tiempo definido entre el paso 1 y 2 de PPI'
  },
  {
    sisCode: 'SIS0478',
    code: 9478,
    text: 'Error tratando la respuesta de la Autorización de PPII'
  },
  {
    sisCode: 'SIS0479',
    code: 9479,
    text: 'La respuesta de la petición de Autorización de PPII es nula'
  },
  {
    sisCode: 'SIS0480',
    code: 9480,
    text: 'El statusCode de la respuesta de la petición de Autorización de PPII es nulo.'
  },
  {
    sisCode: 'SIS0481',
    code: 9481,
    text: 'El comercio no es Payment Facilitator'
  },
  {
    sisCode: 'SIS0482',
    code: 9482,
    text: 'El idOperación de la respuesta de una Autorización OK es nulo o no coincide con el idOp. de la Auth.'
  },
  {
    sisCode: 'SIS0483',
    code: 9483,
    text: 'La respuesta de la petición de devolución de PPII es nula.'
  },
  {
    sisCode: 'SIS0484',
    code: 9484,
    text: 'El statusCode o el idPetición de la respuesta de la petición de Devolución de PPII es nulo.'
  },
  {
    sisCode: 'SIS0485',
    code: 9485,
    text: 'BIZUM ha devuelto un KO en la devolución'
  },
  {
    sisCode: 'SIS0486',
    code: 9486,
    text: 'La respuesta a la consulta PPII es nula'
  },
  {
    sisCode: 'SIS0487',
    code: 9487,
    text: 'El comercio no tiene habilitado el método de pago Paygold'
  },
  {
    sisCode: 'SIS0488',
    code: 9488,
    text: 'El comercio no tiene el método de pago «Pago MOTO/Manual»'
  },
  {
    sisCode: 'SIS0489',
    code: 9489,
    text: 'Operacion MPI Externo no permitida'
  },
  {
    sisCode: 'SIS0490',
    code: 9490,
    text: 'Se reciben parametros MPI Soporte en operacion MPI Externo'
  },
  {
    sisCode: 'SIS0491',
    code: 9491,
    text: 'SecLevel no permitido en operacion MPI Externo'
  },
  {
    sisCode: 'SIS0492',
    code: 9492,
    text: 'Se reciben parametros MPI Externo en operacion MPI Soporte'
  },
  {
    sisCode: 'SIS0493',
    code: 9493,
    text: 'Se reciben parametros de MPI en operacion no segura'
  },
  { sisCode: 'SIS0494', code: 9494, text: 'Firma Obsoleta' },
  {
    sisCode: 'SIS0495',
    code: 9495,
    text: 'Configuración incorrecta ApplePay, AndroidPay o Token'
  },
  {
    sisCode: 'SIS0496',
    code: 9496,
    text: 'No tiene dado de alta el método de pago AndroidPay'
  },
  {
    sisCode: 'SIS0497',
    code: 9497,
    text: 'No tiene dado de alta el método de pago ApplePay'
  },
  {
    sisCode: 'SIS0498',
    code: 9498,
    text: 'moneda / importe de la operación de ApplePay no coinciden'
  },
  {
    sisCode: 'SIS0499',
    code: 9499,
    text: 'Error obteniendo claves del comercio en Google/Apple Pay'
  },
  {
    sisCode: 'SIS0500',
    code: 9500,
    text: 'Error en el DCC Dinámico, se ha modificado la tarjeta.'
  },
  {
    sisCode: 'SIS0501',
    code: 9501,
    text: 'Error en La validación de datos enviados para genera el Id operación'
  },
  { sisCode: 'SIS0502', code: 9502, text: 'Error al validar Id Oper' },
  { sisCode: 'SIS0503', code: 9503, text: 'Error al validar el pedido' },
  {
    sisCode: 'SIS0504',
    code: 9504,
    text: 'Error al validar tipo de transacción'
  },
  { sisCode: 'SIS0505', code: 9505, text: 'Error al validar moneda' },
  { sisCode: 'SIS0506', code: 9506, text: 'Error al validar el importe' },
  { sisCode: 'SIS0507', code: 9507, text: 'Id Oper no tiene vigencia' },
  { sisCode: 'SIS0508', code: 9508, text: 'Error al validar Id Oper' },
  {
    sisCode: 'SIS0510',
    code: 9510,
    text: 'No se permite el envío de datos de tarjeta si se envía ID de operación'
  },
  {
    sisCode: 'SIS0511',
    code: 9511,
    text: 'Error en la respuesta de consulta de BINES'
  },
  {
    sisCode: 'SIS0515',
    code: 9515,
    text: 'El comercio tiene activado pago Amex en Perfil.'
  },
  {
    sisCode: 'SIS0516',
    code: 9516,
    text: 'Error al montar el mensaje de China Union Pay'
  },
  {
    sisCode: 'SIS0517',
    code: 9517,
    text: 'Error al establecer la clave  para China Union Pay'
  },
  {
    sisCode: 'SIS0518',
    code: 9518,
    text: 'Error al grabar los datos para pago China Union Pay'
  },
  { sisCode: 'SIS0519', code: 9519, text: 'Mensaje de autenticación erróneo' },
  {
    sisCode: 'SIS0520',
    code: 9520,
    text: 'El mensaje SecurePlus de sesión está vacío'
  },
  { sisCode: 'SIS0521', code: 9521, text: 'El xml de respuesta viene vacío' },
  {
    sisCode: 'SIS0522',
    code: 9522,
    text: 'No se han recibido parametros en datosentrada'
  },
  {
    sisCode: 'SIS0523',
    code: 9523,
    text: 'La firma calculada no coincide con la recibida en la respuesta'
  },
  {
    sisCode: 'SIS0524',
    code: 9524,
    text: 'el resultado de la autenticación 3DSecure MasterCard es PARes=«A» o VERes=«N» y no recibimos CAVV del emisor'
  },
  {
    sisCode: 'SIS0525',
    code: 9525,
    text: 'No se puede utilizar la tarjeta privada en este comercio'
  },
  { sisCode: 'SIS0526', code: 9526, text: 'La tarjeta no es china' },
  {
    sisCode: 'SIS0527',
    code: 9527,
    text: 'Falta el parametro obligatorio DS_MERCHANT_BUYERID'
  },
  {
    sisCode: 'SIS0528',
    code: 9528,
    text: 'Formato erróneo del parametro DS_MERCHANT_BUYERID en operación Sodexo Brasil'
  },
  {
    sisCode: 'SIS0529',
    code: 9529,
    text: 'No se permite operación recurrente en pagos con tarjeta Voucher'
  },
  {
    sisCode: 'SIS0530',
    code: 9530,
    text: 'La fecha de Anulación no puede superar en mas de 7 dias a la de Preautorización.'
  },
  {
    sisCode: 'SIS0531',
    code: 9531,
    text: 'La fecha de Anulación no puede superar en mas de 72 horas a la de Preautorización diferida'
  },
  {
    sisCode: 'SIS0532',
    code: 9532,
    text: 'La moneda de la petición no coincide con la devuelta'
  },
  {
    sisCode: 'SIS0533',
    code: 9533,
    text: 'El importe de la petición no coincide con el devuelto'
  },
  {
    sisCode: 'SIS0534',
    code: 9534,
    text: 'No se recibe recaudación emisora o referencia del recibo/tributo'
  },
  {
    sisCode: 'SIS0535',
    code: 9535,
    text: 'Pago de recibo/tributo fuera de plazo'
  },
  { sisCode: 'SIS0536', code: 9536, text: 'Recibo/tributo ya pagado' },
  {
    sisCode: 'SIS0537',
    code: 9537,
    text: 'Pago de recibo/tributo denegado por la entidad'
  },
  {
    sisCode: 'SIS0538',
    code: 9538,
    text: 'Rechazo en el pago de recibo/tributo'
  },
  { sisCode: 'SIS0539', code: 9539, text: 'Error en el envío de SMS' },
  {
    sisCode: 'SIS0540',
    code: 9540,
    text: 'El móvil enviado es demasiado largo (más de 12 posiciones)'
  },
  {
    sisCode: 'SIS0541',
    code: 9541,
    text: 'La referencia enviada es demasiada larga (más de 40 posiciones)'
  },
  {
    sisCode: 'SIS0542',
    code: 9542,
    text: 'Error genérico. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0543',
    code: 9543,
    text: 'Error, la tarjeta de la operación es DINERS y el comercio no tiene el método de pago «Pago DINERS» o «Pago Discover No Seguro»'
  },
  {
    sisCode: 'SIS0544',
    code: 9544,
    text: 'Error, la tarjeta de la operación es DINERS y el comercio no tiene el método de pago «Pago Discover No Seguro»'
  },
  { sisCode: 'SIS0545', code: 9545, text: 'Error DISCOVER' },
  { sisCode: 'SIS0546', code: 9546, text: 'Error DISCOVER' },
  { sisCode: 'SIS0547', code: 9547, text: 'Error DISCOVER' },
  { sisCode: 'SIS0548', code: 9548, text: 'Error DISCOVER' },
  { sisCode: 'SIS0549', code: 9549, text: 'Error DISCOVER' },
  {
    sisCode: 'SIS0550',
    code: 9550,
    text: 'ERROR en el gestor de envío de los SMS. Consulte con Soporte'
  },
  {
    sisCode: 'SIS0551',
    code: 9551,
    text: 'ERROR en el proceso de autenticación.'
  },
  {
    sisCode: 'SIS0552',
    code: 9552,
    text: "ERROR el resultado de la autenticacion PARes = 'U'"
  },
  {
    sisCode: 'SIS0553',
    code: 9553,
    text: 'ERROR se ha intentado hacer un pago con el método de pago UPI y la tarjeta no es china'
  },
  {
    sisCode: 'SIS0554',
    code: 9554,
    text: "ERROR el resultado de la autenticacion para UPI es PARes = 'U' y el comercio no tiene métodos de pago no seguros UPI EXPRESSPAY"
  },
  {
    sisCode: 'SIS0555',
    code: 9555,
    text: 'ERROR la IP de conexión del módulo de administración no esta entre las permitidas.'
  },
  {
    sisCode: 'SIS0556',
    code: 9556,
    text: 'Se envía pago Tradicional y el comercio no tiene pago Tradicional mundial ni Tradicional UE.'
  },
  {
    sisCode: 'SIS0557',
    code: 9557,
    text: 'Se envía pago Tarjeta en Archivo y el comercio no tiene pago Tradicional mundial ni Tradicional UE.'
  },
  {
    sisCode: 'SIS0558',
    code: 9558,
    text: 'ERROR, el formato de la fecha dsMerchantP2FExpiryDate es incorrecto'
  },
  {
    sisCode: 'SIS0559',
    code: 9559,
    text: 'ERROR el id Operacion de la respuesta en la autenticación PPII es nulo o no se ha obtenido de la autenticación final'
  },
  {
    sisCode: 'SIS0560',
    code: 9560,
    text: 'ERROR al enviar la notificacion de autenticacion al comercio'
  },
  {
    sisCode: 'SIS0561',
    code: 9561,
    text: 'ERROR el idOperación de la respuesta de una confirmacion separada OK es nulo o no coincide con el idOp. de la Confirmacion.'
  },
  {
    sisCode: 'SIS0562',
    code: 9562,
    text: 'ERROR la respuesta de la petición de confirmacion separada de PPII es nula.'
  },
  {
    sisCode: 'SIS0563',
    code: 9563,
    text: 'ERROR tratando la respuesta de la confirmacion separada de PPII.'
  },
  { sisCode: 'SIS0564', code: 9564, text: 'ERROR En la operación de DCC' },
  {
    sisCode: 'SIS0565',
    code: 9565,
    text: 'Formato del importe del campo Ds_Merchant_Amount excede del límite permitido.'
  },
  {
    sisCode: 'SIS0566',
    code: 9566,
    text: 'Error de acceso al nuevo Servidor Criptográfico.'
  },
  {
    sisCode: 'SIS0567',
    code: 9567,
    text: 'ERROR se ha intentado hacer un pago con una tarjeta china UPI y el comercio no tiene método de pago UPI'
  },
  {
    sisCode: 'SIS0568',
    code: 9568,
    text: 'Operacion de Inicia Petición rechazada, tipo de transacción erróneo'
  },
  {
    sisCode: 'SIS0569',
    code: 9569,
    text: 'Operacion de Inicia Petición rechazada, no se ha informado la tarjeta'
  },
  {
    sisCode: 'SIS0570',
    code: 9570,
    text: 'Operacion de Inicia Petición rechazada, se ha enviado tarjeta y referencia'
  },
  {
    sisCode: 'SIS0571',
    code: 9571,
    text: 'Operacion de autenticacion EMV3DS rechazada, protocolVersion no indicado'
  },
  {
    sisCode: 'SIS0572',
    code: 9572,
    text: 'Operacion de autenticacion EMV3DS rechazada, protocolVersion no reconocido'
  },
  {
    sisCode: 'SIS0573',
    code: 9573,
    text: 'Operacion de autenticacion EMV3DS rechazada, browserAcceptHeader no indicado'
  },
  {
    sisCode: 'SIS0574',
    code: 9574,
    text: 'Operacion de autenticacion EMV3DS rechazada, browserUserAgent no indicado'
  },
  {
    sisCode: 'SIS0575',
    code: 9575,
    text: 'Operacion de autenticacion EMV3DS rechazada, browserJavaEnabled no indicado'
  },
  {
    sisCode: 'SIS0576',
    code: 9576,
    text: 'Operacion de autenticacion EMV3DS rechazada, browserLanguage no indicado'
  },
  {
    sisCode: 'SIS0577',
    code: 9577,
    text: 'Operacion de autenticacion EMV3DS rechazada, browserColorDepth no indicado'
  },
  {
    sisCode: 'SIS0578',
    code: 9578,
    text: 'Operacion de autenticacion EMV3DS rechazada, browserScreenHeight no indicado'
  },
  {
    sisCode: 'SIS0579',
    code: 9579,
    text: 'Operacion de autenticacion EMV3DS rechazada, browserScreenWidth no indicado'
  },
  {
    sisCode: 'SIS0580',
    code: 9580,
    text: 'Operacion de autenticacion EMV3DS rechazada, browserTZ no indicado'
  },
  {
    sisCode: 'SIS0581',
    code: 9581,
    text: 'Operacion de autenticacion EMV3DS rechazada, datos DS_MERCHANT_EMV3DS no está indicado o es demasiado grande y no se puede convertir en JSON'
  },
  {
    sisCode: 'SIS0582',
    code: 9582,
    text: 'Operacion de autenticacion EMV3DS rechazada, threeDSServerTransID no indicado'
  },
  {
    sisCode: 'SIS0583',
    code: 9583,
    text: 'Operacion de autenticacion EMV3DS rechazada, threeDSCompInd no indicado'
  },
  {
    sisCode: 'SIS0584',
    code: 9584,
    text: 'Operacion de autenticacion EMV3DS rechazada, notificationURL no indicado'
  },
  {
    sisCode: 'SIS0585',
    code: 9585,
    text: 'Los datos EMV 3DS enviados no coinciden con los datos obtenidos en el inicia petición'
  },
  {
    sisCode: 'SIS0586',
    code: 9586,
    text: 'Operacion de autenticacion EMV3DS rechazada, PARes no indicado'
  },
  {
    sisCode: 'SIS0587',
    code: 9587,
    text: 'Operacion de autenticacion EMV3DS rechazada, MD no indicado'
  },
  {
    sisCode: 'SIS0588',
    code: 9588,
    text: 'Operacion de autenticacion EMV3DS rechazada, la versión no coincide entre los mensajes AuthenticationData y ChallengeResponse'
  },
  {
    sisCode: 'SIS0589',
    code: 9589,
    text: 'Operacion de autenticacion EMV3DS rechazada, respuesta sin CRes'
  },
  {
    sisCode: 'SIS0590',
    code: 9590,
    text: 'Operacion de autenticacion EMV3DS rechazada, error al desmontar la respuesta CRes'
  },
  {
    sisCode: 'SIS0591',
    code: 9591,
    text: 'Operacion de autenticacion EMV3DS rechazada, error la respuesta CRes viene sin threeDSServerTransID'
  },
  {
    sisCode: 'SIS0592',
    code: 9592,
    text: 'Error en la operacion de autenticacion EMV3DS'
  },
  {
    sisCode: 'SIS0593',
    code: 9593,
    text: 'Error en la operacion de autenticacion EMV3DS,el transStatus de la consulta final de la operación no está definido.'
  },
  {
    sisCode: 'SIS0594',
    code: 9594,
    text: 'Operacion de autenticacion EMV3DS rechazada, CRes no indicado'
  },
  {
    sisCode: 'SIS0595',
    code: 9595,
    text: 'El comercio indicado no tiene métodos de pago seguros permitidos en  EMV3DS V2'
  },
  {
    sisCode: 'SIS0596',
    code: 9596,
    text: 'Operacion de inicia petición rechazada,moneda errónea'
  },
  {
    sisCode: 'SIS0597',
    code: 9597,
    text: 'Operacion de  inicia petición  rechazada,importe erróneo'
  },
  {
    sisCode: 'SIS0598',
    code: 9598,
    text: 'Error en la operacion de autenticacion EMV3DS, no se permite hacer fallback a 3DSecure v1.'
  },
  {
    sisCode: 'SIS0599',
    code: 9599,
    text: 'Error en la operacion de autenticacion EMV3DS'
  },
  {
    sisCode: 'SIS0600',
    code: 9600,
    text: 'Error en el proceso de autenticación 3DSecure v2 - Respuesta Areq N'
  },
  {
    sisCode: 'SIS0601',
    code: 9601,
    text: 'Error en el proceso de autenticación 3DSecure v2 - Respuesta Areq R'
  },
  {
    sisCode: 'SIS0602',
    code: 9602,
    text: 'Error en el proceso de autenticación 3DSecure v2 - Respuesta Areq U'
  },
  {
    sisCode: 'SIS0644',
    code: 9644,
    text: 'Error en el proceso de autenticación 3DSecure v2 - Se envían datos de la entrada IniciaPetición a la entrada TrataPetición'
  },
  {
    sisCode: 'SIS0603',
    code: 9603,
    text: 'Error en el parámetro DS_MERCHANT_DCC de DCC enviado en operacion H2H (REST y SOAP)'
  },
  {
    sisCode: 'SIS0604',
    code: 9604,
    text: 'Error en los datos de DCC enviados en el parámetro DS_MERCHANT_DCC en operacion H2H (REST y SOAP)'
  },
  {
    sisCode: 'SIS0605',
    code: 9605,
    text: 'Error en el parámetro DS_MERCHANT_MPIEXTERNAL enviado en operacion H2H (REST y SOAP)'
  },
  {
    sisCode: 'SIS0606',
    code: 9606,
    text: 'Error en los datos de MPI enviados en el parámetro DS_MERCHANT_MPIEXTERNAL en operacion H2H (REST y SOAP)'
  },
  {
    sisCode: 'SIS0607',
    code: 9607,
    text: 'Error del parámetro TXID de MPI enviado en el parámetro DS_MERCHANT_MPIEXTERNAL en operacion H2H (REST y SOAP) es erróneo'
  },
  {
    sisCode: 'SIS0608',
    code: 9608,
    text: 'Error del parámetro CAVV de MPI enviado en el parámetro DS_MERCHANT_MPIEXTERNAL en operacion H2H (REST y SOAP) es erróneo'
  },
  {
    sisCode: 'SIS0609',
    code: 9609,
    text: 'Error del parámetro ECI de MPI enviado en el parámetro DS_MERCHANT_MPIEXTERNAL en operacion H2H (REST y SOAP) es erróneo'
  },
  {
    sisCode: 'SIS0610',
    code: 9610,
    text: 'Error del parámetro threeDSServerTransID de MPI enviado en el parámetro DS_MERCHANT_MPIEXTERNAL en operacion H2H (REST y SOAP) es erróneo'
  },
  {
    sisCode: 'SIS0611',
    code: 9611,
    text: 'Error del parámetro dsTransID de MPI enviado en el parámetro DS_MERCHANT_MPIEXTERNAL en operacion H2H (REST y SOAP) es erróneo'
  },
  {
    sisCode: 'SIS0612',
    code: 9612,
    text: 'Error del parámetro authenticacionValue de MPI enviado en el parámetro DS_MERCHANT_MPIEXTERNAL en operacion H2H (REST y SOAP) es erróneo'
  },
  {
    sisCode: 'SIS0613',
    code: 9613,
    text: 'Error del parámetro protocolVersion de MPI enviado en el parámetro DS_MERCHANT_MPIEXTERNAL en operacion H2H (REST y SOAP) es erróneo'
  },
  {
    sisCode: 'SIS0614',
    code: 9614,
    text: 'Error del parámetro Eci de MPI enviado en el parámetro DS_MERCHANT_MPIEXTERNAL en operacion H2H (REST y SOAP) es erróneo'
  },
  {
    sisCode: 'SIS0615',
    code: 9615,
    text: 'Error en MPI Externo, marca de tarjeta no permitida'
  },
  {
    sisCode: 'SIS0616',
    code: 9616,
    text: 'Error del parámetro DS_MERCHANT_EXCEP_SCA tiene un valor erróneo'
  },
  {
    sisCode: 'SIS0617',
    code: 9617,
    text: 'Error del parámetro DS_MERCHANT_EXCEP_SCA es de tipo MIT y no vienen datos de COF o de pago por referencia'
  },
  {
    sisCode: 'SIS0618',
    code: 9618,
    text: 'Error la exención enviada no está permitida y el comercio no está preparado para autenticar'
  },
  {
    sisCode: 'SIS0619',
    code: 9619,
    text: 'El comercio no tiene el método de pago Amazon'
  },
  {
    sisCode: 'SIS0620',
    code: 9620,
    text: 'Error DCC por importe más alto del permitido'
  },
  {
    sisCode: 'SIS0621',
    code: 9621,
    text: 'El amazonOrderReferenceId no es válido'
  },
  {
    sisCode: 'SIS0622',
    code: 9622,
    text: 'Error al realizar los cálculos de DCC en la operación'
  },
  {
    sisCode: 'SIS0623',
    code: 9623,
    text: 'Error al realizar los cálculos de DCC en la operación'
  },
  {
    sisCode: 'SIS0624',
    code: 9624,
    text: 'Error al realizar los cálculos de DCC en la operación'
  },
  {
    sisCode: 'SIS0625',
    code: 9625,
    text: 'Error en la anulación del pago, porque ya existe una devolución asociada a ese pago'
  },
  {
    sisCode: 'SIS0626',
    code: 9626,
    text: 'Error en la devolución del pago, ya existe una anulación de la operación que se desea devolver'
  },
  {
    sisCode: 'SIS0627',
    code: 9627,
    text: 'El número de referencia o solicitud enviada por CRTM no válida.'
  },
  {
    sisCode: 'SIS0628',
    code: 9628,
    text: 'Error la operación de viene con datos de 3DSecure y viene por la entrada SERMEPA'
  },
  {
    sisCode: 'SIS0629',
    code: 9629,
    text: 'Error no existe la operación de confirmación separada sobre la que realizar la anulación'
  },
  {
    sisCode: 'SIS0630',
    code: 9630,
    text: 'Error en la anulación de confirmación separada, ya existe una devolución asociada a la confirmación separada'
  },
  {
    sisCode: 'SIS0631',
    code: 9631,
    text: 'Error en la anulación de confirmación separada, ya existe una anulación asociada a la confirmación separada'
  },
  {
    sisCode: 'SIS0632',
    code: 9632,
    text: 'Error la confirmacion separada sobre la que se desea anular no está autorizada'
  },
  {
    sisCode: 'SIS0633',
    code: 9633,
    text: 'La fecha de Anulación no puede superar en los días configurados a la confirmacion separada.'
  },
  {
    sisCode: 'SIS0634',
    code: 9634,
    text: 'Error no existe la operación de pago sobre la que realizar la anulación'
  },
  {
    sisCode: 'SIS0635',
    code: 9635,
    text: 'Error en la anulación del pago, ya existe una anulación asociada al pago'
  },
  {
    sisCode: 'SIS0636',
    code: 9636,
    text: 'Error el pago que se desea anular no está autorizado'
  },
  {
    sisCode: 'SIS0637',
    code: 9637,
    text: 'La fecha de Anulación no puede superar en los días configurados al pago.'
  },
  {
    sisCode: 'SIS0638',
    code: 9638,
    text: 'Error existe más de una devolución que se quiere anular y no se ha especificado cual.'
  },
  {
    sisCode: 'SIS0639',
    code: 9639,
    text: 'Error no existe la operación de devolución sobre la que realizar la anulación'
  },
  {
    sisCode: 'SIS0640',
    code: 9640,
    text: 'Error la confirmacion separada sobre la que se desea anular no está autorizada o ya está anulada'
  },
  {
    sisCode: 'SIS0641',
    code: 9641,
    text: 'La fecha de Anulación no puede superar en los días configurados a la devolución.'
  },
  {
    sisCode: 'SIS0642',
    code: 9642,
    text: 'La fecha de la preautorización que se desea reemplazar no puede superar los 30 días de antigüedad'
  },
  {
    sisCode: 'SIS0643',
    code: 9643,
    text: 'Error al obtener la personalización del comercio'
  },
  {
    sisCode: 'SIS0650',
    code: 9650,
    text: 'Error, la MAC no es correcta en la mensajeria de pago de tributos'
  },
  {
    sisCode: 'SIS0651',
    code: 9651,
    text: 'Se exige SCA y el comercio no está preparado para autenticar.'
  },
  {
    sisCode: 'SIS0652',
    code: 9652,
    text: 'Error la exención y la configuración del comercio exigen no SCA y el comercio no está configurado para autorizar con dicha marca de tarjeta'
  },
  {
    sisCode: 'SIS0653',
    code: 9653,
    text: 'Operacion de autenticacion rechazada, browserJavascriptEnabled no indicado'
  },
  {
    sisCode: 'SIS0654',
    code: 9654,
    text: 'Error, solo se permite usar Ds_MerchantOTA'
  },
  {
    sisCode: 'SIS0655',
    code: 9655,
    text: 'Error, se indican datos de 3RI-Recurring y la versión que se envía en el trataPetición no es 2.2'
  },
  {
    sisCode: 'SIS0656',
    code: 9656,
    text: 'Error, se indican datos de 3RI-Recurring y el campo threeDSRequestorPriorAuthenticationInfo en el trataPetición es vacío'
  },
  {
    sisCode: 'SIS0657',
    code: 9657,
    text: 'Error, se indican datos de 3RI-OTA y la versión que se envía en el trataPetición no es 2.2'
  },
  {
    sisCode: 'SIS0658',
    code: 9658,
    text: 'Error, se indican datos de 3RI-OTA y el campo threeDSRequestorPriorAuthenticationInfo en el trataPetición es vacío'
  },
  {
    sisCode: 'SIS0659',
    code: 9659,
    text: 'Error, se indican datos de 3RI-OTA para Master y el campo threeDSReqPriorRef del campo threeDSRequestorPriorAuthenticationInfo en el trataPetición es vacío'
  },
  {
    sisCode: 'SIS0660',
    code: 9660,
    text: 'Error, se indican datos de 3RI-OTA para Master y el campo authenticationValue en el trataPetición es vacío'
  },
  {
    sisCode: 'SIS0661',
    code: 9661,
    text: 'Error, se indican datos de 3RI-OTA para Master y el campo Eci en el trataPetición es vacío'
  },
  {
    sisCode: 'SIS0662',
    code: 9662,
    text: 'Error, el comercio no está entre los permitidos para realizar confirmaciones parciales.'
  },
  {
    sisCode: 'SIS0663',
    code: 9663,
    text: 'No existe datos de Inicia Petición que concuerden con los enviados por el comercio en el mensaje Trata Petición'
  },
  {
    sisCode: 'SIS0664',
    code: 9664,
    text: 'No se envía el elemento Id Transaccion 3DS Server en el mensaje Trata Petición y dicho elemento existe en el mensaje Inicia Petición'
  },
  {
    sisCode: 'SIS0665',
    code: 9665,
    text: 'La moneda indicada por el comercio en el mensaje Trata Petición no corresponde con la enviada en el mensaje Inicia Petición'
  },
  {
    sisCode: 'SIS0666',
    code: 9666,
    text: 'El importe indicado por el comercio en el mensaje Trata Petición no corresponde con el enviado en el mensaje Inicia Petición'
  },
  {
    sisCode: 'SIS0667',
    code: 9667,
    text: 'El tipo de operación indicado por el comercio en el mensaje Trata Petición no corresponde con el enviado en el mensaje Inicia Petición'
  },
  {
    sisCode: 'SIS0668',
    code: 9668,
    text: 'La referencia indicada por el comercio en el mensaje Trata Petición no corresponde con la enviada en el mensaje Inicia Petición'
  },
  {
    sisCode: 'SIS0669',
    code: 9669,
    text: 'El Id Oper Insite indicado por el comercio en el mensaje Trata Petición no corresponde con el enviado en el mensaje Inicia Petición'
  },
  {
    sisCode: 'SIS0670',
    code: 9670,
    text: 'La tarjeta indicada por el comercio en el mensaje Trata Petición no corresponde con la enviada en el mensaje Inicia Petición'
  },
  { sisCode: 'SIS0671', code: 9671, text: 'Denegación por TRA Lynx' },
  {
    sisCode: 'SIS0672',
    code: 9672,
    text: 'Fallo en la autenticación. Bloqueo tras tres intentos.'
  },
  {
    sisCode: 'SIS0673',
    code: 9673,
    text: 'Operación cancelada. El usuario no desea seguir.'
  },
  { sisCode: 'SIS0674', code: 9674, text: 'Abono rechazado por beneficiario.' },
  { sisCode: 'SIS0675', code: 9675, text: 'Cargo rechazado por ordenante.' },
  {
    sisCode: 'SIS0676',
    code: 9676,
    text: 'El procesador rechaza la operación.'
  },
  { sisCode: 'SIS0677', code: 9677, text: 'Saldo disponible insuficiente.' },
  {
    sisCode: 'SIS0678',
    code: 9678,
    text: 'La versión de 3DSecure indicada en el Trata Petición es errónea o es superior a la devuelva en el inicia petición'
  },
  {
    sisCode: 'SIS0680',
    code: null,
    text: 'Error en la autenticación EMV3DS y la marca no permite hacer fallback a 3dSecure 1.0'
  },
  {
    sisCode: 'SIS0681',
    code: 9681,
    text: 'Error al insertar los datos de autenticación en una operación con MPI Externo'
  },
  {
    sisCode: 'SIS0682',
    code: 9682,
    text: 'Consulta TRA. El parámetro Ds_Merchant_TRA_Data es erróneo'
  },
  {
    sisCode: 'SIS0683',
    code: 9683,
    text: 'Consulta TRA. Falta el parámetro Ds_Merchant_TRA_Type'
  },
  {
    sisCode: 'SIS0684',
    code: 9684,
    text: 'Consulta TRA. El parámetro Ds_Merchant_TRA_Type tiene un valor no permitido'
  },
  {
    sisCode: 'SIS0685',
    code: 9685,
    text: 'Consulta TRA. El perfil del comercio no le permite exención TRA'
  },
  {
    sisCode: 'SIS0686',
    code: 9686,
    text: 'Consulta TRA. La configuración del comercio no le permite usar el TRA de Redsys'
  },
  {
    sisCode: 'SIS0687',
    code: 9687,
    text: 'Actualización resultado TRA. Falta el parámetro Ds_Merchant_TRA_ResultAuth'
  },
  {
    sisCode: 'SIS0688',
    code: 9688,
    text: 'Actualización resultado TRA. El parámetro Ds_Merchant_TRA_ResultAuth tiene un valor no permitido'
  },
  {
    sisCode: 'SIS0689',
    code: 9689,
    text: 'Actualización resultado TRA. La operación es de tipo actualización de resultado  y no se localiza la operación de consulta previa.'
  },
  {
    sisCode: 'SIS0690',
    code: 9690,
    text: 'Actualización resultado TRA.  Error en la actualización del resultado'
  },
  {
    sisCode: 'SIS0692',
    code: 9692,
    text: 'Petición entrada PSP para un terminal que no está asociado a un PSP'
  },
  {
    sisCode: 'SIS0754',
    code: 9754,
    text: 'La tarjeta no permite autenticación en versión 2'
  },
  {
    sisCode: 'SIS0800',
    code: null,
    text: 'BIZUM. Error en la respuesta de inicio de RTP.'
  },
  {
    sisCode: 'SIS0801',
    code: null,
    text: 'BUZUM RTP. No se especifica el tlf o la url de notificación.'
  },
  {
    sisCode: 'SIS0802',
    code: 9802,
    text: 'Envia un valor incorrecto en el parémtro DS_MERCHANT_COF_TYPE'
  },
  {
    sisCode: 'SIS0812',
    code: 9812,
    text: 'Error obteniendo los parametros XPAYDECODEDDATA'
  },
  {
    sisCode: 'SIS0813',
    code: 9813,
    text: 'Error obteniendo los parametros del parámetro Ds_Merchant_BrClientData'
  },
  {
    sisCode: 'SIS0814',
    code: 9814,
    text: 'Error el tipo de operación enviado en el segundo trataPetición no coincide con el de la operación'
  },
  {
    sisCode: 'SIS0815',
    code: 9815,
    text: 'Error, ya existe una operación de Paygold con los mismos datos en proceso de autorizar o ya autorizada'
  },
  {
    sisCode: 'SIS0816',
    code: 9816,
    text: 'Error en operación con XPAY. Operación con token y sin criptograma'
  },
  {
    sisCode: 'SIS0817',
    code: 9817,
    text: 'Operacion aunteticada por 3RI no se puede procesar por estado incorrecto'
  },
  {
    sisCode: 'SIS0818',
    code: 9818,
    text: 'Operacion autenticada por 3RI no se puede procesar por moneda incorrecta'
  },
  {
    sisCode: 'SIS0819',
    code: 9819,
    text: 'Operacion autenticada por 3RI no se puede procesar por importe incorrecto'
  },
  {
    sisCode: 'SIS0820',
    code: 9820,
    text: 'Operacion autenticada por 3RI no se puede procesar por estar expirada'
  },
  {
    sisCode: 'SIS0821',
    code: 9821,
    text: 'Operacion 3RI no encontrada, ID_OPER_3RI incorrecto'
  },
  {
    sisCode: 'SIS0822',
    code: 9822,
    text: 'Importe incorrecto en datos adicionales de autenticacion 3RI. El importe total acumulado supera el importe de la autenticacion'
  },
  {
    sisCode: 'SIS0823',
    code: 9823,
    text: 'Operacion autenticada por 3RI no se puede procesar, la marca de tarjeta no tiene su método de pago asociado'
  },
  { sisCode: 'SIS0824', code: 9824, text: 'Error registrando datos 3RI' },
  {
    sisCode: 'SIS0836',
    code: 9836,
    text: 'Error, no existe operación original de paygold con los datos proporcionados'
  },
  {
    sisCode: 'SIS0837',
    code: 9837,
    text: 'Error, la fecha indicada en el parámetro Ds_Merchant_P2f_ExpiryDate no tiene un formato correcto o está vacía'
  },
  {
    sisCode: 'SIS0843',
    code: 9843,
    text: 'Error en los datos Ds_Merchant_TokenData.'
  },
  {
    sisCode: 'SIS0844',
    code: 9844,
    text: 'El perfil del comercio no está configurado para aceptar devoluciones de tributos.'
  },
  { sisCode: '101', code: 101, text: 'Tarjeta caducada' },
  {
    sisCode: '106',
    code: 106,
    text: 'Tarjeta bloqueada, exceso de pin erróneo'
  },
  { sisCode: '129', code: 129, text: 'CVV Incorrecto' },
  { sisCode: '180', code: 180, text: 'Tarjeta no válida o (LinX)' },
  { sisCode: '184', code: 184, text: 'el cliente no se ha autenticado' },
  { sisCode: '190', code: 190, text: 'Denegación emisor' },
  {
    sisCode: '904',
    code: 904,
    text: 'Problema con la configuración del comercio'
  },
  {
    sisCode: '8102',
    code: 8102,
    text: 'Operación que ha sido redirigida al emisor a autenticar EMV3DS V1 (para H2H)'
  },
  {
    sisCode: '8210',
    code: 8210,
    text: 'Operación que ha sido redirigida al emisor a autenticar EMV3DS V2.1 (para H2H)'
  },
  {
    sisCode: '8220',
    code: 8220,
    text: 'Operación que ha sido redirigida al emisor a autenticar EMV3DS V2.2 (para H2H)'
  },
  { sisCode: '9700', code: 9700, text: 'PayPal a devuelto un KO' },
  { sisCode: '9801', code: 9801, text: 'Denegada por iUPAY' },
  {
    sisCode: '9850',
    code: 9850,
    text: 'Error en operación realizada con Amazon Pay'
  },
  {
    sisCode: '9860',
    code: 9860,
    text: 'Error en operación realizada con Amazon Pay. Se puede reintentar la operación'
  },
  {
    sisCode: '9899',
    code: 9899,
    text: 'Los datos en Ds_Merchant_Data y no estaban  correctamente firmados'
  },
  { sisCode: '9900', code: 9900, text: 'SafetyPay ha devuelto un KO' },
  { sisCode: '9909', code: 9909, text: 'Error genérico. Consulte con Soporte' },
  {
    sisCode: '9912',
    code: 9912,
    text: 'La operación ha tenido algún problema  y se ha de generar una anulación automática'
  },
  { sisCode: '9913', code: 9913, text: 'Error en el envío notificación SOAP' },
  {
    sisCode: '9914',
    code: 9914,
    text: 'Respuesta KO po el comercio en la notificación SOAP'
  },
  {
    sisCode: 'SIS9915',
    code: 9915,
    text: 'A petición del usuario se cancela el pago'
  },
  {
    sisCode: '9928',
    code: 9928,
    text: 'A petición del usuario se cancela la preautorización'
  },
  { sisCode: '9929', code: 9929, text: 'El titular ha cancelado la operación' },
  { sisCode: '9930', code: 9930, text: 'La transferencia está pendiente' },
  { sisCode: '9931', code: 9931, text: 'Denegada (LINX)' },
  { sisCode: '9932', code: 9932, text: 'Denegada (LINX)' },
  { sisCode: '9933', code: 9933, text: 'Denegada (LINX)' },
  { sisCode: '9934', code: 9934, text: 'Denegada (LINX)' },
  { sisCode: '9935', code: 9935, text: 'Denegada (LINX)' },
  {
    sisCode: '9966',
    code: 9966,
    text: 'BIZUM ha devuelto un KO en la autorización'
  },
  { sisCode: '9992', code: 9992, text: 'Solicitud de PAE' },
  {
    sisCode: '9994',
    code: 9994,
    text: 'No se ha seleccionado ninguna tarjeta de la cartera.'
  },
  { sisCode: '9995', code: 9995, text: 'Recarga de prepago denegada' },
  {
    sisCode: '9996',
    code: 9996,
    text: 'No permite la recarga de tarjeta prepago'
  },
  {
    sisCode: '9997',
    code: 9997,
    text: 'Con la misma tarjeta hay varios pagos en «vuelo»'
  },
  {
    sisCode: '9998',
    code: 9998,
    text: 'Operación en proceso de solicitud de datos de tarjeta'
  },
  {
    sisCode: '9999',
    code: 9999,
    text: 'Operación que ha sido redirigida al emisor a autenticar'
  },
  {
    sisCode: 'XML0000',
    code: null,
    text: 'Errores en el proceso del XML-String recibido'
  },
  {
    sisCode: 'XML0001',
    code: null,
    text: 'Error en la generación del DOM a partir del XML-String recibido y la DTD definida'
  },
  {
    sisCode: 'XML0002',
    code: null,
    text: 'No existe el elemento «Message» en el XML-String recibido'
  },
  {
    sisCode: 'XML0003',
    code: null,
    text: 'El tipo de «Message» en el XML-String recibido tiene un valor desconcido o inválido en la petición'
  },
  {
    sisCode: 'XML0004',
    code: null,
    text: 'No existe el elemento «Ds_MerchantCode» en el XML-String recibido'
  },
  {
    sisCode: 'XML0005',
    code: null,
    text: 'El elemento «Ds_MerchantCode» viene vacío en el XML-String recibido'
  },
  {
    sisCode: 'XML0006',
    code: null,
    text: 'El elemento «Ds_MerchantCode» tiene una longitud incorrecta en el XML-String recibido'
  },
  {
    sisCode: 'XML0007',
    code: null,
    text: 'El elemento «Ds_MerchantCode» no tiene formato numérico en el XML-String recibido'
  },
  {
    sisCode: 'XML0008',
    code: null,
    text: 'No existe el elemento «Ds_Terminal» en el XML-String recibido'
  },
  {
    sisCode: 'XML0009',
    code: null,
    text: 'El elemento «Ds_Terminal» viene vacío en el XML-String recibido'
  },
  {
    sisCode: 'XML0010',
    code: null,
    text: 'El elemento «Ds_Terminal» tiene una longitud incorrecta en el XML-String recibido'
  },
  {
    sisCode: 'XML0011',
    code: null,
    text: 'El elemento «Ds_Terminal» no tiene formato numérico en el XML-String recibido'
  },
  {
    sisCode: 'XML0012',
    code: null,
    text: 'No existe el elemento «Ds_Order» en el XML-String recibido'
  },
  {
    sisCode: 'XML0013',
    code: null,
    text: 'El elemento «Ds_Order» viene vacío en el XML-String recibido'
  },
  {
    sisCode: 'XML0014',
    code: null,
    text: 'El elemento «Ds_Order» tiene una longitud incorrecta en el XML-String recibido'
  },
  {
    sisCode: 'XML0015',
    code: null,
    text: 'El elemento «Ds_Order» no tiene sus 4 primeras posiciones numéricas en el XML-String recibido'
  },
  {
    sisCode: 'XML0016',
    code: null,
    text: 'No existe el elemento «Ds_TransactionType» en el XML-String recibido'
  },
  {
    sisCode: 'XML0017',
    code: null,
    text: 'El elemento «Ds_TransactionType» viene vacío en el XML-String recibido'
  },
  {
    sisCode: 'XML0018',
    code: null,
    text: 'El elemento «Ds_TransactionType» tiene una longitud incorrecta en el XML-String recibido'
  },
  {
    sisCode: 'XML0019',
    code: null,
    text: 'El elemento «Ds_TransactionType» no tiene formato numérico en el XML-String recibido'
  },
  {
    sisCode: 'XML0020',
    code: null,
    text: 'El elemento «Ds_TransactionType» tiene un valor desconcido o inválido en un mensaje Transaction'
  },
  {
    sisCode: 'XML0021',
    code: null,
    text: 'No existe el elemento «Signature» en el XML-String recibido'
  },
  {
    sisCode: 'XML0022',
    code: null,
    text: 'El elemento «Signature» viene vacío en el XML-String recibido'
  },
  { sisCode: 'XML0023', code: null, text: 'La firma no es correcta' },
  {
    sisCode: 'XML0024',
    code: null,
    text: 'No existen operaciones para los datos solicitados'
  },
  {
    sisCode: 'XML0025',
    code: null,
    text: 'El XML de respuesta está mal formado'
  },
  {
    sisCode: 'XML0026',
    code: null,
    text: 'No existe el elemento «Ds_fecha_inicio» en el XML-String recibido'
  },
  {
    sisCode: 'XML0027',
    code: null,
    text: 'No existe el elemento «Ds_fecha_fin» en el XML-String recibido'
  },
  {
    sisCode: 'XML0028',
    code: null,
    text: 'El comercio-terminal está dado de baja'
  },
  {
    sisCode: 'XML0029',
    code: null,
    text: 'El elemento «SignatureVersion» viene vacío en el XML-String recibido'
  },
  {
    sisCode: 'XML0030',
    code: null,
    text: 'El elemento «SignatureVersion» viene con un valor erróneo en el XML-String recibido'
  },
  {
    sisCode: 'XML0031',
    code: null,
    text: 'El elemento «Entrada» viene con un valor no permitido en el XML-String recibido'
  },
  {
    sisCode: 'XML0032',
    code: null,
    text: 'El elemento «Autorizada» viene con un valor no permitido en el XML-String recibido'
  },
  {
    sisCode: 'XML0033',
    code: null,
    text: 'El elemento «ImporteMayor» viene con un valor no permitido en el XML-String recibido'
  },
  {
    sisCode: 'XML0034',
    code: null,
    text: 'El elemento «ImporteMenor» viene con un valor no permitido en el XML-String recibido'
  },
  {
    sisCode: 'XML0035',
    code: null,
    text: 'El elemento «Autenticada» viene con un valor no permitido en el XML-String recibido'
  },
  {
    sisCode: 'XML0036',
    code: null,
    text: 'El elemento «DCC» viene con un valor no permitido en el XML-String recibido'
  },
  {
    sisCode: 'XML0037',
    code: null,
    text: 'El elemento «Paymethod» viene con un valor no permitido en el XML-String recibido'
  },
  {
    sisCode: 'XML0038',
    code: null,
    text: 'Error el elemento «Ds_fecha_inicio» es anterior a un año'
  },
  {
    sisCode: 'XML0039',
    code: null,
    text: 'Error la difernecia entre «Ds_fecha_inicio» y «Ds_fecha_fin» excede los 15 días'
  },
  {
    sisCode: 'XML0040',
    code: null,
    text: 'Error la «Ds_fecha_fin» es anterior a «Ds_fecha_inicio»'
  },
  {
    sisCode: 'XML0041',
    code: null,
    text: 'Error el comercio no puede utilizar la consulta SOAP'
  },
  {
    sisCode: null,
    code: 102,
    text: 'Tarjeta en excepción transitoria o bajo sospecha de fraude'
  },
  { sisCode: null, code: 125, text: 'Tarjeta no efectiva' },
  { sisCode: null, code: 172, text: 'Denegada, no repetir.' },
  {
    sisCode: null,
    code: 173,
    text: 'Denegada, no repetir sin actualizar datos de tarjeta.'
  },
  { sisCode: null, code: 174, text: 'Denegada, no repetir antes de 72 horas.' },
  { sisCode: null, code: 191, text: 'Fecha de caducidad errónea' },
  { sisCode: null, code: 195, text: 'Requiere autenticación SCA' },
  {
    sisCode: null,
    code: 202,
    text: 'Tarjeta en excepción transitoria o bajo sospecha de fraude con retirada de tarjeta'
  },
  { sisCode: null, code: 909, text: 'Error de sistema' },
  { sisCode: null, code: 913, text: 'Pedido repetido' },
  { sisCode: null, code: 944, text: 'Sesión Incorrecta' },
  { sisCode: null, code: 950, text: 'Operación de devolución no permitida' },
  { sisCode: null, code: 912, text: 'Emisor no disponible' },
];

const ERROR_CODES: Record<string, string> = {};
const SIS_ERROR_CODES: Record<string, string> = {};

for (const err of ALL_ERRORS) {
  if (err.code != null && Number.isInteger(err.code)) {
    ERROR_CODES[err.code] = err.text;
  }
  if (err.sisCode != null && err.sisCode) {
    SIS_ERROR_CODES[err.sisCode] = err.text;
  }
}

export { ERROR_CODES, SIS_ERROR_CODES };
