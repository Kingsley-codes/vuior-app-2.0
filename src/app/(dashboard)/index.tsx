import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "@/components/homeScreen/Homeheader";
import BalanceCard from "@/components/homeScreen/Balancecard";
import QuickActions from "@/components/homeScreen/Quickactions";
import SavingsOverview from "@/components/homeScreen/Savingsoverview";
import MaximizeSavings from "@/components/homeScreen/Maximizesavings";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-vuior-dark-bg" style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#021b14" />

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021b14",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
});
