import { View, Text, TouchableOpacity } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const actions = [
  {
    id: "add-funds",
    label: "Add Funds",
    icon: (
      <MaterialCommunityIcons name="wallet-plus" size={28} color="#00b874" />
    ),
  },
  {
    id: "pay-bills",
    label: "Pay Bills",
    icon: (
      <MaterialCommunityIcons name="file-document" size={28} color="#00b874" />
    ),
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: (
      <MaterialCommunityIcons
        name="swap-horizontal"
        size={28}
        color="#00b874"
      />
    ),
  },
  {
    id: "history",
    label: "History",
    icon: <MaterialCommunityIcons name="history" size={28} color="#00b874" />,
  },
];

export default function QuickActions() {
  return (
    <View className="px-5 mt-6">
      {/* Section Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-white text-base font-inter-bold">
          Quick Actions
        </Text>
        <TouchableOpacity
          className="flex-row items-center gap-x-1"
          activeOpacity={0.7}
        >
          <Text className="text-vuior-primary text-sm font-inter-semibold">
            See All
          </Text>
          <Ionicons name="chevron-forward" size={14} color="#00b874" />
        </TouchableOpacity>
      </View>

      {/* Action Grid */}
      <View className="flex-row gap-x-3">
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            className="flex-1 bg-white rounded-2xl items-center py-4 px-2"
            activeOpacity={0.8}
          >
            <View className="mb-3">{action.icon}</View>
            <Text className="text-vuior-green-900 text-xs font-inter-semibold text-center">
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
