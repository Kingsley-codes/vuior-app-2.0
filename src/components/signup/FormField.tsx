// components/auth/FormField.tsx
import { View, Text, TextInput, TextInputProps } from "react-native";
import { useState } from "react";

interface FormFieldProps extends TextInputProps {
  label: string;
  hint?: string;
}

export default function FormField({ label, hint, ...props }: FormFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View className="gap-1 flex-1">
      <Text
        className="text-on-surface text-sm"
        style={{ fontFamily: "JetBrainsMono_500Medium" }}
      >
        {label}
      </Text>
      <TextInput
        className="h-12 bg-white border rounded-lg px-4 text-base text-on-surface"
        style={{
          fontFamily: "Inter_400Regular",
          borderColor: focused ? "#000080" : "#c6c5d5",
          // RN doesn't support box-shadow on Android so we use elevation
          elevation: focused ? 2 : 0,
          shadowColor: focused ? "#000080" : "transparent",
          shadowOpacity: focused ? 0.25 : 0,
          shadowRadius: 2,
          shadowOffset: { width: 0, height: 0 },
        }}
        placeholderTextColor="#767684"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      {hint && (
        <Text
          className="text-secondary text-[10px] font-bold tracking-widest uppercase"
          style={{ fontFamily: "JetBrainsMono_500Medium" }}
        >
          {hint}
        </Text>
      )}
    </View>
  );
}
