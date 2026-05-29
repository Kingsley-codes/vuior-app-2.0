/**
 * app/(dashboard)/_layout.tsx
 *
 * Dashboard layout using Expo Router file-based navigation.
 * Uses a custom BottomTabBar instead of the default one so we
 * can render the floating "Pay" center button exactly as designed.
 *
 * Folder structure assumed:
 *   app/
 *     (dashboard)/
 *       _layout.tsx       ← this file
 *       index.tsx         → Home tab  (HomeScreen)
 *       bills.tsx         → Bills tab
 *       pay.tsx           → Pay (center FAB) tab
 *       savings.tsx       → Savings tab
 *       profile.tsx       → Profile tab
 */

import { Tabs } from "expo-router";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// ---------------------------------------------------------------------------
// Custom tab bar
// ---------------------------------------------------------------------------
function CustomTabBar({ state, descriptors, navigation }: any) {
  const TABS = [
    { route: "index", label: "Home", icon: "home" },
    { route: "bills", label: "Bills", icon: "bills" },
    { route: "pay", label: "Pay", icon: "pay", isCenter: true },
    { route: "savings", label: "Savings", icon: "savings" },
    { route: "profile", label: "Profile", icon: "profile" },
  ];

  return (
    <View className="bg-vuior-dark-bg border-t border-vuior-dark-border px-4 pt-3 pb-6">
      <View className="flex-row items-center justify-between">
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const tabConfig = TABS.find((t) => t.route === route.name) ?? TABS[0];
          const isCenter = tabConfig.isCenter;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Center "Pay" FAB
          if (isCenter) {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                className="items-center -mt-6"
                activeOpacity={0.85}
              >
                <View className="w-14 h-14 rounded-full bg-vuior-primary items-center justify-center shadow-lg">
                  <Ionicons name="paper-plane" size={22} color="white" />
                </View>
                <Text className="text-gray-400 text-xs mt-1.5 font-inter-medium">
                  Pay
                </Text>
              </TouchableOpacity>
            );
          }

          // Regular tabs
          const iconColor = isFocused ? "#00b874" : "#9ca3af";
          let iconNode: React.ReactNode;

          switch (tabConfig.icon) {
            case "home":
              iconNode = (
                <Ionicons
                  name={isFocused ? "home" : "home-outline"}
                  size={22}
                  color={iconColor}
                />
              );
              break;
            case "bills":
              iconNode = (
                <MaterialCommunityIcons
                  name={isFocused ? "file-document" : "file-document-outline"}
                  size={22}
                  color={iconColor}
                />
              );
              break;
            case "savings":
              iconNode = (
                <Ionicons
                  name={isFocused ? "bar-chart" : "bar-chart-outline"}
                  size={22}
                  color={iconColor}
                />
              );
              break;
            case "profile":
              iconNode = (
                <Ionicons
                  name={isFocused ? "person" : "person-outline"}
                  size={22}
                  color={iconColor}
                />
              );
              break;
            default:
              iconNode = null;
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              className="flex-1 items-center gap-y-1"
              activeOpacity={0.7}
            >
              {iconNode}
              <Text
                className={`text-xs font-inter-medium ${
                  isFocused ? "text-vuior-primary" : "text-gray-500"
                }`}
              >
                {tabConfig.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Layout export
// ---------------------------------------------------------------------------
export default function DashboardLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="bills" />
      <Tabs.Screen name="pay" />
      <Tabs.Screen name="savings" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
