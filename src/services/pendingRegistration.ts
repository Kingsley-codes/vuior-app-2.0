interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneCountry: string;
  phoneLocal: string;
  dob: string;
  accountType: "personal" | "business";
  businessName?: string;
}

let pendingRegistration: RegisterPayload | null = null;

export function setPendingRegistration(payload: RegisterPayload): void {
  pendingRegistration = payload;
}

export function getPendingRegistration(): RegisterPayload | null {
  return pendingRegistration;
}

export function clearPendingRegistration(): void {
  pendingRegistration = null;
}
