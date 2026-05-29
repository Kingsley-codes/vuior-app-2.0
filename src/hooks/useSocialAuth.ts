import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Platform } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router";
import { useAuth } from "./useAuth";
import { getAuthErrorMessage } from "@/utils/authErrors";

WebBrowser.maybeCompleteAuthSession();

type SocialProvider = "google" | "apple";

const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
const GOOGLE_IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
const GOOGLE_ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;

function hasGoogleClientId() {
  if (Platform.OS === "ios") return Boolean(GOOGLE_IOS_CLIENT_ID);
  if (Platform.OS === "android") {
    return Boolean(
      GOOGLE_ANDROID_CLIENT_ID &&
        !GOOGLE_ANDROID_CLIENT_ID.toLowerCase().startsWith("xxxx")
    );
  }
  return Boolean(GOOGLE_WEB_CLIENT_ID);
}

function randomNonce(length = 32) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._";
  const bytes = Crypto.getRandomBytes(length);

  return Array.from(bytes)
    .map((byte) => chars[byte % chars.length])
    .join("");
}

function isCancelError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "ERR_REQUEST_CANCELED"
  );
}

export function useSocialAuth() {
  const router = useRouter();
  const { signInWithGoogle, signInWithApple } = useAuth();
  const [socialSubmitting, setSocialSubmitting] = useState<SocialProvider | null>(
    null
  );
  const handledGoogleResponseUrl = useRef<string | null>(null);

  const [, googleResponse, promptGoogleAsync] = Google.useIdTokenAuthRequest(
    {
      webClientId: GOOGLE_WEB_CLIENT_ID,
      iosClientId: GOOGLE_IOS_CLIENT_ID,
      androidClientId: GOOGLE_ANDROID_CLIENT_ID,
      selectAccount: true,
    },
    {
      scheme: "myapp",
      path: "oauthredirect",
    }
  );

  useEffect(() => {
    if (!googleResponse || socialSubmitting !== "google") return;

    if (googleResponse.type !== "success") {
      setSocialSubmitting(null);
      return;
    }

    if (handledGoogleResponseUrl.current === googleResponse.url) return;
    handledGoogleResponseUrl.current = googleResponse.url;

    const idToken = googleResponse.params.id_token;
    if (!idToken) {
      setSocialSubmitting(null);
      Alert.alert("Google Sign In Failed", "Google did not return an ID token.");
      return;
    }

    void signInWithGoogle(idToken)
      .then(() => {
        router.replace("/(dashboard)");
      })
      .catch((error) => {
        Alert.alert("Google Sign In Failed", getAuthErrorMessage(error));
      })
      .finally(() => {
        setSocialSubmitting(null);
      });
  }, [googleResponse, router, signInWithGoogle, socialSubmitting]);

  const continueWithGoogle = useCallback(async () => {
    if (!hasGoogleClientId()) {
      Alert.alert(
        "Google Sign In Unavailable",
        "Google authentication is missing a client ID for this platform."
      );
      return;
    }

    setSocialSubmitting("google");
    try {
      const result = await promptGoogleAsync();
      if (result.type !== "success") {
        setSocialSubmitting(null);
      }
    } catch (error) {
      setSocialSubmitting(null);
      Alert.alert("Google Sign In Failed", getAuthErrorMessage(error));
    }
  }, [promptGoogleAsync]);

  const continueWithApple = useCallback(async () => {
    const isAvailable = await AppleAuthentication.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert(
        "Apple Sign In Unavailable",
        "Apple authentication is only available on supported Apple devices."
      );
      return;
    }

    setSocialSubmitting("apple");
    try {
      const rawNonce = randomNonce();
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        rawNonce
      );
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      });

      if (!credential.identityToken) {
        throw new Error("Apple did not return an identity token.");
      }

      await signInWithApple(credential.identityToken, rawNonce, {
        givenName: credential.fullName?.givenName,
        familyName: credential.fullName?.familyName,
      });
      router.replace("/(dashboard)");
    } catch (error) {
      if (!isCancelError(error)) {
        Alert.alert("Apple Sign In Failed", getAuthErrorMessage(error));
      }
    } finally {
      setSocialSubmitting(null);
    }
  }, [router, signInWithApple]);

  return {
    socialSubmitting,
    continueWithGoogle,
    continueWithApple,
  };
}
