// components/dashboard/StatGrid.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface StatCardProps {
  iconName: keyof typeof MaterialIcons.glyphMap;
  iconBg: string;
  iconColor: string;
  trailingIcon: keyof typeof MaterialIcons.glyphMap;
  value: string;
  label: string;
  fullWidth?: boolean;
  progressPercent?: number; // optional mini progress bar (0–100)
}

function StatCard({
  iconName,
  iconBg,
  iconColor,
  trailingIcon,
  value,
  label,
  fullWidth = false,
  progressPercent,
}: StatCardProps) {
  return (
    <TouchableOpacity
      className={`bg-white border border-outline-variant rounded-xl p-4 shadow-sm ${
        fullWidth ? "flex-row items-center gap-4" : "flex-col justify-between"
      }`}
      style={{ minHeight: fullWidth ? undefined : 120 }}
      activeOpacity={0.85}
    >
      {fullWidth ? (
        // Wide card layout (time active)
        <>
          <View
            className="w-12 h-12 rounded-full items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#efecff" }}
          >
            <MaterialIcons name={iconName} size={22} color="#00003c" />
          </View>
          <View className="flex-1">
            <Text
              className="text-on-surface-variant text-[11px] font-bold tracking-wider uppercase mb-1"
              style={{ fontFamily: "JetBrainsMono_500Medium" }}
            >
              {label}
            </Text>
            <Text
              className="text-primary text-xl font-semibold"
              style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
            >
              {value}
            </Text>
          </View>
          {/* Mini progress bar */}
          {progressPercent !== undefined && (
            <View className="w-24 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
              <View
                className="h-full bg-secondary rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </View>
          )}
        </>
      ) : (
        // Square card layout
        <>
          <View className="flex-row justify-between items-start">
            <View
              className="w-10 h-10 rounded items-center justify-center"
              style={{ backgroundColor: iconBg }}
            >
              <MaterialIcons name={iconName} size={20} color={iconColor} />
            </View>
            <MaterialIcons name={trailingIcon} size={20} color="#c6c5d5" />
          </View>
          <View>
            <Text
              className="text-primary text-xl font-semibold mb-0.5"
              style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
            >
              {value}
            </Text>
            <Text
              className="text-on-surface-variant text-[11px] font-bold tracking-wider"
              style={{ fontFamily: "JetBrainsMono_500Medium" }}
            >
              {label}
            </Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}

export default function StatGrid() {
  return (
    <View className="gap-4">
      {/* Top row – two square cards */}
      <View className="flex-row gap-4">
        <View className="flex-1">
          <StatCard
            iconName="person-search"
            iconBg="#000080"
            iconColor="#ffffff"
            trailingIcon="trending-up"
            value="28"
            label="Total Contacts Today"
          />
        </View>
        <View className="flex-1">
          <StatCard
            iconName="thumb-up"
            iconBg="#e22525"
            iconColor="#ffffff"
            trailingIcon="check-circle"
            value="15"
            label="Supporters Identified"
          />
        </View>
      </View>

      {/* Bottom row – full-width wide card */}
      <StatCard
        iconName="schedule"
        iconBg="#efecff"
        iconColor="#00003c"
        trailingIcon="chevron-right"
        value="3h 20m"
        label="Time Active Today"
        fullWidth
        progressPercent={75}
      />
    </View>
  );
}
