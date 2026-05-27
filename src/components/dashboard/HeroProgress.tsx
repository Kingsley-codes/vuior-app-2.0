// components/dashboard/HeroProgress.tsx
import { View, Text } from "react-native";
import ProgressRing from "./ProgressRing";

interface HeroProgressProps {
  percent: number;
  completed: number;
  total: number;
  remaining: number;
}

export default function HeroProgress({
  percent,
  completed,
  total,
  remaining,
}: HeroProgressProps) {
  return (
    <View className="bg-white border border-outline-variant rounded-xl p-4 flex-row items-center justify-between shadow-sm overflow-hidden">
      <View className="gap-2 flex-1 pr-4">
        <Text
          className="text-on-surface-variant text-xs font-bold tracking-widest uppercase"
          style={{ fontFamily: "JetBrainsMono_500Medium" }}
        >
          Daily Goal Progress
        </Text>
        <Text
          className="text-primary font-bold"
          style={{
            fontFamily: "HankenGrotesk_700Bold",
            fontSize: 32,
            lineHeight: 40,
            letterSpacing: -0.5,
          }}
        >
          {percent}% Complete
        </Text>
        <Text
          className="text-on-surface-variant text-base"
          style={{ fontFamily: "Inter_400Regular" }}
        >
          {remaining} houses remaining
        </Text>
      </View>

      <ProgressRing percent={percent} label={`${completed}/${total}`} />
    </View>
  );
}
