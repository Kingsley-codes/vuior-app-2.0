import { usePaymentSheet } from "@stripe/stripe-react-native";
import { useCallback } from "react";
import type { PaymentSheetPayload } from "../services/mobileStripeApi";

export function useNativePaymentSheet() {
  const { initPaymentSheet, presentPaymentSheet } = usePaymentSheet();

  const present = useCallback(
    async (
      payload: PaymentSheetPayload,
      options?: { email?: string; name?: string }
    ) => {
      const init = await initPaymentSheet({
        merchantDisplayName: "Vuior",
        paymentIntentClientSecret: payload.clientSecret,
        ...(payload.customer && payload.ephemeralKey
          ? {
              customerId: payload.customer,
              customerEphemeralKeySecret: payload.ephemeralKey,
            }
          : {}),
        defaultBillingDetails: {
          email: options?.email,
          name: options?.name,
        },
        allowsDelayedPaymentMethods: true,
        returnURL: "vuior://stripe-redirect",
      });

      if (init.error) {
        throw new Error(init.error.message);
      }

      const result = await presentPaymentSheet();
      if (result.error) {
        throw new Error(result.error.message);
      }
    },
    [initPaymentSheet, presentPaymentSheet]
  );

  return { present };
}
