/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpsCallable, type HttpsCallableResult } from "firebase/functions";
import { getFirebaseFunctions } from "../config/firebase";

export interface PaymentSheetPayload {
  clientSecret: string;
  ephemeralKey: string | null;
  customer: string | null;
}

function asPayload(data: unknown): PaymentSheetPayload {
  const o = data as any;
  if (!o?.clientSecret || typeof o.clientSecret !== "string") {
    throw new Error("Invalid payment response from server.");
  }
  return {
    clientSecret: o.clientSecret,
    ephemeralKey: typeof o.ephemeralKey === "string" ? o.ephemeralKey : null,
    customer: typeof o.customer === "string" ? o.customer : null,
  };
}

async function callFunction<TReq extends Record<string, unknown>>(
  name: "createCreditsPaymentSheet" | "createBillsPaymentSheet",
  data: TReq
): Promise<PaymentSheetPayload> {
  const fn = httpsCallable(getFirebaseFunctions(), name);
  let result: HttpsCallableResult<unknown>;
  try {
    result = await fn(data);
  } catch (e: any) {
    const msg =
      e?.message ||
      e?.details ||
      (typeof e?.code === "string" ? e.code : null) ||
      "Cloud function failed.";
    throw new Error(String(msg));
  }
  return asPayload(result.data);
}

export async function fetchCreditsPaymentSheet(params: {
  amountUsd: number;
  customerId?: string | null;
  email?: string;
}): Promise<PaymentSheetPayload> {
  return callFunction("createCreditsPaymentSheet", {
    amountUsd: params.amountUsd,
    customerId: params.customerId || null,
    email: params.email || null,
  });
}

export async function fetchBillsPaymentSheet(params: {
  totalUsd: number;
  stripeCustomerId?: string | null;
  billIds: string[];
}): Promise<PaymentSheetPayload> {
  return callFunction("createBillsPaymentSheet", {
    totalUsd: params.totalUsd,
    stripeCustomerId: params.stripeCustomerId || null,
    billIds: params.billIds,
  });
}
