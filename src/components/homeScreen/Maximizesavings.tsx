import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const tiers = [
  {
    id: "1-3",
    label: "1 – 3 days early",
    subtitle: "Pay a few days early",
    reward: "+2%",
  },
  {
    id: "4-7",
    label: "4 – 7 days early",
    subtitle: "Pay a week early",
    reward: "+5%",
  },
  {
    id: "8+",
    label: "8+ days early",
    subtitle: "Pay well in advance",
    reward: "+8%",
  },
];

export default function MaximizeSavings() {
  return (
    <View className="mx-5 mt-5 mb-8 bg-white rounded-2xl p-5">
      {/* Header */}
      <Text className="text-vuior-green-900 text-base font-inter-bold mb-1">
        Maximize Your Savings
      </Text>
      <Text className="text-gray-500 text-xs font-inter-medium mb-5">
        Earn more by paying your bills early
      </Text>

      {/* Tiers */}
      {tiers.map((tier, index) => (
        <TouchableOpacity
          key={tier.id}
          activeOpacity={0.7}
          className={`flex-row items-center py-4 ${
            index < tiers.length - 1 ? "border-b border-gray-100" : ""
          }`}
        >
          {/* Icon */}
          <View className="w-10 h-10 rounded-full bg-vuior-green-50 items-center justify-center mr-3">
            <Ionicons name="calendar-outline" size={18} color="#00b874" />
          </View>

          {/* Text */}
          <View className="flex-1">
            <Text className="text-vuior-green-900 text-sm font-inter-semibold">
              {tier.label}
            </Text>
            <Text className="text-gray-500 text-xs mt-0.5">
              {tier.subtitle}
            </Text>
          </View>

          {/* Reward + Arrow */}
          <View className="flex-row items-center gap-x-2">
            <Text className="text-vuior-primary text-base font-inter-bold">
              {tier.reward}
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
