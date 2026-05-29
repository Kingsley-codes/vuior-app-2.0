import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type Tab = {
  id: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
  isCenter?: boolean;
};

const TABS: Tab[] = [
  {
    id: "home",
    label: "Home",
    icon: (active) => (
      <Ionicons
        name={active ? "home" : "home-outline"}
        size={22}
        color={active ? "#00b874" : "#9ca3af"}
      />
    ),
  },
  {
    id: "bills",
    label: "Bills",
    icon: (active) => (
      <MaterialCommunityIcons
        name={active ? "file-document" : "file-document-outline"}
        size={22}
        color={active ? "#00b874" : "#9ca3af"}
      />
    ),
  },
  {
    id: "pay",
    label: "Pay",
    isCenter: true,
    icon: () => <Ionicons name="paper-plane" size={22} color="white" />,
  },
  {
    id: "savings",
    label: "Savings",
    icon: (active) => (
      <Ionicons
        name={active ? "bar-chart" : "bar-chart-outline"}
        size={22}
        color={active ? "#00b874" : "#9ca3af"}
      />
    ),
  },
  {
    id: "profile",
    label: "Profile",
    icon: (active) => (
      <Ionicons
        name={active ? "person" : "person-outline"}
        size={22}
        color={active ? "#00b874" : "#9ca3af"}
      />
    ),
  },
];

type Props = {
  activeTab: string;
  onTabPress: (id: string) => void;
};

export default function BottomTabBar({ activeTab, onTabPress }: Props) {
  return (
    <View className="bg-vuior-dark-bg border-t border-vuior-dark-border px-4 pt-3 pb-6">
      <View className="flex-row items-center justify-between">
        {TABS.map((tab) => {
          const active = activeTab === tab.id;

          if (tab.isCenter) {
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => onTabPress(tab.id)}
                className="items-center -mt-6"
                activeOpacity={0.85}
              >
                <View className="w-14 h-14 rounded-full bg-vuior-primary items-center justify-center shadow-lg shadow-vuior-primary/50">
                  {tab.icon(active)}
                </View>
                <Text className="text-gray-400 text-xs mt-1.5 font-inter-medium">
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => onTabPress(tab.id)}
              className="flex-1 items-center gap-y-1"
              activeOpacity={0.7}
            >
              {tab.icon(active)}
              <Text
                className={`text-xs font-inter-medium ${
                  active ? "text-vuior-primary" : "text-gray-500"
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
