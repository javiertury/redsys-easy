const commonSettings = {
  merchantData: {
    terminal: '1',
    merchantCode: '999008881'
  },
  secretKey: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7'
};

export const threeDSv1 = {
  ...commonSettings,
  card: {
    pan: '4548812049400004',
    expiryMonth: '12',
    expiryYear: '34',
    cvv: '123',
    cip: '123456'
  }
};

export const noThreeDS = threeDSv1;

export const declined = {
  ...commonSettings,
  card: {
    pan: '5576440022788500',
    expiryMonth: '12',
    expiryYear: '34',
    cvv: '123',
    cip: '123456'
  }
};

export const threeDSv21Challenge = {
  ...commonSettings,
  card: {
    pan: '4918019199883839',
    expiryMonth: '12',
    expiryYear: '34',
    cvv: '123',
    cip: '123456'
  }
};

export const threeDSv21ChallengeWithout3DSURL = {
  ...commonSettings,
  card: {
    pan: '4548817212493017',
    expiryMonth: '12',
    expiryYear: '34',
    cvv: '123',
    cip: '123456'
  }
};

export const threeDSv21ChallengeDeclined = {
  ...commonSettings,
  card: {
    pan: '4907271141151707',
    expiryMonth: '12',
    expiryYear: '34',
    cvv: '123',
    cip: '123456'
  }
};

export const threeDSv21FrictionlessDeclined = {
  ...commonSettings,
  card: {
    pan: '4907277775205123',
    expiryMonth: '12',
    expiryYear: '34',
    cvv: '123',
    cip: '123456'
  }
};

export const threeDSv21FrictionlessWithout3DSURL = {
  ...commonSettings,
  card: {
    pan: '4548814479727229',
    expiryMonth: '12',
    expiryYear: '34',
    cvv: '123',
    cip: '123456'
  }
};

export const threeDSv21Frictionless = {
  ...commonSettings,
  card: {
    pan: '4918019160034602',
    expiryMonth: '12',
    expiryYear: '34',
    cvv: '123',
    cip: '123456'
  }
};

export const threeDSv22ChallengeWithout3DSURL = {
  ...commonSettings,
  card: {
    pan: '4548816131164386',
    expiryMonth: '12',
    expiryYear: '34',
    cvv: '123',
    cip: '123456'
  }
};

export const threeDSv22Frictionless = {
  ...commonSettings,
  card: {
    pan: '4548816134581156',
    expiryMonth: '12',
    expiryYear: '34',
    cvv: '123',
    cip: '123456'
  }
};

export const threeDSv22ChallengeExceptionWithout3DSURL = {
  ...commonSettings,
  card: {
    pan: '4548815324058868',
    expiryMonth: '12',
    expiryYear: '34',
    cvv: '123',
    cip: '123456'
  }
};

export const threeDSv22FrictionlessMitWithout3DSURL = {
  ...commonSettings,
  card: {
    pan: '4548815374025114',
    expiryMonth: '12',
    expiryYear: '34',
    cvv: '123',
    cip: '123456'
  }
};

export const threeDSv22Ota3ri = {
  ...commonSettings,
  card: {
    pan: '5576441563045037',
    expiryMonth: '12',
    expiryYear: '34',
    cvv: '123',
    cip: '123456'
  }
};

// VISA
export const threeDSv1Dcc = {
  ...commonSettings,
  card: {
    pan: '4137360000000006',
    expiryMonth: '12',
    expiryYear: '34',
    cvv: '123',
    cip: '123456'
  }
};

// Master
export const threeDSv2FrictionlessDcc = {
  ...commonSettings,
  card: {
    pan: '5424180805648190',
    expiryMonth: '12',
    expiryYear: '34',
    cvv: '123',
    cip: '123456'
  }
};

// VISA
export const threeDSv2ChallengeDcc = {
  ...commonSettings,
  card: {
    pan: '4117731234567891',
    expiryMonth: '12',
    expiryYear: '34',
    cvv: '123',
    cip: '123456'
  }
};

// Master NOK
export const threeDSv21ChallengeDccNok = {
  ...commonSettings,
  card: {
    pan: '5409960031405146',
    expiryMonth: '12',
    expiryYear: '34',
    cvv: '123',
    cip: '123456'
  }
};
