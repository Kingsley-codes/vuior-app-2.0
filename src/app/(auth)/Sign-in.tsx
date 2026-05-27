import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

// Types
interface FormData {
  email: string;
  password: string;
}

const authBackground = require("../../../assets/authBgImage.png");

export default function SignInScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<FormData>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  const handleSignIn = () => {
    if (!form.email.trim()) {
      Alert.alert("Validation Error", "Please enter your email");
      return;
    }
    if (!form.password.trim()) {
      Alert.alert("Validation Error", "Please enter your password");
      return;
    }
    console.log("Sign in data:", form);
    Alert.alert("Success", "Logged in successfully!");
    // router.push("/home");
  };

  const handleSocialSignIn = (provider: "google" | "apple") => {
    console.log(`Sign in with ${provider}`);
    Alert.alert("Info", `${provider} sign in coming soon!`);
  };

  const handleForgotPassword = () => {
    console.log("Forgot password");
    Alert.alert("Info", "Password reset coming soon!");
  };

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={authBackground}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Section */}
          <View className="items-center pt-24 pb-8 px-5">
            <Image
              source={require("../../../assets/signInLogo.png")}
              style={{ width: 200, height: 75 }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 24,
                color: "#111827",
                marginTop: 32,
              }}
            >
              Welcome back
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: "#6b7280",
                marginTop: 4,
              }}
            >
              Log in to your Vuior account
            </Text>
          </View>

          {/* Form Container */}
          <View className="px-5 pb-12">
            {/* Email */}
            <View className="mb-4">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: "#374151",
                  marginBottom: 6,
                }}
              >
                Email address
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  borderRadius: 12,
                  paddingHorizontal: 14,
                  paddingVertical: 14,
                }}
              >
                <Ionicons name="mail-outline" size={18} color="#9ca3af" />
                <TextInput
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    fontSize: 14,
                    color: "#111827",
                    fontFamily: "Inter_400Regular",
                  }}
                  placeholder="Enter your email"
                  placeholderTextColor="#9ca3af"
                  value={form.email}
                  onChangeText={(v) => setForm({ ...form, email: v })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password */}
            <View className="mb-2">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: "#374151",
                  marginBottom: 6,
                }}
              >
                Password
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  borderRadius: 12,
                  paddingHorizontal: 14,
                  paddingVertical: 14,
                }}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#9ca3af"
                />
                <TextInput
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    fontSize: 14,
                    color: "#111827",
                    fontFamily: "Inter_400Regular",
                  }}
                  placeholder="Enter your password"
                  placeholderTextColor="#9ca3af"
                  value={form.password}
                  onChangeText={(v) => setForm({ ...form, password: v })}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={{ padding: 4 }}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={18}
                    color="#9ca3af"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <View style={{ alignItems: "flex-end", marginBottom: 24 }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleForgotPassword}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: "#16a34a",
                  }}
                >
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Log In Button */}
            <TouchableOpacity
              style={{
                backgroundColor: "#14b87a",
                borderRadius: 12,
                paddingVertical: 16,
                alignItems: "center",
                marginBottom: 20,
              }}
              activeOpacity={0.88}
              onPress={handleSignIn}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: "#ffffff",
                }}
              >
                Log In
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <View
                style={{ flex: 1, height: 1, backgroundColor: "#e5e7eb" }}
              />
              <Text
                style={{
                  marginHorizontal: 12,
                  fontSize: 14,
                  color: "#9ca3af",
                  fontFamily: "Inter_400Regular",
                }}
              >
                or
              </Text>
              <View
                style={{ flex: 1, height: 1, backgroundColor: "#e5e7eb" }}
              />
            </View>

            {/* Continue with Google */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#e5e7eb",
                borderRadius: 12,
                paddingVertical: 14,
                marginBottom: 12,
                backgroundColor: "rgba(255,255,255,0.9)",
              }}
              activeOpacity={0.85}
              onPress={() => handleSocialSignIn("google")}
            >
              {/* Google G icon via SVG workaround — using a colored text label */}
              <View style={{ marginRight: 10 }}>
                <Ionicons name="logo-google" size={20} color="#EA4335" />
              </View>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: "#111827",
                }}
              >
                Continue with Google
              </Text>
            </TouchableOpacity>

            {/* Continue with Apple */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#e5e7eb",
                borderRadius: 12,
                paddingVertical: 14,
                marginBottom: 32,
                backgroundColor: "rgba(255,255,255,0.9)",
              }}
              activeOpacity={0.85}
              onPress={() => handleSocialSignIn("apple")}
            >
              <Ionicons
                name="logo-apple"
                size={20}
                color="#111827"
                style={{ marginRight: 10 }}
              />
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: "#111827",
                }}
              >
                Continue with Apple
              </Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#6b7280",
                }}
              >
                Don't have an account?{" "}
                <Link href="/(auth)/Sign-up" asChild>
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      color: "#16a34a",
                    }}
                  >
                    Sign up
                  </Text>
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
