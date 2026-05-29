import { useState } from "react";
import { View, ScrollView, StatusBar, SafeAreaView } from "react-native";
import HomeHeader from "../components/HomeHeader";
import BalanceCard from "../components/BalanceCard";
import QuickActions from "../components/QuickActions";
import SavingsOverview from "../components/SavingsOverview";
import MaximizeSavings from "../components/MaximizeSavings";
import BottomTabBar from "../components/BottomTabBar";

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
