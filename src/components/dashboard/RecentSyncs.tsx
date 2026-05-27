// components/dashboard/RecentSyncs.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type SyncStatus = "supporter" | "not-interested" | "undecided";

interface SyncItem {
  id: string;
  address: string;
  status: SyncStatus;
  time: string;
}

const STATUS_CONFIG: Record<SyncStatus, { label: string; color: string }> = {
  supporter: { label: "Supporter", color: "#bb0011" },
  "not-interested": { label: "Not Interested", color: "#ba1a1a" },
  undecided: { label: "Undecided", color: "#c3c7cb" },
};

const MOCK_SYNCS: SyncItem[] = [
  {
    id: "1",
    address: "142 Oak Street",
    status: "supporter",
    time: "12 mins ago",
  },
  {
    id: "2",
    address: "89 Maple Avenue",
    status: "not-interested",
    time: "45 mins ago",
  },
  { id: "3", address: "12 Pine Terrace", status: "undecided", time: "1h ago" },
];

function SyncRow({ item }: { item: SyncItem }) {
  const config = STATUS_CONFIG[item.status];

  return (
    <TouchableOpacity
      className="bg-white border border-outline-variant rounded p-3 flex-row items-center gap-4"
      activeOpacity={0.75}
    >
      {/* Status strip */}
      <View
        className="w-1 rounded-full"
        style={{ height: 40, backgroundColor: config.color }}
      />
      <View className="flex-1">
        <Text
          className="text-primary text-sm font-bold"
          style={{ fontFamily: "JetBrainsMono_500Medium" }}
        >
          {item.address}
        </Text>
        <Text
          className="text-on-surface-variant text-[11px] mt-0.5"
          style={{ fontFamily: "JetBrainsMono_500Medium" }}
        >
          {config.label} • {item.time}
        </Text>
      </View>
      <MaterialIcons name="chevron-right" size={20} color="#c6c5d5" />
    </TouchableOpacity>
  );
}

export default function RecentSyncs() {
  return (
    <View className="gap-3">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <Text
          className="text-primary text-xl font-semibold"
          style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
        >
          Recent Syncs
        </Text>
        <TouchableOpacity>
          <Text
            className="text-secondary text-xs font-bold tracking-wider uppercase"
            style={{ fontFamily: "JetBrainsMono_500Medium" }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Rows */}
      <View className="gap-2">
        {MOCK_SYNCS.map((item) => (
          <SyncRow key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}
