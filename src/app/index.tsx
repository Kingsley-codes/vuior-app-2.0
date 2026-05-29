import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const router = useRouter();
  const { loading, user } = useAuth();

  useEffect(() => {
    if (loading) return;

    router.replace(user ? "/(dashboard)" : "/(auth)/sign-in");
  }, [loading, router, user]);

  return (
    <View className="flex-1 items-center justify-center bg-vuior-dark-bg">
      <ActivityIndicator color="#00b874" />
    </View>
  );
}
