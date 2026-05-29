import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 40;
const CARD_HEIGHT = 230; // increased from 220 to give bottom row more room

export default function BalanceCard() {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 12,
        borderRadius: 16,
        overflow: "hidden",
        height: CARD_HEIGHT,
      }}
    >
      {/* Background image */}
      <Image
        source={require("../../../assets/new-bg.png")}
        style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
        resizeMode="cover"
      />

      {/* Content overlay */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: 20,
          justifyContent: "space-between",
        }}
      >
        {/* ── TOP SECTION ── */}
        <View>
          {/* Row: Available Balance + Wallet button */}
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-x-2">
              <Text className="text-vuior-dark-secondary-text text-sm font-inter-medium">
                Available Balance
              </Text>
              <Ionicons name="eye-outline" size={18} color="#9ca3af" />
            </View>

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

          {/* Balance */}
          <Text className="text-white text-4xl font-inter-bold mb-3">
            $1,245.00
          </Text>

          {/* Earned badge */}
          <TouchableOpacity
            className="self-start flex-row items-center gap-x-1.5 bg-vuior-green-700/60 rounded-full px-3 py-1.5"
            activeOpacity={0.8}
          >
            <Ionicons name="trending-up" size={14} color="#19e28f" />
            <Text className="text-vuior-neon-green text-xs font-inter-semibold">
              This week you earned $56.00
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── BOTTOM SECTION ── */}
        <View>
          {/* Divider */}
          <View className="border-t border-white/10 mb-4" />

          {/* Stats Row */}
          <View className="flex-row items-center pb-1">
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

            {/* Vertical divider */}
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
      </View>
    </View>
  );
}
