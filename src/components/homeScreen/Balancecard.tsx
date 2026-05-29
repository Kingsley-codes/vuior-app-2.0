import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function BalanceCard() {
  return (
    <View className="mx-5 mt-3 rounded-2xl overflow-hidden">
      <ImageBackground
        source={require("../../../assets/balance-bg.png")}
        className="rounded-2xl overflow-hidden"
        resizeMode="cover"
      >
        {/* Dark overlay for readability */}
        <View className="bg-vuior-glass-green rounded-2xl p-5">
          {/* Top Row */}
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-x-2">
              <Text className="text-vuior-dark-secondary-text text-sm font-inter-medium">
                Available Balance
              </Text>
              <Ionicons name="eye-outline" size={18} color="#9ca3af" />
            </View>

            {/* Wallet icon button */}
            <TouchableOpacity
              className="w-10 h-10 rounded-xl bg-white/10 items-center justify-center"
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name="wallet-outline"
                size={20}
                color="#e5e7eb"
              />
            </TouchableOpacity>
          </View>

          {/* Balance Amount */}
          <Text className="text-white text-4xl font-inter-bold mb-3">
            $1,245.00
          </Text>

          {/* Earned badge */}
          <TouchableOpacity
            className="self-start flex-row items-center gap-x-1.5 bg-vuior-green-700/60 rounded-full px-3 py-1.5 mb-5"
            activeOpacity={0.8}
          >
            <Ionicons name="trending-up" size={14} color="#19e28f" />
            <Text className="text-vuior-neon-green text-xs font-inter-semibold">
              This week you earned $56.00
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="border-t border-white/10 mb-4" />

          {/* Stats Row */}
          <View className="flex-row items-center">
            {/* Total Earned */}
            <View className="flex-1 flex-row items-center gap-x-3">
              <View className="w-8 h-8 rounded-full border border-white/20 items-center justify-center">
                <Ionicons name="cash-outline" size={16} color="#9ca3af" />
              </View>
              <View>
                <Text className="text-vuior-dark-secondary-text text-xs font-inter-medium">
                  Total Earned
                </Text>
                <Text className="text-white text-sm font-inter-bold">
                  $342.50
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View className="w-px h-10 bg-white/10 mx-3" />

            {/* Bills Paid Early */}
            <View className="flex-1 flex-row items-center gap-x-3">
              <View className="w-8 h-8 rounded-full border border-white/20 items-center justify-center">
                <Ionicons name="calendar-outline" size={16} color="#9ca3af" />
              </View>
              <View>
                <Text className="text-vuior-dark-secondary-text text-xs font-inter-medium">
                  Bills Paid Early
                </Text>
                <Text className="text-white text-sm font-inter-bold">12</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
