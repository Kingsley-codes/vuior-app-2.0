export interface AppUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "user" | "powerUser";
  avatar?: string;
  dob?: string;
  address?: string;
  phoneNo?: string;
  accountType?: "personal" | "business";
  businessName?: string | null;
  referralCode?: string;
  profileLink?: string;
  redeemedReferralCode?: boolean;
  availableCredits?: number;
  totalDocuments?: number;
  stripeCustomerId?: string | null;
  timeZone?: string;
}

export interface Bill {
  id: string;
  amount?: number;
  due_date?: string;
  dueDate?: string;
  status?: string;
  name?: string;
  billerName?: string;
  autoPay?: boolean;
  isDeleted?: boolean;
  accountNumber?: string;
  user_id?: string;
}

export interface CreditHistory {
  id: string;
  type?: string;
  credits?: number;
  date?: unknown;
  reference?: string;
  status?: string;
  userId?: string;
}

export interface AppStats {
  totalCredits?: number;
  totalSavings?: number;
  earnedCredits?: number;
  totalBillPayment?: number;
  totalBillPaymentsThisYear?: number;
  totalSavingsThisMonth?: number;
  totalSavingsThisYear?: number;
  totalBillPaymentsThisMonth?: number;
  earnedCreditsThisMonth?: number;
  earnedCreditsThisYear?: number;
}
