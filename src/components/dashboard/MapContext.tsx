// components/dashboard/MapContext.tsx
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function MapContext() {
  return (
    <View className="relative w-full h-48 rounded-xl overflow-hidden border border-outline-variant">
      <Image
        source={{
          uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxbHyvuWOJFM3aRaGFKlBwGiYvO5rKPbJUKbA3OI_YRfVeVyrXNJ58noSXKox4cPum8BqFfxqVUpAfFqtOe7vxS72MEhqc3xAtobyaft5sNlfrpYgYAZiagiRQVkBeitYDZsEUGxlGI30bmzkeJmebmDcxzZ400uuGeajE1KRDB0_4HuplYpykPfnIo_vE6wf7-sfSiPfmsFFllHBgRGMJwA9FGJ0zCzKX1LUaF05noRE3UTrn_xcAmoBqqokgn6GEyrfVBRX-kY8",
        }}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
        style={{ opacity: 0.5 }}
      />

      {/* Gradient overlay */}
      <LinearGradient
        className="absolute inset-0"
        colors={["#fcf8ff", "transparent"]}
      />

      {/* Bottom info row */}
      <View className="absolute bottom-4 left-4 right-4 flex-row justify-between items-end">
        <View>
          <Text
            className="text-primary text-sm font-bold"
            style={{ fontFamily: "JetBrainsMono_500Medium" }}
          >
            Active Zone
          </Text>
          <Text
            className="text-on-surface-variant text-[11px]"
            style={{ fontFamily: "JetBrainsMono_500Medium" }}
          >
            Subdivision B-4
          </Text>
        </View>

        <TouchableOpacity
          className="w-9 h-9 rounded-full bg-white border border-outline-variant items-center justify-center shadow-sm"
          activeOpacity={0.8}
        >
          <MaterialIcons name="near-me" size={18} color="#00003c" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
