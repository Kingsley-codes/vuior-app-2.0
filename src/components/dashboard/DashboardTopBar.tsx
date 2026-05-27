// components/dashboard/DashboardTopBar.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function DashboardTopBar() {
  return (
    <View className="flex-row justify-between items-center h-16 px-4 bg-surface border-b border-outline-variant shadow-sm">
      <TouchableOpacity
        className="flex-row items-center gap-2"
        activeOpacity={0.7}
      >
        <MaterialIcons name="sync" size={22} color="#00003c" />
        <Text
          className="text-primary text-2xl font-bold"
          style={{ fontFamily: "HankenGrotesk_700Bold" }}
        >
          District 12 - Ward 4
        </Text>
      </TouchableOpacity>

      <Text
        className="text-secondary text-xs font-bold tracking-widest"
        style={{ fontFamily: "JetBrainsMono_500Medium" }}
      >
        SYNCED
      </Text>
    </View>
  );
}
