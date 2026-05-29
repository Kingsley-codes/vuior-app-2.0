import { useEffect } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

const launchIcon = require("../../assets/favicon.png");

export default function Index() {
  const router = useRouter();
  const { loading, user } = useAuth();

  useEffect(() => {
    if (loading) return;

    router.replace(user ? "/(dashboard)" : "/(auth)/sign-in");
  }, [loading, router, user]);

  return (
    <View className="flex-1 items-center justify-center bg-vuior-dark-bg">
      <Image
        source={launchIcon}
        style={{ width: 160, height: 116, marginBottom: 24 }}
        resizeMode="contain"
      />
      <ActivityIndicator color="#00b874" />
    </View>
  );
}
