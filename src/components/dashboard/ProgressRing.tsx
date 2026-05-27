// components/dashboard/ProgressRing.tsx
import { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";

const RADIUS = 40;
const STROKE_WIDTH = 10;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SIZE = 96; // w-24 h-24

interface ProgressRingProps {
  percent: number; // 0–100
  label: string; // e.g. "28/40"
}

// Wrap Circle so we can animate strokeDashoffset
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function ProgressRing({ percent, label }: ProgressRingProps) {
  const animatedOffset = useRef(new Animated.Value(CIRCUMFERENCE)).current;

  useEffect(() => {
    const targetOffset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
    Animated.timing(animatedOffset, {
      toValue: targetOffset,
      duration: 900,
      delay: 300,
      useNativeDriver: false, // SVG props can't use native driver
    }).start();
  }, [percent]);

  return (
    <View
      style={{ width: SIZE, height: SIZE }}
      className="items-center justify-center"
    >
      <Svg width={SIZE} height={SIZE} viewBox="0 0 100 100">
        {/* Track */}
        <Circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="transparent"
          stroke="#e8e5ff"
          strokeWidth={STROKE_WIDTH}
        />
        {/* Progress */}
        <AnimatedCircle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="transparent"
          stroke="#bb0011"
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
          strokeDashoffset={animatedOffset}
          strokeLinecap="round"
          rotation="-90"
          origin="50, 50"
        />
      </Svg>
      {/* Centre label */}
      <View className="absolute items-center justify-center">
        <Text
          className="text-primary text-xs font-bold"
          style={{ fontFamily: "JetBrainsMono_500Medium" }}
        >
          {label}
        </Text>
      </View>
    </View>
  );
}
