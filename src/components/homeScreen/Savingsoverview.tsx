import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
  Line,
} from "react-native-svg";

// Sample data matching the screenshot
const DATA_POINTS = [
  8, 12, 10, 18, 22, 25, 28, 32, 35, 38, 42, 45, 50, 55, 60, 62, 65, 70, 75, 80,
  85, 90, 100, 110, 120, 128.4,
];
const MONTHS = ["May 1", "May 8", "May 15", "May 22", "May 29"];

function buildLinePath(data: number[], w: number, h: number, pad: number) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = pad + (1 - (v - min) / range) * (h - pad * 2);
    return { x, y };
  });

  const d = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = points[i - 1];
      const cpx = (prev.x + p.x) / 2;
      return `C ${cpx} ${prev.y} ${cpx} ${p.y} ${p.x} ${p.y}`;
    })
    .join(" ");

  // Close path for fill
  const fill =
    d +
    ` L ${points[points.length - 1].x} ${h - pad} L ${points[0].x} ${h - pad} Z`;

  return { d, fill, points };
}

const FILTERS = ["This Week", "This Month", "3 Months", "1 Year"];

export default function SavingsOverview() {
  const [activeFilter, setActiveFilter] = useState("This Month");
  const W = 320;
  const H = 130;
  const PAD = 8;
  const { d, fill, points } = buildLinePath(DATA_POINTS, W, H, PAD);
  const lastPoint = points[points.length - 1];

  return (
    <View className="mx-5 mt-5 bg-white rounded-2xl p-5">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-vuior-green-900 text-base font-inter-bold">
          Savings Overview
        </Text>

        {/* Filter dropdown (static for now) */}
        <TouchableOpacity
          className="flex-row items-center gap-x-1 border border-gray-200 rounded-lg px-3 py-1.5"
          activeOpacity={0.7}
        >
          <Text className="text-gray-700 text-xs font-inter-medium">
            This Month
          </Text>
          <Ionicons name="chevron-down" size={12} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Amount + Trend */}
      <Text className="text-vuior-green-900 text-xs text-gray-500 mb-1">
        Total Savings
      </Text>
      <Text className="text-vuior-green-900 text-3xl font-inter-bold mb-1">
        $128.40
      </Text>
      <View className="flex-row items-center gap-x-1 mb-4">
        <Ionicons name="trending-up" size={14} color="#00b874" />
        <Text className="text-vuior-primary text-xs font-inter-semibold">
          24% vs last month
        </Text>
      </View>

      {/* Chart */}
      <View className="relative">
        <Svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
          <Defs>
            <LinearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#00b874" stopOpacity="0.25" />
              <Stop offset="100%" stopColor="#00b874" stopOpacity="0.02" />
            </LinearGradient>
          </Defs>

          {/* Fill area */}
          <Path d={fill} fill="url(#chartGrad)" />

          {/* Line */}
          <Path d={d} stroke="#00b874" strokeWidth={2} fill="none" />

          {/* Data dots (every 5th point) */}
          {points
            .filter((_, i) => i % 5 === 0 || i === points.length - 1)
            .map((p, i) => (
              <Circle key={i} cx={p.x} cy={p.y} r={3} fill="#00b874" />
            ))}

          {/* Last point highlight */}
          <Circle
            cx={lastPoint.x}
            cy={lastPoint.y}
            r={5}
            fill="#00b874"
            stroke="white"
            strokeWidth={2}
          />
        </Svg>

        {/* Tooltip for last point */}
        <View
          className="absolute bg-vuior-primary rounded-lg px-2.5 py-1"
          style={{ right: 0, top: lastPoint.y - H + 14 }}
        >
          <Text className="text-white text-xs font-inter-bold">$128.40</Text>
        </View>
      </View>

      {/* X-axis labels */}
      <View className="flex-row justify-between mt-2 px-1">
        {MONTHS.map((m) => (
          <Text key={m} className="text-gray-400 text-xs">
            {m}
          </Text>
        ))}
      </View>
    </View>
  );
}
