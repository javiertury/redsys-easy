export type RedsysMessageEvent = MessageEvent<{ idOper: string } | string | undefined>;

declare global {
  const storeIdOper: (
    event: RedsysMessageEvent,
    operIdElementId: string,
    errorCodeElementId: string,
    inputValidatorFuncName: string
  ) => void;

  // eslint-disable-next-line @typescript-eslint/max-params -- API designed by redsys
  const getInSiteForm: (
    formElementId: string,
    buttonStyle: string,
    bodyStyle: string,
    boxStyle: string,
    inputsStyle: string,
    paymentButtonText: string,
    merchantCode: string,
    terminal: string,
    orderId: string
  ) => void;
}
