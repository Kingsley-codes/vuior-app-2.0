import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  initializeAuth,
  type Auth,
  type Persistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions, type Functions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

/** Provided by the React Native Auth bundle; omitted from default typings. */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getReactNativePersistence } = require("firebase/auth") as {
  getReactNativePersistence: (storage: typeof AsyncStorage) => Persistence;
};

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN || process.env.VITE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID || process.env.VITE_PROJECT_ID,
  storageBucket:
    process.env.EXPO_PUBLIC_STORAGE_BUCKET || process.env.VITE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID || process.env.VITE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID || process.env.VITE_APP_ID,
  measurementId:
    process.env.EXPO_PUBLIC_MEASUREMENT_ID || process.env.VITE_MEASUREMENT_ID,
};

export const app: FirebaseApp = initializeApp(firebaseConfig);

/**
 * Keeps the user signed in across app restarts on iOS/Android (AsyncStorage)—same outcome as a
 * persisted Redux auth slice. Firestore listeners in context repopulate user data when the session
 * restores. On web, default browser persistence applies.
 */
function createAuth(appInstance: FirebaseApp): Auth {
  if (Platform.OS === "web") {
    return getAuth(appInstance);
  }
  try {
    return initializeAuth(appInstance, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    return getAuth(appInstance);
  }
}

export const auth: Auth = createAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);

let functionsInstance: Functions | null = null;
export function getFirebaseFunctions(): Functions {
  if (!functionsInstance) {
    const region = process.env.EXPO_PUBLIC_FIREBASE_FUNCTIONS_REGION;
    functionsInstance = region ? getFunctions(app, region) : getFunctions(app);
  }
  return functionsInstance;
}

export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});
