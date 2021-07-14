import type { Component } from 'solid-js';
import { createSignal, onMount } from 'solid-js';
import type {
  CheckoutOutput,
  PreauthBody,
  PreauthOutput,
  AuthBody,
  AuthOutput,
  FinishedMessageEvent
} from '../server-info';
import { serverAddress } from '../server-info';
import { setRouter } from '../router';
import { waitForIframeToPostMessage } from '../utils';
import type { RedsysMessageEvent } from '../types/redsys';
import { styled } from 'solid-styled-components';
import type { EMV3DSBrowserClientInfo } from 'redsys-easy';

const obtain3DSClientEnv = (): EMV3DSBrowserClientInfo => {
  return {
    browserLanguage: navigator.language,
    browserColorDepth: screen.colorDepth.toString(),
    browserScreenHeight: screen.height.toString(),
    browserScreenWidth: screen.width.toString(),
    browserTZ: (new Date()).getTimezoneOffset().toString(),
    browserJavaEnabled: navigator.javaEnabled()
  };
};

interface SectionProps {
  hidden?: boolean
}

type SectionName = 'payment-data' | 'challenge-v1' | 'challenge-v2';

const Section = styled('div')<SectionProps>`
  width: 100%;
  ${({ hidden = false }) => hidden ? 'display: none;' : ''}
`;

const NonVisibleSection = styled('div')<SectionProps>`
  position: absolute;
  width:0;
  height:0;
  border:0;
`;

export interface Props {
  checkoutData: CheckoutOutput
}

export const CardPaymentPage: Component<Props> = (props) => {
  /**
   * 1. Generate redsys INSITE form
   * 2. Change from payment selection to payment page
   */

  const [activeSection, setActiveSection] = createSignal<SectionName>('payment-data');

  let threeDSMethodIframeEl: HTMLIFrameElement | undefined;
  let threeDSMethodFormEl: HTMLFormElement | undefined;
  let threeDSMethodDataEl: HTMLInputElement | undefined;

  let challengeV1IframeEl: HTMLIFrameElement | undefined;
  let challengeV1FormEl: HTMLFormElement | undefined;
  let challengeV1MDEl: HTMLInputElement | undefined;
  let challengeV1PaReqEl: HTMLInputElement | undefined;
  let challengeV1TermUrlEl: HTMLInputElement | undefined;

  let challengeV2IframeEl: HTMLIFrameElement | undefined;
  let challengeV2FormEl: HTMLFormElement | undefined;
  let challengeV2CreqEl: HTMLInputElement | undefined;

  /**
   * Input validator
   *
   * @returns {boolean}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const inputValidator = () => {
    // Should validate input before sending form
    return true;
  };

  /*
   * Listen to reception of operation ID
   */
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  window.addEventListener('message', async (event: RedsysMessageEvent) => {
    storeIdOper(event, 'token', 'errorCode', 'inputValidator');

    if (
      typeof event.data === 'object' &&
      'idOper' in event.data
    ) {
      const idOper = event.data.idOper;

      if (!idOper) {
        throw new Error('Missing idOper');
      }

      const { orderId } = props.checkoutData;

      const preauthBody: PreauthBody = {
        orderId,
        transactionData: {
          type: 'id-oper',
          idOper
        }
      };

      const preauthResponse = await fetch(`${serverAddress}/api/preauth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(preauthBody)
      });

      if (!preauthResponse.ok) {
        throw new Error('Preauth failed');
      }

      const preauthResult = await preauthResponse.json() as PreauthOutput;

      // Execute 3DS method
      if ('threeDSMethodForm' in preauthResult && preauthResult.threeDSMethodForm) {
        if (
          !threeDSMethodFormEl ||
          !threeDSMethodIframeEl ||
          !threeDSMethodDataEl
        ) return;

        // Serialize the parameters of the body into JSON and encode them with base64url
        // Then place each encoded parameter in their respective input element
        threeDSMethodDataEl.value = preauthResult.threeDSMethodForm.body.threeDSMethodData;

        // Fill out the form information and submit.
        threeDSMethodFormEl.action = preauthResult.threeDSMethodForm.url;
        threeDSMethodFormEl.submit();

        await waitForIframeToPostMessage({
          iframe: threeDSMethodIframeEl,
          condition: (event: MessageEvent) => {
            return typeof event.data !== 'object' &&
              event.data != null &&
              'finished' in event.data &&
              (event as FinishedMessageEvent).data.finished;
          },
          // Wait until 3DS method completes or a 10 seconds timeout
          timeout: 10 * 1000
        });
      }

      const clientInfo = obtain3DSClientEnv();

      const authBody: AuthBody = {
        transactionData: (
          preauthResult.threeDSProtocolVersion === '2.2.0' || preauthResult.threeDSProtocolVersion === '2.1.0'
            ? {
              type: '3ds-v2',
              threeDSServerTransID: preauthResult.threeDSServerTransID
            }
            : {
              type: 'regular',
              orderId,
              paymentMethod: {
                type: 'id-oper',
                idOper
              },
              threeDSProtocolVersion: preauthResult.threeDSProtocolVersion
            }
        ),
        clientInfo
      };

      const authResponse = await fetch(`${serverAddress}/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(authBody)
      });
      if (!authResponse.ok) {
        throw new Error('Auth failed');
      }

      const result = await authResponse.json() as AuthOutput;

      if (result.status === 'done') {
        setRouter('page', 'order-summary');
      } else if (result.status === 'challenge') {
        let iframe: HTMLIFrameElement;

        if (result.formVersion === '1') {
          if (
            !challengeV1IframeEl ||
            !challengeV1FormEl ||
            !challengeV1MDEl ||
            !challengeV1PaReqEl ||
            !challengeV1TermUrlEl
          ) {
            throw new Error('Form for 3DS v1 challenge does not exist');
          }

          iframe = challengeV1IframeEl;

          challengeV1MDEl.value = result.form.body.MD;
          challengeV1PaReqEl.value = result.form.body.PaReq;
          challengeV1TermUrlEl.value = result.form.body.TermUrl;

          challengeV1FormEl.action = result.form.url;
          challengeV1FormEl.submit();

          setActiveSection('challenge-v1');
        } else if (result.formVersion === '2') {
          if (
            !challengeV2IframeEl ||
            !challengeV2FormEl ||
            !challengeV2CreqEl
          ) {
            throw new Error('Form for 3DS v2 challenge does not exist');
          }

          iframe = challengeV2IframeEl;

          challengeV2CreqEl.value = result.form.body.creq;
          challengeV2FormEl.action = result.form.url;
          challengeV2FormEl.submit();

          setActiveSection('challenge-v2');
        } else {
          throw new Error('Unknown formVersion');
        }

        await waitForIframeToPostMessage({
          iframe,
          condition: (event: MessageEvent) => {
            return typeof event.data !== 'object' &&
              event.data != null &&
              'finished' in event.data &&
              (event as FinishedMessageEvent).data.finished;
          }
        });

        // After the payment finishes, we let them see the postchallenge page for
        // a few seconds before redirecting to our frontend page
        await new Promise(resolve => setTimeout(resolve, 5 * 1000));

        setRouter('page', 'order-summary');
      }
    }
  });

  onMount(() => {
    /*
     * Create and populate the payment form
     */
    getInSiteForm(
      'card-form', // Form ID
      '', // Button style
      '', // Body style
      '', // Box style
      '', // Inputs style
      'Pay now', // Payment button text
      '999008881', // Ds_Merchant_MerchantCode
      '1', // Ds_Merchant_Terminal
      props.checkoutData.orderId // Ds_Merchant_Order
    );
  });

  return (
    <div id="card-payment-page">
      <Section hidden={activeSection() !== 'payment-data'}>
        {/* Form to capture payment data */}
        <div
          id="card-form"
          style="height: 100vh; width: 100vw;" />
        <input type="hidden" id="token" />
        <input type="hidden" id="errorCode" />
      </Section>
      <NonVisibleSection>
        {/* 3DS Method iframe, invisible */}
        <iframe
          ref={threeDSMethodIframeEl}
          name="threeDSMethodIframe" />
        <form
          ref={threeDSMethodFormEl}
          method='post'
          target="threeDSMethodIframe">{/* Name of iframe */}
          <input
            ref={threeDSMethodDataEl}
            name="threeDSMethodData"
            type="hidden" />
        </form>
      </NonVisibleSection>
      <Section hidden={activeSection() !== 'challenge-v1'}>
        {/* Challenge form */}
        <iframe
          ref={challengeV1IframeEl}
          name="challengeV1Iframe"
          style="height: 100vh; width: 100vw;" />
        <form
          ref={challengeV1FormEl}
          method='post'
          target="challengeV1Iframe">{/* Name of iframe */}
          <input
            ref={challengeV1MDEl}
            type="hidden"
            name="MD" />
          <input
            ref={challengeV1PaReqEl}
            type="hidden"
            name="PaReq" />
          <input
            ref={challengeV1TermUrlEl}
            type="hidden"
            name="TermUrl" />
        </form>
      </Section>
      <Section hidden={activeSection() !== 'challenge-v2'}>
        {/* Challenge form */}
        <iframe
          ref={challengeV2IframeEl}
          name="challengeV2Iframe"
          style="height: 100vh; width: 100vw;" />
        <form
          ref={challengeV2FormEl}
          method='post'
          target="challengeV2Iframe">{/* Name of iframe */}
          <input
            ref={challengeV2CreqEl}
            type="hidden"
            name="creq" />
        </form>
      </Section>
    </div>
  );
};
