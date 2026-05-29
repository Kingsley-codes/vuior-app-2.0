import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeHeader() {
  return (
    <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
      <View>
        <Text className="text-vuior-dark-secondary-text text-sm font-inter-medium">
          Good morning,
        </Text>
        <View className="flex-row items-center gap-x-2 mt-0.5">
          <Text className="text-white text-2xl font-inter-bold">Jennifer</Text>
          <Text className="text-2xl">👋</Text>
        </View>
      </View>

      {/* Notification Bell */}
      <TouchableOpacity
        className="w-12 h-12 rounded-full border border-vuior-dark-border items-center justify-center relative"
        activeOpacity={0.7}
      >
        <Ionicons name="notifications-outline" size={22} color="#e5e7eb" />
        {/* Active dot */}
        <View className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-vuior-neon-green" />
      </TouchableOpacity>
    </View>
  );
}
