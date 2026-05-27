import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";

export default function useSocialAuth() {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    if (loadingStrategy) return; // Prevent multiple clicks

    setLoadingStrategy(strategy);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });

      if (!createdSessionId || !setActive) {
        Alert.alert(
          "Authentication Error",
          `Failed to sign in with ${strategy === "oauth_google" ? "Google" : "Apple"}. Please try again.`,
        );
        return;
      }

      await setActive({ session: createdSessionId });
    } catch (error) {
      console.error(`Error during ${strategy} authentication:`, error);
      Alert.alert(
        "Authentication Error",
        `Failed to sign in with ${strategy === "oauth_google" ? "Google" : "Apple"}. Please try again.`,
      );
    } finally {
      setLoadingStrategy(null);
    }
  };
  return { loadingStrategy, handleSocialAuth };
}
