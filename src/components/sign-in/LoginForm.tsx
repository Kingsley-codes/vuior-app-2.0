// components/auth/LoginForm.tsx
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Link, router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import IconInput from "./IconInput";

type SubmitState = "idle" | "loading" | "success";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter your email and password.");
      return;
    }
    setSubmitState("loading");
    setTimeout(() => {
      setSubmitState("success");
      setTimeout(() => setSubmitState("idle"), 2000);
    }, 1500);
  };

  const isLoading = submitState === "loading";
  const isSuccess = submitState === "success";

  return (
    <View className="bg-white border border-outline-variant rounded-lg shadow-sm p-6">
      {/* Email */}
      <View className="mb-5">
        <Text
          className="text-on-surface text-xs font-bold tracking-widest uppercase mb-2"
          style={{ fontFamily: "JetBrainsMono_500Medium" }}
        >
          Email Address
        </Text>
        <IconInput
          leadingIcon="mail"
          placeholder="name@ocofamerica.org"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password */}
      <View className="mb-5">
        <View className="flex-row justify-between items-center mb-2">
          <Text
            className="text-on-surface text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: "JetBrainsMono_500Medium" }}
          >
            Password
          </Text>
          <TouchableOpacity>
            <Text
              className="text-secondary text-xs font-bold"
              style={{ fontFamily: "JetBrainsMono_500Medium" }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <IconInput
          leadingIcon="lock"
          placeholder="••••••••"
          secureTextEntry={!showPassword}
          autoComplete="password"
          value={password}
          onChangeText={setPassword}
          trailingNode={
            <TouchableOpacity
              onPress={() => setShowPassword((v) => !v)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <MaterialIcons
                name={showPassword ? "visibility-off" : "visibility"}
                size={20}
                color="#767684"
              />
            </TouchableOpacity>
          }
        />
      </View>

      {/* Remember me */}
      <TouchableOpacity
        className="flex-row items-center gap-3 mb-6"
        onPress={() => setRememberMe((v) => !v)}
        activeOpacity={0.8}
      >
        <View
          className="w-6 h-6 rounded border-2 items-center justify-center"
          style={{
            borderColor: rememberMe ? "#000080" : "#c6c5d5",
            backgroundColor: rememberMe ? "#000080" : "#ffffff",
          }}
        >
          {rememberMe && (
            <MaterialIcons name="check" size={14} color="#ffffff" />
          )}
        </View>
        <Text
          className="text-on-surface-variant text-sm"
          style={{ fontFamily: "JetBrainsMono_500Medium" }}
        >
          Remember Me
        </Text>
      </TouchableOpacity>

      {/* Login button */}
      <TouchableOpacity
        className={`h-12 rounded-lg items-center justify-center shadow-sm ${
          isSuccess ? "bg-secondary" : "bg-primary-container"
        }`}
        onPress={handleLogin}
        disabled={isLoading}
        activeOpacity={0.88}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text
            className="text-on-primary text-sm font-bold tracking-widest uppercase"
            style={{ fontFamily: "JetBrainsMono_500Medium" }}
          >
            {isSuccess ? "Signed In ✓" : "Login"}
          </Text>
        )}
      </TouchableOpacity>

      {/* Divider + Create Account */}
      <View className="mt-8 pt-6 border-t border-outline-variant items-center">
        <Text
          className="text-on-surface-variant text-sm mb-4"
          style={{ fontFamily: "JetBrainsMono_500Medium" }}
        >
          New to Ocofamerica?
        </Text>
        <Link href="/(auth)/sign-up" asChild>
          <TouchableOpacity
            className="w-full h-12 border-2 border-secondary rounded-lg items-center justify-center"
            activeOpacity={0.8}
          >
            <Text
              className="text-secondary text-sm font-bold tracking-widest uppercase"
              style={{ fontFamily: "JetBrainsMono_500Medium" }}
            >
              Create an Account
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
