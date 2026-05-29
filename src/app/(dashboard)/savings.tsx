import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavingsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-vuior-dark-bg" style={styles.container}>
      <View style={styles.content}>
        <Text className="text-white text-2xl font-inter-bold" style={styles.title}>
          Savings
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021b14",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
});
