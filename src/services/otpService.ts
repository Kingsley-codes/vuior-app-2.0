const SERVICE_ID = "service_j17uiar";
const TEMPLATE_ID = "template_2rsiv8q";
const PUBLIC_KEY = "O6aIOujSd28u6JbI0";

// In-memory OTP store (for the current session)
let currentOtp: { code: string; email: string; expiresAt: number } | null = null;

/** Generate a random 6-digit OTP */
function generateOTP(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

/** Send OTP email via EmailJS */
export async function sendOTP(email: string): Promise<void> {
  const code = generateOTP();
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes
  // Store OTP in memory
  currentOtp = { code, email: email.toLowerCase().trim(), expiresAt };

  // RN-safe EmailJS REST call (avoids browser-only globals such as `location`).
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: PUBLIC_KEY,
      template_params: {
        email: email.trim(),
        passcode: code,
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Unable to send OTP email.");
  }
}

/** Verify the OTP code */
export function verifyOTP(email: string, code: string): { valid: boolean; message: string } {
  if (!currentOtp) {
    return { valid: false, message: "No OTP was sent. Please request a new code." };
  }

  if (currentOtp.email !== email.toLowerCase().trim()) {
    return { valid: false, message: "Email does not match. Please request a new code." };
  }

  if (Date.now() > currentOtp.expiresAt) {
    currentOtp = null;
    return { valid: false, message: "OTP has expired. Please request a new code." };
  }

  if (currentOtp.code !== code.trim()) {
    return { valid: false, message: "Invalid OTP. Please try again." };
  }

  // Valid - clear the OTP
  currentOtp = null;
  return { valid: true, message: "Email verified successfully." };
}

/** Clear any stored OTP */
export function clearOTP(): void {
  currentOtp = null;
}
