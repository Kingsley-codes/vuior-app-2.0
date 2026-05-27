// components/auth/SidePanel.tsx
import { View, Text, Image, Platform, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SidePanel() {
  const { width } = useWindowDimensions();

  // Only show on large web screens
  if (Platform.OS !== "web" || width < 1024) return null;

  return (
    <View
      className="absolute right-0 top-0 bottom-0 bg-primary overflow-hidden shadow-2xl"
      style={{ width: "33.333%" }}
    >
      {/* Background image */}
      <Image
        source={{
          uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-LBq5dwtd_LSA2vbQzg7vp-dNYnftk4q8vMamjnGwclgGw-md-3JSuTKOYlDo2ppyQf0mQ_At3nzPhbAsnc4LoTVtfSQwSQwzbEAFvo6PYmLbzqh75a0mmbhchDOACkRuWN32IAT_Q5OfOkt4-S-hu6kXUxU2tQUtdpfR7rT3QlOqz3AUsd1gqQABrTB2FZY12RQ0Sx2ILuVxdIzgDwzQklFKf9fiNclGGdzV6JqI-wcJWHRLMLWR-3fq-R8Juhoyu7xPCKtAMTU",
        }}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
        style={{ opacity: 0.6 }}
      />

      {/* Gradient overlay (fix) */}
      <LinearGradient
        colors={["#000080", "transparent"]}
        locations={[0, 0.6]}
        className="absolute inset-0"
      />

      {/* Text content */}
      <View className="absolute bottom-12 left-12 right-12">
        <Text
          className="text-white text-3xl font-semibold mb-4"
          style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
        >
          Precision Canvassing
        </Text>

        <Text
          className="text-outline-variant text-base leading-7"
          style={{ fontFamily: "Inter_400Regular" }}
        >
          Empowering field organizers with real-time data and high-visibility
          operational tools since 2012.
        </Text>
      </View>
    </View>
  );
}
