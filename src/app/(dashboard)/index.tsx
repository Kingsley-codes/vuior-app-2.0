import { useState } from "react";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "@/components/homeScreen/Homeheader";
import BalanceCard from "@/components/homeScreen/Balancecard";
import QuickActions from "@/components/homeScreen/Quickactions";
import SavingsOverview from "@/components/homeScreen/Savingsoverview";
import MaximizeSavings from "@/components/homeScreen/Maximizesavings";
import BottomTabBar from "@/components/homeScreen/Bottomtabbar";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <SafeAreaView className="flex-1 bg-vuior-dark-bg">
      <StatusBar barStyle="light-content" backgroundColor="#021b14" />

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
        bounces
      >
        {/* Greeting Header */}
        <HomeHeader />

        {/* Balance Card */}
        <BalanceCard />

        {/* Quick Actions */}
        <QuickActions />

        {/* Savings Chart */}
        <SavingsOverview />

        {/* Maximize Savings Tiers */}
        <MaximizeSavings />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
}
