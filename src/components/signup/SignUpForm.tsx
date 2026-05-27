// components/auth/SignUpForm.tsx
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import FormField from "./FormField";

type SubmitState = "idle" | "loading" | "success";

export default function SignUpForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    campaignTitle: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const handleChange = (field: keyof typeof form) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const { firstName, lastName, email, password, confirmPassword } = form;

    if (!firstName || !lastName || !email || !password) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    setSubmitState("loading");
    // Simulate API call
    setTimeout(() => {
      setSubmitState("success");
      setTimeout(() => setSubmitState("idle"), 2000);
    }, 1500);
  };

  const buttonLabel =
    submitState === "loading"
      ? null
      : submitState === "success"
        ? "ACCOUNT CREATED"
        : "SIGN UP";

  const buttonBg = submitState === "success" ? "bg-secondary" : "bg-primary";

  return (
    <View className="bg-white border border-outline-variant rounded-lg shadow-sm p-6 gap-4">
      {/* Name row */}
      <View className="flex-row gap-4">
        <FormField
          label="First Name"
          placeholder="Jane"
          autoCapitalize="words"
          value={form.firstName}
          onChangeText={handleChange("firstName")}
        />
        <FormField
          label="Last Name"
          placeholder="Doe"
          autoCapitalize="words"
          value={form.lastName}
          onChangeText={handleChange("lastName")}
        />
      </View>

      {/* Campaign title */}
      <FormField
        label="Campaign Title"
        placeholder="Regional Coordinator"
        hint="Organizational Identity Required"
        autoCapitalize="words"
        value={form.campaignTitle}
        onChangeText={handleChange("campaignTitle")}
      />

      {/* Email */}
      <FormField
        label="Email Address"
        placeholder="jane.doe@ocofamerica.org"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={form.email}
        onChangeText={handleChange("email")}
      />

      {/* Password row */}
      <View className="flex-row gap-4">
        <FormField
          label="Password"
          placeholder="••••••••"
          secureTextEntry
          autoComplete="new-password"
          value={form.password}
          onChangeText={handleChange("password")}
        />
        <FormField
          label="Confirm Password"
          placeholder="••••••••"
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={handleChange("confirmPassword")}
        />
      </View>

      {/* Divider */}
      <View className="border-t border-outline-variant pt-4">
        <TouchableOpacity
          className={`${buttonBg} h-12 rounded-lg items-center justify-center`}
          onPress={handleSubmit}
          disabled={submitState !== "idle"}
          activeOpacity={0.85}
        >
          {submitState === "loading" ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text
              className="text-on-primary text-sm font-bold tracking-widest"
              style={{ fontFamily: "JetBrainsMono_500Medium" }}
            >
              {buttonLabel}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Login link */}
      <View className="flex-row justify-center items-center gap-1">
        <Text
          className="text-on-surface-variant text-base"
          style={{ fontFamily: "Inter_400Regular" }}
        >
          Already have an account?
        </Text>
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity>
            <Text
              className="text-secondary text-sm font-bold"
              style={{ fontFamily: "JetBrainsMono_500Medium" }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* ToS notice */}
      <View className="bg-surface-container-low border border-outline-variant rounded-lg p-4 flex-row gap-3 items-start">
        <MaterialIcons name="info" size={16} color="#767684" />
        <Text
          className="text-on-surface-variant text-[11px] leading-4 flex-1"
          style={{ fontFamily: "JetBrainsMono_500Medium" }}
        >
          By signing up, you agree to the Campaign Operations Terms of Service
          and Data Management Protocols. Verification of campaign affiliation
          may be required.
        </Text>
      </View>
    </View>
  );
}
