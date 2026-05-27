// components/auth/IconInput.tsx
import { useState, ReactNode } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface IconInputProps extends TextInputProps {
  leadingIcon: keyof typeof MaterialIcons.glyphMap;
  trailingNode?: ReactNode;
}

export default function IconInput({
  leadingIcon,
  trailingNode,
  ...props
}: IconInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View
      className="flex-row items-center h-12 bg-white rounded-lg border"
      style={{
        borderColor: focused ? "#000080" : "#c6c5d5",
        shadowColor: focused ? "#000080" : "transparent",
        shadowOpacity: focused ? 0.2 : 0,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 0 },
        elevation: focused ? 2 : 0,
      }}
    >
      {/* Leading icon */}
      <View className="pl-4 pr-2">
        <MaterialIcons
          name={leadingIcon}
          size={20}
          color={focused ? "#000080" : "#767684"}
        />
      </View>

      {/* Input */}
      <TextInput
        className="flex-1 text-base text-on-surface"
        style={{ fontFamily: "Inter_400Regular" }}
        placeholderTextColor="#c6c5d5"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />

      {/* Optional trailing node */}
      {trailingNode && <View className="pr-3">{trailingNode}</View>}
    </View>
  );
}
