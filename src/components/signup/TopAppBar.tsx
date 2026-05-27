// components/auth/TopAppBar.tsx
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function TopAppBar() {
  return (
    <View className="flex-row justify-between items-center h-14 px-4 bg-surface border-b border-outline-variant">
      {/* Brand */}
      <View className="flex-row items-center gap-2">
        <MaterialIcons name="analytics" size={22} color="#00003c" />
        <Text
          className="text-primary text-xl font-bold"
          style={{ fontFamily: "HankenGrotesk_700Bold" }}
        >
          CanvassPro
        </Text>
      </View>

      {/* Sync indicator */}
      <MaterialIcons name="sync" size={22} color="#00003c" />
    </View>
  );
}
