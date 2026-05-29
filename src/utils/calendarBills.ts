export interface CalendarBillInput {
  name: string;
  dueDate: string;
  amount: number;
  status: string;
}

export type BillsByMonth = Record<
  string,
  Record<string, { name: string; amount: number; day: number; status: string }[]>
>;

/** Group bills by calendar year and English month name (lowercase), matching web CalenderBox. */
export function getUpcomingBillsByMonth(bills: CalendarBillInput[]): BillsByMonth {
  const currentDate = new Date();
  const todayDay = currentDate.getDate();
  const todayMonth = currentDate.toLocaleString("default", { month: "long" }).toLowerCase();
  const todayYear = currentDate.getFullYear();

  const groupedBills: BillsByMonth = {};

  bills.forEach((bill) => {
    const billDueDate = new Date(bill.dueDate);
    if (Number.isNaN(billDueDate.getTime())) return;
    const billYear = billDueDate.getFullYear();
    const month = billDueDate.toLocaleString("default", { month: "long" }).toLowerCase();
    const day = billDueDate.getDate();

    if (!groupedBills[billYear]) groupedBills[billYear] = {};
    if (!groupedBills[billYear][month]) groupedBills[billYear][month] = [];

    groupedBills[billYear][month].push({
      name: bill.name,
      amount: bill.amount,
      day,
      status: bill.status,
    });
  });

  bills.forEach((bill) => {
    const billDueDate = new Date(bill.dueDate);
    if (Number.isNaN(billDueDate.getTime())) return;
    if (
      billDueDate.getFullYear() === todayYear &&
      billDueDate.getMonth() === currentDate.getMonth() &&
      billDueDate.getDate() === todayDay
    ) {
      if (!groupedBills[todayYear]) groupedBills[todayYear] = {};
      if (!groupedBills[todayYear][todayMonth]) groupedBills[todayYear][todayMonth] = [];

      if (
        !groupedBills[todayYear][todayMonth].some(
          (item) => item.day === todayDay && item.name === bill.name
        )
      ) {
        groupedBills[todayYear][todayMonth].push({
          name: bill.name,
          amount: bill.amount,
          day: todayDay,
          status: bill.status,
        });
      }
    }
  });

  return groupedBills;
}

export function savingsPercentForDaysEarly(daysEarly: number): number {
  if (daysEarly >= 15) return 15;
  if (daysEarly >= 8) return 10;
  if (daysEarly >= 4) return 5;
  if (daysEarly >= 1) return 2;
  return 0;
}
