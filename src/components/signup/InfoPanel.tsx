// components/auth/InfoPanel.tsx
import { View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function InfoPanel() {
  return (
    <View className="gap-4 mb-4">
      {/* Headline card */}
      <View className="bg-white border border-outline-variant rounded-lg shadow-sm overflow-hidden">
        {/* Red accent strip */}
        <View className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
        <View className="p-6 pl-7">
          <Text
            className="text-primary text-2xl font-semibold mb-2"
            style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
          >
            Join Ocofamerica
          </Text>
          <Text
            className="text-on-surface-variant text-base leading-6"
            style={{ fontFamily: "Inter_400Regular" }}
          >
            Deploy reliable field operations with high-efficiency data tracking
            and voter engagement tools.
          </Text>
        </View>
      </View>

      {/* Hero image card */}
      <View className="relative h-44 rounded-lg overflow-hidden border border-outline-variant">
        <Image
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCa5k1bbDXb2YORh6IiyHYAHH2rZyViALr2nKNR7bXzAhZ0wIgKTSnn9jXfr41FLLt8BfHHIh11_V9aFfBz7uqxyvFb-K8cc05yR7z0PfKIeR-vT57agpEOd0WpEhzRytTc835xqF49KZn7yPJLy54up0YEIjv4bG46mTLCWOmY_8kUWAM4qlsxKfF55DShMswzIdodrlf5nRibcmGkc8ulxCduvQl0iOijmYQLyytjjaACfS02VLuUofuTcqHY9PaStDg8AOImS7U",
          }}
          className="w-full h-full"
          resizeMode="cover"
          style={{ opacity: 0.8 }}
        />
        {/* Overlay */}
        <View className="absolute inset-0 bg-primary/20 justify-end p-4">
          <View className="bg-secondary self-start px-3 py-1 rounded">
            <Text
              className="text-on-secondary text-xs font-bold tracking-wider"
              style={{ fontFamily: "JetBrainsMono_500Medium" }}
            >
              OPERATIONAL READY
            </Text>
          </View>
        </View>
      </View>

      {/* Security badge */}
      <View className="bg-white border border-outline-variant rounded-lg p-4 flex-row items-center gap-3">
        <MaterialIcons name="security" size={22} color="#bb0011" />
        <Text
          className="text-primary text-xs font-bold tracking-wider uppercase"
          style={{ fontFamily: "JetBrainsMono_500Medium" }}
        >
          Encrypted Data Protocol
        </Text>
      </View>
    </View>
  );
}
