import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import type { AppUser } from "../types/user";
import { formatAddress, formatFirestoreDate } from "../utils/firestoreDates";

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  /** E.164-style prefix, e.g. +1 */
  phoneCountry: string;
  /** Local digits (stored with country in `phoneNo`) */
  phoneLocal: string;
  dob: string;
  accountType: "personal" | "business";
  businessName?: string;
}

interface AuthContextType {
  user: AppUser | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  registerUser: (payload: RegisterPayload) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: (idToken: string) => Promise<void>;
  signInWithApple: (identityToken: string, rawNonce: string, fullName?: { givenName?: string | null; familyName?: string | null }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop";

async function upsertSocialUser(
  firebaseUser: FirebaseUser,
  overrides: { firstName?: string; lastName?: string } = {}
) {
  const ref = doc(db, "users", firebaseUser.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return;

  const displayParts = (firebaseUser.displayName || "").split(" ");
  const firstName = overrides.firstName || displayParts[0] || "";
  const lastName = overrides.lastName || displayParts.slice(1).join(" ") || "";

  await setDoc(ref, {
    email: firebaseUser.email || "",
    firstName,
    lastName,
    role: "user",
    phoneNo: "",
    avatar: firebaseUser.photoURL || DEFAULT_AVATAR,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dob: "",
    accountType: "personal",
    businessName: null,
    emailVerified: true,
    createdAt: new Date(),
    availableCredits: 0,
  });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AppUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    let unsubscribeUser: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (nextFirebaseUser) => {
      unsubscribeUser?.();
      unsubscribeUser = undefined;
      setFirebaseUser(nextFirebaseUser);

      if (!nextFirebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      const userRef = doc(db, "users", nextFirebaseUser.uid);
      unsubscribeUser = onSnapshot(
        userRef,
        (snapshot) => {
          if (!snapshot.exists()) {
            setUser(null);
            setLoading(false);
            return;
          }

          const data = snapshot.data();
          const appUser: AppUser = {
            id: nextFirebaseUser.uid,
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || nextFirebaseUser.email || "",
            role:
              data.role === "admin" || data.role === "powerUser"
                ? data.role
                : "user",
            avatar: data.avatar || "",
            dob: formatFirestoreDate(data.dob),
            address: formatAddress(data.address),
            phoneNo: typeof data.phoneNo === "string" ? data.phoneNo : formatAddress(data.phoneNo),
            accountType: data.accountType || "personal",
            businessName: data.businessName || null,
            referralCode: data.referralCode || "",
            profileLink: data.profileLink || "",
            redeemedReferralCode: data.redeemedReferralCode || false,
            availableCredits: data.availableCredits || 0,
            totalDocuments: data.totalDocuments || 0,
            stripeCustomerId: data.stripeCustomerId || null,
            timeZone: data.timeZone || "UTC",
          };

          if (data.emailVerified === true) {
            setUser(appUser);
          } else {
            setUser(null);
          }

          setLoading(false);
        },
        () => {
          setUser(null);
          setLoading(false);
        }
      );
    });

    return () => {
      unsubscribeUser?.();
      unsubscribeAuth();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, "users", credential.user.uid));
    if (!userDoc.exists()) {
      await signOut(auth);
      throw new Error("No Vuior profile was found for this account.");
    }

    if (userDoc.data().emailVerified !== true) {
      await signOut(auth);
      throw new Error("Your email is not verified yet.");
    }
  }, []);

  const registerUser = useCallback(async (payload: RegisterPayload) => {
    const credential = await createUserWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );

    const phoneNo = `${(payload.phoneCountry || "+1").trim()} ${payload.phoneLocal.replace(/\D/g, "")}`.trim();

    await setDoc(doc(db, "users", credential.user.uid), {
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: "user",
      phoneNo,
      avatar: DEFAULT_AVATAR,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      dob: payload.dob,
      accountType: payload.accountType,
      businessName: payload.businessName || null,
      // Registration only happens after OTP verification succeeds.
      emailVerified: true,
      createdAt: new Date(),
      availableCredits: 0,
    });
  }, []);

  const signInWithGoogle = useCallback(async (idToken: string) => {
    const credential = GoogleAuthProvider.credential(idToken);
    const result = await signInWithCredential(auth, credential);
    await upsertSocialUser(result.user);
  }, []);

  const signInWithApple = useCallback(
    async (
      identityToken: string,
      rawNonce: string,
      fullName?: { givenName?: string | null; familyName?: string | null }
    ) => {
      const provider = new OAuthProvider("apple.com");
      const credential = provider.credential({ idToken: identityToken, rawNonce });
      const result = await signInWithCredential(auth, credential);
      await upsertSocialUser(result.user, {
        firstName: fullName?.givenName ?? undefined,
        lastName: fullName?.familyName ?? undefined,
      });
    },
    []
  );

  const forgotPassword = useCallback(async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
    setFirebaseUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      firebaseUser,
      loading,
      login,
      registerUser,
      forgotPassword,
      logout,
      signInWithGoogle,
      signInWithApple,
    }),
    [user, firebaseUser, loading, login, registerUser, forgotPassword, logout, signInWithGoogle, signInWithApple]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
