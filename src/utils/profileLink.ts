import type { AppUser } from "../types/user";

const HOST_RE = /vuior\.com/i;
const PROFILE_PATH_RE = /\/(?:user|u)\/([a-zA-Z0-9_-]+)/i;

function baseSiteUrl(): string {
  return (process.env.EXPO_PUBLIC_VERIFICATION_PAGE_BASE_URL || "https://vuior.com").replace(/\/$/, "");
}

/** Full HTTPS URL to encode in the user's QR (same shape as pasted into Send credits). */
export function getShareableProfileLinkForQr(user: AppUser): string | null {
  const raw = user.profileLink?.trim();
  if (raw) {
    if (/^https?:\/\//i.test(raw)) return raw;
    return `https://${raw.replace(/^\/+/, "")}`;
  }
  const code = user.referralCode?.trim();
  if (code) {
    return `${baseSiteUrl()}/user/${code}`;
  }
  return null;
}

/**
 * Parse QR / pasted text into a profile URL we can send to the credits API.
 * Accepts full URLs or strings containing vuior.com/.../user|u/...
 */
export function extractProfileLinkFromScan(raw: string): string | null {
  const t = raw.trim();
  if (!t) return null;

  const tryNormalize = (href: string): string | null => {
    try {
      const u = new URL(href);
      if (!HOST_RE.test(u.hostname)) return null;
      if (!PROFILE_PATH_RE.test(u.pathname) && !/\/user\//i.test(u.pathname) && !/\/u\//i.test(u.pathname)) {
        return null;
      }
      return `${u.protocol}//${u.hostname}${u.pathname}`.replace(/\/$/, "");
    } catch {
      return null;
    }
  };

  let normalized = tryNormalize(t);
  if (normalized) return normalized;

  if (!t.includes("://") && HOST_RE.test(t)) {
    normalized = tryNormalize(`https://${t.replace(/^\/+/, "")}`);
    if (normalized) return normalized;
  }

  return null;
}
