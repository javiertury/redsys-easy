'use strict';

const crypto = require('crypto');

const zeroPad = (smth, blocksize) => {
  const buf = Buffer.from(smth.toString(), 'utf8');
  const pad = Buffer.alloc((blocksize - (buf.length % blocksize)) % blocksize, 0);
  return Buffer.concat([buf, pad]);
};

const encryptOrder = (merchantKey, orderRef) => {
  const secretKey = Buffer.from(merchantKey, 'base64');
  const iv = Buffer.alloc(8, 0);
  const cipher = crypto.createCipheriv('des-ede3-cbc', secretKey, iv);
  cipher.setAutoPadding(false);
  const paddedStr = zeroPad(orderRef, 8);
  return cipher.update(paddedStr, 'utf8', 'base64') + cipher.final('base64');
};

exports.sha256Sign = (merchantKey, order, params) => {
  const orderKey = Buffer.from(encryptOrder(merchantKey, order), 'base64');
  return crypto.createHmac('sha256', orderKey).update(params).digest('base64');
};

exports.formatParams = paramsInput => {
  if (!Number.isFinite(paramsInput.amount) || paramsInput.amount < 0) {
    throw new Error('Invalid amount to charge');
  }
  if (!paramsInput.merchantCode) throw new Error('The merchant code is mandatory');
  if (!paramsInput.transactionType) throw new Error('The transaction type is mandatory');
  if (!paramsInput.order) throw new Error('No order reference provided.');

  const paramsObj = {
    DS_MERCHANT_ORDER: paramsInput.order,
    DS_MERCHANT_MERCHANTCODE: paramsInput.merchantCode,
    DS_MERCHANT_TRANSACTIONTYPE: paramsInput.transactionType,
    // Default to 1
    DS_MERCHANT_TERMINAL: paramsInput.terminal || '1'
  };

  // Default to EUR
  const currency = CURRENCIES[paramsInput.currency || 'EUR'];
  if (!currency) {
    throw new Error(`Unsupported currency ${paramsInput.currency}`);
  }

  paramsObj.DS_MERCHANT_CURRENCY = currency.num;

  // For decimals
  paramsObj.DS_MERCHANT_AMOUNT = String(Math.floor(paramsInput.amount * currency.multiplier));

  if (paramsObj.DS_MERCHANT_AMOUNT.length > 12) throw new Error('Amount to charge is too large');

  if (paramsInput.merchantName) paramsObj.DS_MERCHANT_MERCHANTNAME = paramsInput.merchantName;
  if (paramsInput.merchantURL) paramsObj.DS_MERCHANT_MERCHANTURL = paramsInput.merchantURL;
  if (paramsInput.merchantSignature) paramsObj.DS_MERCHANT_MERCHANTSIGNATURE = paramsInput.merchantSignature;
  if (paramsInput.successURL) paramsObj.DS_MERCHANT_URLOK = paramsInput.successURL;
  if (paramsInput.errorURL) paramsObj.DS_MERCHANT_URLKO = paramsInput.errorURL;
  if (paramsInput.dateFrecuency) paramsObj.DS_MERCHANT_DATEFRECUENCY = paramsInput.dateFrecuency;
  if (paramsInput.chargeExpiryDate) paramsObj.DS_MERCHANT_CHARGEEXPIRYDATE = paramsInput.chargeExpiryDate;
  if (paramsInput.sumTotal) paramsObj.DS_MERCHANT_SUMTOTAL = paramsInput.sumTotal;
  if (paramsInput.directPayment) paramsObj.DS_MERCHANT_DIRECTPAYMENT = paramsInput.directPayment;
  if (paramsInput.identifier) paramsObj.DS_MERCHANT_IDENTIFIER = paramsInput.identifier;
  if (paramsInput.group) paramsObj.DS_MERCHANT_GROUP = paramsInput.group;
  if (paramsInput.pan) paramsObj.DS_MERCHANT_PAN = paramsInput.pan;
  if (paramsInput.expiryDate) {
    const stdFmt = paramsInput.expiryDate;
    if (stdFmt.length !== 4 || ! /^\d+$/.test(stdFmt)) {
      throw new Error('Invalid expiryDate');
    }
    const altFmt = `${stdFmt.slice(2, 4)}${stdFmt.slice(0, 2)}`;
    paramsObj.DS_MERCHANT_EXPIRYDATE = altFmt;
  }
  if (paramsInput.CVV2) paramsObj.DS_MERCHANT_CVV2 = paramsInput.CVV2;
  if (paramsInput.cardCountry) paramsObj.DS_CARD_COUNTRY = paramsInput.cardCountry;
  if (paramsInput.merchantData) paramsObj.DS_MERCHANT_MERCHANTDATA = paramsInput.merchantData;
  if (paramsInput.clientIp) paramsObj.DS_MERCHANT_CLIENTIP = paramsInput.data;

  return paramsObj;
};

exports.TRANSACTION_TYPES = {
  AUTHORIZATION: '0', // Autorización
  PRE_AUTHORIZATION: '1', // Preautorización
  CONFIRMATION: '2', // Confirmación de preautorización
  AUTO_REFUND: '3', // Devolución Automática
  RECURRING_TRANSACTION: '5', // Transacción Recurrente
  SUCCESSIVE_TRANSACTION: '6', // Transacción Sucesiva
  PRE_AUTHENTICATION: '7', // Pre-autenticación
  PRE_AUTHENTICATION_CONFIRMATION: '8', // Confirmación de pre-autenticación
  PRE_AUTHORIZATION_CANCEL: '9', // Anulación de Preautorización
  DEFERRED_AUTHORIZATION: 'O', // Autorización en diferido
  DEFERRED_AUTHORIZATION_CONFIRMATION: 'P', // Confirmación de autorización en diferido
  DEFERRED_AUTHORIZATION_CANCEL: 'Q', // Anulación de autorización en diferido
  DEFERRED_INITIAL_FEE: 'R', // Cuota inicial diferido
  DEFERRED_SUCCESSIVE_FEE: 'S', // Cuota sucesiva diferido
  NO_AUTHENTICATION: 'A', // Operaciones sin autenticacíon
  DELETE_REFERENCE: '44' // Eliminar referencia
};

// ISO 4217
const CURRENCIES = {
  EUR: {
    num: '978',
    multiplier: 100,
  },
  USD: {
    num: '840',
    multiplier: 100,
  },
  GBP: {
    num: '826',
    multiplier: 100,
  },
  JPY: {
    num: '392',
    multiplier: 1,
  },
  RUB: {
    num: '643',
    multiplier: 100,
  },
};

const RESPONSE_CODES = {
  // Transacciones exitosas
  '0': 'Transacción autorizada por el banco emisor de la tarjeta.',
  '1': 'Código exclusivo para transacciones Verified by Visa o MasterCard SecureCode. La transacción ha sido autorizada y, además, el banco emisor nos informa que ha autenticado correctamente la identidad del titular de la tarjeta.',
  '2': 'Transacción autorizada por el banco emisor.',
  '400': 'Transacción de anulación o retrocesión parcial aceptada por el banco emisor.',
  '900': 'Transacción autorizada para devoluciones y confirmaciones.',

  // Transacciones denegadas por motivos genéricos
  '101': 'Transacción denegada porque la fecha de caducidad de la tarjeta que se ha informado en el pago, es anterior a la actualmente vigente.',
  '102': 'Tarjeta bloqueada transitoriamente por el banco emisor o bajo sospecha de fraude.',
  '104': 'Operación no permitida para ese tipo de tarjeta.',
  '106': 'Excedido el número de intentos con PIN erróneo.',
  '107': 'El banco emisor no permite una autorización automática. Es necesario contactar telefónicamente con su centro autorizador para obtener una aprobación Manual.',
  '109': 'Denegada porque el comercio no está correctamente dado de alta en los sistemas internacionales de tarjetas.',
  '110': 'El importe de la transacción es inusual para el tipo de comercio que solicita la autorización de pago.',
  '114': 'Operación no permitida para ese tipo de tarjeta.',
  '116': 'El titular no dispone de suficiente crédito.',
  '118': 'Tarjeta inexistente o no dada de alta por banco emisor. (Error SIS0078)  ',
  '119': 'Transacción denegada por el banco emisor pero sin que este dé detalles acerca del motivo.',
  '125': 'Tarjeta inexistente o no dada de alta por banco emisor.',
  '129': 'El código CVV2/CVC2 (los tres dígitos del reverso de la tarjeta) informado por el comprador es erróneo.',
  '167': 'Debido a una sospecha de que la transacción es fraudulenta el banco emisor no permite una autorización automática. Es necesario contactar telefónicamente con su centro autorizador para obtener una aprobación manual.',
  '180': 'Operación no permitida para ese tipo de tarjeta.',
  '181': 'Tarjeta bloqueada transitoriamente por el banco emisor.',
  '182': 'Tarjeta bloqueada transitoriamente por el banco emisor.',
  '184': 'Código exclusivo para transacciones Verified by Visa o MasterCard SecureCode. Transacción denegada por autenticación errónea.',
  '190': 'Transacción denegada por el banco emisor pero sin que este dé detalles acerca del motivo.',
  '191': 'Transacción denegada porque la fecha de caducidad de la tarjeta que se ha informado en el pago, no se corresponde con la actualmente vigente.',

  // Transacciones denegadas por motivos en los que el banco emisor de la tarjeta considera que existen indicios de fraude.
  '201': 'Transacción denegada porque la fecha de caducidad de la tarjeta que se ha informado en el pago, es anterior a la actualmente vigente. Además, el banco emisor considera que la tarjeta está en una situación de posible fraude.',
  '202': 'Tarjeta bloqueada transitoriamente por el banco emisor o bajo sospecha de fraude. Además, el banco emisor considera que la tarjeta está en una situación de posible fraude.',
  '204': 'Operación no permitida para ese tipo de tarjeta. Además, el banco emisor considera que la tarjeta está en una situación de posible fraude.',
  '207': 'El banco emisor no permite una autorización automática. Es necesario contactar telefónicamente con su centro autorizador para obtener una aprobación manual. Además, el banco emisor considera que la tarjeta está en una situación de posible fraude.',
  '208': 'Tarjeta bloqueada por el banco emisor debido a que el titular le ha manifestado que le ha sido robada o perdida. Además, el banco emisor considera que la tarjeta está en una situación de posible fraude.',
  '209': 'Tarjeta bloqueada por el banco emisor debido a que el titular le ha manifestado que le ha sido robada o perdida. Además, el banco emisor considera que la tarjeta está en una situación de posible fraude.',
  '280': 'Código exclusivo para transacciones en las que se solicita el código de 3 dígitos CVV2 (tarj.Visa) o CVC2 (tarj.MasterCard) del reverso de la tarjeta. El código CVV2/CVC2 informado por el comprador es erróneo. Además, el banco emisor considera que la tarjeta está en una situación de posible fraude.',
  '290': 'Transacción denegada por el banco emisor pero sin que este dé detalles acerca del motivo. Además, el banco emisor considera que la tarjeta está en una situación de posible fraude.',

  // CODIGOS REFERIDOS A ANULACIONES O DEVOLUCIONES
  '480': 'La anulación o retrocesión parcial no ha sido aceptada porque no se ha localizado la operación original, o bien, porque el banco emisor no ha dado respuesta dentro del time- out predefinido.',
  '481': 'Transacción de anulación o retrocesión parcial aceptada por el banco emisor. No obstante, la respuesta del banco emisor se ha recibido con mucha demora, fuera del time-out predefinido.',

  // CODIGOS REFERIDOS A CONCILIACIONES DE PRE-AUTORIZACIONES O PRE-AUTENTICACIONES
  '500': 'La transacción de conciliación ha sido aceptada por el banco emisor.',
  '501': 'La conciliación no ha sido aceptada porque no se ha localizado la operación original, o bien, porque el banco emisor no ha dado respuesta dentro del time-out predefinido.',
  '502': 'La conciliación no ha sido aceptada porque no se ha localizado la operación original, o bien, porque el banco emisor no ha dado respuesta dentro del time-out predefinido.',
  '503': 'La conciliación no ha sido aceptada porque no se ha localizado la operación original, o bien, porque el banco emisor no ha dado respuesta dentro del time-out predefinido.',

  // CODIGOS DE ERROR ENVIADOS POR LA PROPIA PLATAFORMA DE PAGOS DE REDSYS
  '904': 'Hay un problema en la configuración del código de comercio. Contactar con RedSys para solucionarlo.',
  '909': 'Error en la estabilidad de la plataforma de pagos de RedSys o en la de los sistemas de intercambio de Visa o MasterCard.',
  '912': 'El centro autorizador del banco emisor no está operativo en estos momentos.',
  '913': 'Se ha procesado recientemente una transacción con el mismo número de pedido (Ds_Merchant_Order).',
  '916': 'No es posible operar con este importe.',
  '928': 'El banco emisor no da respuesta a la petición de autorización dentro del time-out predefinido.',
  '940': 'Se está solicitando una anulación o retrocesión parcial de una transacción que con anterioridad ya fue anulada.',
  '941': 'Se está solicitando la confirmación de una transacción con un número de pedido (Ds_Merchant_Order) que se corresponde a una operación anulada anteriormente.',
  '942': 'Se está solicitando la confirmación de una transacción con un número de pedido (Ds_Merchant_Order) que se corresponde a una operación denegada.',
  '943': 'Se está solicitando una confirmación errónea.',
  '944': 'Se está solicitando la apertura de una tercera sesión. En el proceso de pago solo está permitido tener abiertas dos sesiones (la actual y la anterior pendiente de cierre).',
  '945': 'Se ha procesado recientemente una transacción con el mismo número de pedido (Ds_Merchant_Order).',
  '946': 'Se ha solicitada la anulación o retrocesión parcial de una transacción original que todavía está en proceso y pendiente de respuesta.',
  '947': 'Se está intentando procesar una transacción con el mismo número de pedido (Ds_Merchant_Order) de otra que todavía está pendiente de respuesta.',
  '949': 'El número de comercio (Ds_Merchant_MerchantCode) o el de terminal (Ds_Merchant_Terminal) no están dados de alta o no son operativos.',
  '950': 'La devolución no está permitida por regulación ',
  '965': 'Violación de la Normativa de Visa o Mastercard ',
  '9064': 'No posiciones de la tarjeta incorrecta ',
  '9078': 'Los tipos de pago definidos para el terminal (Ds_Merchant_Terminal) por el que se procesa la transacción, no permiten pagar con el tipo de tarjeta informado.',
  '9093': 'Tarjeta inexistente.',
  '9094': 'Operación denegada por parte de los emisoras internacionales',
  '9104': 'Comercio con autenticación obligatoria y titular sin clave de compra segura ',
  '9126': 'La operación se ha denegado para evitar duplicidades.',
  '9142': 'El titular de la tarjeta no se ha autenticado durante el tiempo máximo permitido.',
  '9218': 'La entrada Operaciones no permite operaciones Seguras',
  '9253': 'Tarjeta no cumple con el check-digit (posición 16 del número de tarjeta calculada según algoritmo de Luhn).',
  '9256': 'La tarjeta no puede hacer Preautorizaciones',
  '9261': 'La transacción excede el límite operativo establecido por RedSys ',
  '9912': 'El centro autorizador del banco emisor no está  operativo en estos momentos.',
  '9913': 'Error en la confirmación que el comercio envía al TPV Virtual (solo aplicable en la opción de sincronización SOAP) ',
  '9914': 'Confirmación “KO” del comercio (solo aplicable en la opción de sincronización SOAP)',
  '9915': 'El usuario ha cancelado el pago',
  '9928': 'Anulación de autorización en diferido realizada por el SIS (proceso batch) ',
  '9929': 'Anulación de autorización en diferido realizada  por el comercio ',
  '9997': 'En el TPV Virtual se está procesando de forma simultánea otra operación con la misma tarjeta.',
  '9994': 'La operación está en espera de que el usuario seleccione una tarjeta en el wallet correspondiente (IUPAY!) ',
  '9998': 'Estado temporal mientras la operación se procesa. Cuando la operación termine este código cambiará.',
  '9999': 'Estado temporal mientras el TPV realiza la autenticación del titular. Una vez finalizado este proceso el TPV asignará un nuevo código a la operación.'
};

const SIS_ERROR_CODES = {
  'SIS0007': 'Error al desmontar el XML de entrada o error producido al acceder mediante un sistema de firma antiguo teniendo configurado el tipo de clave HMAC SHA256',
  'SIS0008': 'Error falta Ds_Merchant_MerchantCode',
  'SIS0009': 'Error de formato en Ds_Merchant_MerchantCode',
  'SIS0010': 'Error falta Ds_Merchant_Terminal',
  'SIS0011': 'Error de formato en Ds_Merchant_Terminal',
  'SIS0014': 'Error de formato en Ds_Merchant_Order',
  'SIS0015': 'Error falta Ds_Merchant_Currency',
  'SIS0016': 'Error de formato en Ds_Merchant_Currency',
  'SIS0017': 'Error no se admiten operaciones en pesetas',
  'SIS0018': 'Error falta Ds_Merchant_Amount',
  'SIS0019': 'Error de formato en Ds_Merchant_Amount',
  'SIS0020': 'Error falta Ds_Merchant_MerchantSignature',
  'SIS0021': 'Error la Ds_Merchant_MerchantSignature viene vacía',
  'SIS0022': 'Error de formato en Ds_Merchant_TransactionType',
  'SIS0023': 'Error Ds_Merchant_TransactionType desconocido',
  'SIS0024': 'Error Ds_Merchant_ConsumerLanguage tiene más de 3 posiciones',
  'SIS0025': 'Error de formato en Ds_Merchant_ConsumerLanguage',
  'SIS0026': 'Error No existe el comercio / terminal enviado',
  'SIS0027': 'Error Moneda enviada por el comercio es diferente a la que tiene',
  'SIS0028': 'Error Comercio / terminal está dado de baja',
  'SIS0030': 'Error en un pago con tarjeta ha llegado un tipo de operación que no es ni pago ni preautorización',
  'SIS0031': 'Método de pago no definido',
  'SIS0033': 'Error en un pago con móvil ha llegado un tipo de operación que no es ni pago ni preautorización',
  'SIS0034': 'Error de acceso a la Base de Datos',
  'SIS0037': 'El número de teléfono no es válido',
  'SIS0038': 'Error en java',
  'SIS0040': 'Error el comercio / terminal no tiene ningún método de pago asignado',
  'SIS0041': 'Error en el cálculo de la HASH de datos del comercio.',
  'SIS0042': 'La firma enviada no es correcta',
  'SIS0043': 'Error al realizar la notificación on-line',
  'SIS0046': 'El bin de la tarjeta no está dado de alta',
  'SIS0051': 'Error número de pedido repetido',
  'SIS0054': 'Error no existe operación sobre la que realizar la devolución',
  'SIS0055': 'Error existe más de un pago con el mismo número de pedido',
  'SIS0056': 'La operación sobre la que se desea devolver no está autorizada',
  'SIS0057': 'El importe a devolver supera el permitido',
  'SIS0058': 'Inconsistencia de datos, en la validación de una confirmación',
  'SIS0059': 'Error no existe operación sobre la que realizar la confirmación',
  'SIS0060': 'Ya existe una confirmación asociada a la preautorización',
  'SIS0061': 'La preautorización sobre la que se desea confirmar no está autorizada',
  'SIS0062': 'El importe a confirmar supera el permitido',
  'SIS0063': 'Error. Número de tarjeta no disponible',
  'SIS0064': 'Error. El número de tarjeta no puede tener más de 19 posiciones',
  'SIS0065': 'Error. El número de tarjeta no es numérico',
  'SIS0066': 'Error. Mes de caducidad no disponible',
  'SIS0067': 'Error. El mes de la caducidad no es numérico',
  'SIS0068': 'Error. El mes de la caducidad no es válido',
  'SIS0069': 'Error. Año de caducidad no disponible',
  'SIS0070': 'Error. El Año de la caducidad no es numérico',
  'SIS0071': 'Tarjeta caducada',
  'SIS0072': 'Operación no anulable',
  'SIS0074': 'Error falta Ds_Merchant_Order',
  'SIS0075': 'Error el Ds_Merchant_Order tiene menos de 4 posiciones o más de 12',
  'SIS0076': 'Error el Ds_Merchant_Order no tiene las cuatro primeras posiciones numéricas',
  'SIS0077': 'Error el Ds_Merchant_Order no tiene las cuatro primeras posiciones numéricas. No se utiliza',
  'SIS0078': 'Método de pago no disponible',
  'SIS0079': 'Error al realizar el pago con tarjeta',
  'SIS0081': 'La sesión es nueva, se han perdido los datos almacenados',
  'SIS0084': 'El valor de Ds_Merchant_Conciliation es nulo',
  'SIS0085': 'El valor de Ds_Merchant_Conciliation no es numérico',
  'SIS0086': 'El valor de Ds_Merchant_Conciliation no ocupa 6 posiciones',
  'SIS0089': 'El valor de Ds_Merchant_ExpiryDate no ocupa 4 posiciones',
  'SIS0092': 'El valor de Ds_Merchant_ExpiryDate es nulo',
  'SIS0093': 'Tarjeta no encontrada en la tabla de rangos',
  'SIS0094': 'La tarjeta no fue autenticada como 3D Secure',
  'SIS0097': 'Valor del campo Ds_Merchant_CComercio no válido',
  'SIS0098': 'Valor del campo Ds_Merchant_CVentana no válido',
  'SIS0112': 'Error El tipo de transacción especificado en',
  'SIS0113': 'Excepción producida en el servlet de operaciones',
  'SIS0114': 'Error, se ha llamado con un GET en lugar de un POST',
  'SIS0115': 'Error no existe operación sobre la que realizar el pago de la cuota',
  'SIS0116': 'La operación sobre la que se desea pagar una cuota no es una operación válida',
  'SIS0117': 'La operación sobre la que se desea pagar una cuota no está autorizada',
  'SIS0118': 'Se ha excedido el importe total de las cuotas',
  'SIS0119': 'Valor del campo Ds_Merchant_DateFrecuency no válido',
  'SIS0120': 'Valor del campo Ds_Merchant_ChargeExpiryDate no válido',
  'SIS0121': 'Valor del campo Ds_Merchant_SumTotal no válido',
  'SIS0122': 'Valor del campo Ds_Merchant_DateFrecuency o no Ds_Merchant_SumTotal tiene formato incorrecto',
  'SIS0123': 'Se ha excedido la fecha tope para realizar transacciones',
  'SIS0124': 'No ha transcurrido la frecuencia mínima en un pago recurrente sucesivo',
  'SIS0126': 'Operación denegada para evitar duplicidades.',
  'SIS0132': 'La fecha de Confirmación de Autorización no puede superar en más de 7 días a la de Preautorización.',
  'SIS0133': 'La fecha de Confirmación de Autenticación no puede superar en más de 45 días a la de Autenticación Previa.',
  'SIS0139': 'Error el pago recurrente inicial está duplicado',
  'SIS0142': 'Tiempo excedido para el pago',
  'SIS0197': 'Error al obtener los datos de cesta de la compra en operación tipo pasarela',
  'SIS0198': 'Error el importe supera el límite permitido para el comercio',
  'SIS0199': 'Error el número de operaciones supera el límite permitido para el comercio',
  'SIS0200': 'Error el importe acumulado supera el límite permitido para el comercio',
  'SIS0214': 'El comercio no admite devoluciones',
  'SIS0216': 'Error Ds_Merchant_CVV2 tiene más de 3 posiciones',
  'SIS0217': 'Error de formato en Ds_Merchant_CVV2',
  'SIS0218': 'El comercio no permite operaciones seguras por la entrada /operaciones',
  'SIS0219': 'Error el número de operaciones de la tarjeta supera el límite permitido para el comercio',
  'SIS0220': 'Error el importe acumulado de la tarjeta supera el límite permitido para el comercio',
  'SIS0221': 'Error el CVV2 es obligatorio',
  'SIS0222': 'Ya existe una anulación asociada a la preautorización',
  'SIS0223': 'La preautorización que se desea anular no está autorizada',
  'SIS0224': 'El comercio no permite anulaciones por no tener firma ampliada',
  'SIS0225': 'Error no existe operación sobre la que realizar la anulación',
  'SIS0226': 'Inconsistencia de datos, en la validación de una anulación',
  'SIS0227': 'Valor del campo Ds_Merchant_TransactionDate no válido',
  'SIS0229': 'No existe el código de pago aplazado solicitado',
  'SIS0252': 'El comercio no permite el envío de tarjeta',
  'SIS0253': 'La tarjeta no cumple el check-digit',
  'SIS0254': 'El número de operaciones de la IP supera el límite permitido por el comercio',
  'SIS0255': 'El importe acumulado por la IP supera el límite permitido por el comercio',
  'SIS0256': 'El comercio no puede realizar preautorizaciones',
  'SIS0257': 'Esta tarjeta no permite operativa de preautorizaciones',
  'SIS0258': 'Inconsistencia de datos, en la validación de una confirmación',
  'SIS0261': 'Operación detenida por superar el control de restricciones en la entrada al SIS',
  'SIS0270': 'El comercio no puede realizar autorizaciones en diferido',
  'SIS0274': 'Tipo de operación desconocida o no permitida por esta entrada al SIS',
  'SIS0295': 'Se ha denegado una operación que fue enviada en el mismo minuto para evitar duplic.',
  'SIS0298': 'El comercio no permite realizar operaciones de Tarjeta en Archivo',
  'SIS0319': 'El comercio no pertenece al grupo especificado en Ds_Merchant_Group',
  'SIS0321': 'La referencia indicada en Ds_Merchant_Identifier no está asociada al comercio',
  'SIS0322': 'Error de formato en Ds_Merchant_Group',
  'SIS0325': 'Se ha pedido no mostrar pantallas pero no se ha enviado ninguna referencia de tarjeta',
  'SIS0429': 'Error en la versión enviada por el comercio en el parámetro Ds_SignatureVersion',
  'SIS0430': 'Error al decodificar el parámetro Ds_MerchantParameters',
  'SIS0431': 'Error del objeto JSON que se envía codificado en el parámetro Ds_MerchantParameters',
  'SIS0432': 'Error FUC del comercio erróneo',
  'SIS0433': 'Error Terminal del comercio erróneo',
  'SIS0434': 'Error ausencia de número de pedido en la operación enviada por el comercio',
  'SIS0435': 'Error en el cálculo de la firma',
  'SIS0466': 'La referencia que se está utilizando no existe en la tabla de referencias',
  'SIS0467': 'La referencia que se está utilizando está dada de baja',
  'SIS0468': 'Se está utilizando una referencia que se generó con un adquirente',
};

exports.getResponseCodeMessage = code => {
  if (!code || typeof code !== 'string') {
    return null;
  }

  const lookupCode = Number.parseInt(code.trim());

  if (!Number.isFinite(lookupCode) || lookupCode < 0) {
    return null;
  }

  const msg = RESPONSE_CODES[lookupCode.toString()];

  if (!msg && lookupCode < 100) {
    return 'Transacción autorizada para pagos y preautorizaciones';
  }

  return msg || null;
};

exports.getSISErrorCodeMessage = code => {
  if (!code || typeof code !== 'string') {
    return null;
  }

  return SIS_ERROR_CODES[code.trim()] || null;
};

// Order is important
exports.signedFieldsXMLResponse = ['Ds_Amount', 'Ds_Order',
  'Ds_MerchantCode', 'Ds_Currency', 'Ds_Response', 'Ds_CardNumber',
  'Ds_TransactionType', 'Ds_SecurePayment'];
