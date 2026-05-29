import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  collection,
  documentId,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { AppStats, Bill, CreditHistory } from "../types/user";
import { useAuthContext } from "./AuthContext";

interface UserAssetsValue {
  userBills: Bill[];
  userCredits: CreditHistory[];
  userPreviousTransactions: Array<Record<string, unknown>>;
  stats: AppStats | null;
}

const UserAssetsContext = createContext<UserAssetsValue | undefined>(undefined);

export function UserAssetsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthContext();
  const [userBills, setUserBills] = useState<Bill[]>([]);
  const [userCredits, setUserCredits] = useState<CreditHistory[]>([]);
  const [userPreviousTransactions, setUserPreviousTransactions] = useState<
    Array<Record<string, unknown>>
  >([]);
  const [stats, setStats] = useState<AppStats | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setUserBills([]);
      setUserCredits([]);
      setUserPreviousTransactions([]);
      setStats(null);
      return;
    }

    const billsQuery = query(
      collection(db, "bills"),
      where("user_id", "==", user.id),
      where("isDeleted", "==", false)
    );
    const unsubscribeBills = onSnapshot(billsQuery, (snapshot) => {
      setUserBills(
        snapshot.docs.map((item) => ({
          id: item.id,
          ...(item.data() as Omit<Bill, "id">),
        }))
      );
    });

    const creditsQuery = query(
      collection(db, "creditHistory"),
      where("userId", "==", user.id),
      orderBy("date", "desc"),
      limit(25)
    );
    const unsubscribeCredits = onSnapshot(creditsQuery, (snapshot) => {
      setUserCredits(
        snapshot.docs.map((item) => ({
          id: item.id,
          ...(item.data() as Omit<CreditHistory, "id">),
        }))
      );
    });

    const transactionsQuery = query(
      collection(db, "paymentHistory"),
      where("userId", "==", user.id),
      orderBy("date", "desc"),
      limit(25)
    );
    const unsubscribeTransactions = onSnapshot(transactionsQuery, (snapshot) => {
      setUserPreviousTransactions(
        snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }))
      );
    });

    const statsQuery = query(
      collection(db, "stats"),
      where(documentId(), "==", user.id)
    );
    const unsubscribeStats = onSnapshot(statsQuery, (snapshot) => {
      const first = snapshot.docs[0];
      setStats(first ? (first.data() as AppStats) : null);
    });

    return () => {
      unsubscribeBills();
      unsubscribeCredits();
      unsubscribeTransactions();
      unsubscribeStats();
    };
  }, [user?.id]);

  const value = useMemo(
    () => ({ userBills, userCredits, userPreviousTransactions, stats }),
    [userBills, userCredits, userPreviousTransactions, stats]
  );

  return (
    <UserAssetsContext.Provider value={value}>
      {children}
    </UserAssetsContext.Provider>
  );
}

export function useUserAssetsContext() {
  const context = useContext(UserAssetsContext);
  if (!context) {
    throw new Error("useUserAssetsContext must be used within UserAssetsProvider");
  }
  return context;
}
