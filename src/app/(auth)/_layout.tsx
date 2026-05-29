// app/(auth)/_layout.tsx
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "@/hooks/useAuth";

export default function AuthLayout() {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color="#00b874" />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/(dashboard)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
