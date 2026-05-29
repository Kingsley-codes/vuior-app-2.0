const ENDPOINTS = {
  createStripeCustomer: "https://createstripecustomer-5risxnudva-uc.a.run.app",
  sendCredit: "https://sendcredit-5risxnudva-uc.a.run.app",
  createCheckoutSession: "https://createcheckoutsession-5risxnudva-uc.a.run.app",
  redeemReferralCode: "https://redeemreferralcode-5risxnudva-uc.a.run.app",
};

async function postJson<T>(url: string, body: Record<string, unknown>) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let data = {} as T & { message?: string };
  try {
    data = (await response.json()) as T & { message?: string };
  } catch {
    /* non-JSON body */
  }
  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }
  return data;
}

export async function createStripeCustomer(userId: string, email: string) {
  return postJson<{ stripeCustomerId: string }>(ENDPOINTS.createStripeCustomer, {
    userId,
    email,
  });
}

export async function sendCredits(params: {
  userId: string;
  creditToSend: number;
  profileLink: string;
}) {
  return postJson<{ message: string }>(ENDPOINTS.sendCredit, params);
}

export async function createCheckoutSession(params: {
  credits: number;
  userId: string;
  success_url: string;
  cancel_url: string;
}) {
  return postJson<{ sessionId: string; url?: string }>(ENDPOINTS.createCheckoutSession, params);
}

export async function redeemReferralCode(params: { referralCode: string; userId: string }) {
  return postJson<{ message: string }>(ENDPOINTS.redeemReferralCode, params);
}

/** Stripe-hosted Checkout URL from session id (same as stripe.redirectToCheckout). */
export function stripeCheckoutUrl(sessionId: string) {
  return `https://checkout.stripe.com/c/pay/${sessionId}`;
}
