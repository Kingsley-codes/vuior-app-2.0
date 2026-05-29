/**
 * Mirrors web transaction.tsx early-pay savings (Luxon-free).
 */

export interface BillForSavings {
  amount?: number;
  dueDate?: string;
  due_date?: string;
}

function parseDue(raw?: string): Date | null {
  if (!raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function daysBetween(later: Date, earlier: Date) {
  const ms = startOfDay(later).getTime() - startOfDay(earlier).getTime();
  return Math.floor(ms / (24 * 60 * 60 * 1000));
}

function savingsPercent(daysEarly: number): number {
  if (daysEarly >= 15) return 15;
  if (daysEarly >= 8) return 10;
  if (daysEarly >= 4) return 5;
  if (daysEarly >= 1) return 2;
  return 0;
}

function todayInTimeZone(timeZone?: string): Date {
  const now = new Date();
  if (!timeZone) return startOfDay(now);
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(now);
    const y = Number(parts.find((p) => p.type === "year")?.value);
    const m = Number(parts.find((p) => p.type === "month")?.value);
    const d = Number(parts.find((p) => p.type === "day")?.value);
    return startOfDay(new Date(y, m - 1, d));
  } catch {
    return startOfDay(now);
  }
}

export function calculateSavingsForBills(
  timeZone: string | undefined,
  bills: BillForSavings[]
): { totalSavings: number; unifiedDueDate: string | null; percentageApplied: number } {
  if (bills.length === 0) {
    return { totalSavings: 0, unifiedDueDate: null, percentageApplied: 0 };
  }

  const today = todayInTimeZone(timeZone);

  if (bills.length === 1) {
    const bill = bills[0];
    const due = parseDue(bill.dueDate || bill.due_date);
    const amount = Number(bill.amount || 0);
    if (!due || amount <= 0) {
      return { totalSavings: 0, unifiedDueDate: null, percentageApplied: 0 };
    }
    const daysEarly = daysBetween(due, today);
    const pct = savingsPercent(daysEarly);
    return {
      totalSavings: (amount * pct) / 100,
      unifiedDueDate: (bill.dueDate || bill.due_date) ?? null,
      percentageApplied: pct,
    };
  }

  const totalAmount = bills.reduce((sum, b) => sum + Number(b.amount || 0), 0);
  const dates = bills
    .map((b) => parseDue(b.dueDate || b.due_date))
    .filter((d): d is Date => d !== null)
    .sort((a, b) => a.getTime() - b.getTime());
  const earliest = dates[0];

  return {
    totalSavings: totalAmount * 0.15,
    unifiedDueDate: earliest ? earliest.toISOString().slice(0, 10) : null,
    percentageApplied: 15,
  };
}
