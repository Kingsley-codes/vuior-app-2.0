import { Timestamp } from "firebase/firestore";

/** Normalize Firestore Timestamp, {seconds}, or string for display / inputs. */
export function formatFirestoreDate(value: unknown): string {
  if (value == null || value === "") return "";
  if (typeof value === "string") return value;
  if (value instanceof Timestamp) {
    const d = value.toDate();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  if (typeof value === "object" && value !== null && "seconds" in value) {
    const sec = (value as { seconds: number }).seconds;
    const d = new Date(sec * 1000);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  return "";
}

export function formatAddress(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null && "formatted_address" in value) {
    return String((value as { formatted_address: string }).formatted_address);
  }
  return String(value);
}
