// components/auth/LoginHero.tsx
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function LoginHero() {
  return (
    <View className="items-center mb-6">
      {/* Icon badge */}
      <View className="w-16 h-16 bg-primary-container rounded-full items-center justify-center mb-4">
        <MaterialIcons name="account-balance" size={32} color="#ffffff" />
      </View>

      <Text
        className="text-on-surface text-2xl font-semibold mb-2 text-center"
        style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
      >
        Welcome Back
      </Text>
      <Text
        className="text-on-surface-variant text-base text-center leading-6"
        style={{ fontFamily: "Inter_400Regular" }}
      >
        Sign in to your Ocofamerica account to start canvassing.
      </Text>
    </View>
  );
}
