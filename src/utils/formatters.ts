/** Format a 10-digit US phone string as (XXX) XXX-XXXX */
export function formatUSPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** Strip formatting and return raw digits from a US phone string */
export function unformatUSPhone(formatted: string): string {
  return formatted.replace(/\D/g, "").slice(0, 10);
}

/** Format a date string as MM/DD/YYYY for display */
export function formatUSDate(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

/** Convert MM/DD/YYYY to YYYY-MM-DD for storage */
export function usDateToISO(formatted: string): string {
  const parts = formatted.split("/");
  if (parts.length !== 3 || parts[2].length !== 4) return formatted;
  return `${parts[2]}-${parts[0].padStart(2, "0")}-${parts[1].padStart(2, "0")}`;
}

/** Convert YYYY-MM-DD to MM/DD/YYYY for display */
export function isoToUSDate(iso: string): string {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return iso;
  return `${match[2]}/${match[3]}/${match[1]}`;
}

/** Format credit/money input — only digits + one decimal, adds $ and commas: $10,000.00 */
export function formatCreditInput(raw: string): string {
  // Strip everything except digits and dot
  let cleaned = raw.replace(/[^0-9.]/g, "");
  if (!cleaned) return "";
  // Only allow one decimal point
  const dotIndex = cleaned.indexOf(".");
  if (dotIndex !== -1) {
    cleaned =
      cleaned.slice(0, dotIndex + 1) +
      cleaned.slice(dotIndex + 1).replace(/\./g, "");
    // Max 2 decimal places
    const afterDot = cleaned.slice(dotIndex + 1);
    if (afterDot.length > 2) {
      cleaned = cleaned.slice(0, dotIndex + 3);
    }
  }
  // Add commas to the integer part
  const parts = cleaned.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return "$" + parts.join(".");
}

/** Strip $, commas from formatted currency to get a clean numeric string */
export function unformatCurrency(formatted: string): string {
  return formatted.replace(/[$,]/g, "");
}

/** Format a number as $X,XXX.XX — use this for ALL dollar displays for compliance */
export function formatDollar(n: number): string {
  return "$" + Number(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
