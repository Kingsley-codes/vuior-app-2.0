import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter, type Href } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import GoogleIcon from "@/components/GoogleIcon";
import { useAuth } from "@/hooks/useAuth";
import { useSocialAuth } from "@/hooks/useSocialAuth";
import { getAuthErrorMessage } from "@/utils/authErrors";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const { socialSubmitting, continueWithGoogle, continueWithApple } =
    useSocialAuth();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  const handleSignIn = async () => {
    if (!form.email.trim()) {
      Alert.alert("Validation Error", "Please enter your email");
      return;
    }
    if (!form.password.trim()) {
      Alert.alert("Validation Error", "Please enter your password");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(form.email.trim(), form.password);
      router.replace("/(dashboard)");
    } catch (error) {
      Alert.alert("Sign In Failed", getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1">
      <Image
        source={authBackground}
        className="absolute inset-0 w-full h-full"
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
              className="text-2xl text-gray-900 mt-0.5"
              style={{ fontFamily: "Inter_700Bold" }}
            >
              Welcome back
            </Text>
            <Text
              className="text-sm text-gray-500 mt-1"
              style={{ fontFamily: "Inter_400Regular" }}
            >
              Log in to your Vuior account
            </Text>
          </View>

          {/* Form Container */}
          <View className="px-5 pb-12">
            {/* Email */}
            <View className="mb-4">
              <Text
                className="text-sm text-gray-700 mb-1.5"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Email address
              </Text>
              <View
                className="flex-row items-center border border-gray-200 rounded-xl px-3.5 py-1.5"
                style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
              >
                <Ionicons name="mail-outline" size={18} color="#9ca3af" />
                <TextInput
                  className="flex-1 ml-2.5 text-sm text-gray-900"
                  style={{ fontFamily: "Inter_400Regular" }}
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
                className="text-sm text-gray-700 mb-1.5"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Password
              </Text>
              <View
                className="flex-row items-center border border-gray-200 rounded-xl px-3.5 py-1.5"
                style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#9ca3af"
                />
                <TextInput
                  className="flex-1 ml-2.5 text-sm text-gray-900"
                  style={{ fontFamily: "Inter_400Regular" }}
                  placeholder="Enter your password"
                  placeholderTextColor="#9ca3af"
                  value={form.password}
                  onChangeText={(v) => setForm({ ...form, password: v })}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  className="p-1"
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={18}
                    color="#9ca3af"
                  />
                </Pressable>
              </View>
            </View>

            {/* Forgot Password */}
            <View className="items-end mb-6">
              <Link href={"/(auth)/forgot-password" as Href} asChild>
                <Text
                  className="text-sm text-vuior-alternate-500"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  Forgot password?
                </Text>
              </Link>
            </View>

            {/* Log In Button */}
            <Pressable
              className="bg-vuior-alternate-500 rounded-xl py-4 items-center mb-5"
              onPress={handleSignIn}
              disabled={isSubmitting}
              style={({ pressed }) => ({
                opacity: isSubmitting ? 0.7 : pressed ? 0.88 : 1,
              })}
            >
              <Text
                className="text-base text-white"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </Text>
            </Pressable>

            {/* Divider */}
            <View className="flex-row items-center mb-4">
              <View className="flex-1 h-px bg-gray-200" />
              <Text
                className="mx-3 text-sm text-gray-400"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                or
              </Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            {/* Continue with Google */}
            <Pressable
              className="flex-row items-center justify-center border border-gray-200 rounded-xl py-3.5 mb-3"
              style={({ pressed }) => ({
                backgroundColor: "rgba(255,255,255,0.9)",
                opacity: pressed ? 0.85 : 1,
              })}
              onPress={continueWithGoogle}
              disabled={Boolean(socialSubmitting)}
            >
              {({ pressed }) => (
                <>
                  <View className="mr-2.5">
                    <GoogleIcon size={20} />
                  </View>
                  <Text
                    className="text-sm text-gray-900"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    {socialSubmitting === "google"
                      ? "Connecting..."
                      : "Continue with Google"}
                  </Text>
                </>
              )}
            </Pressable>

            {/* Continue with Apple */}
            <Pressable
              className="flex-row items-center justify-center border border-gray-200 rounded-xl py-3.5 mb-8"
              style={({ pressed }) => ({
                backgroundColor: "rgba(255,255,255,0.9)",
                opacity: pressed ? 0.85 : 1,
              })}
              onPress={continueWithApple}
              disabled={Boolean(socialSubmitting)}
            >
              {({ pressed }) => (
                <>
                  <Ionicons
                    name="logo-apple"
                    size={20}
                    color="#111827"
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    className="text-sm text-gray-900"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    {socialSubmitting === "apple"
                      ? "Connecting..."
                      : "Continue with Apple"}
                  </Text>
                </>
              )}
            </Pressable>

            {/* Sign Up Link */}
            <View className="items-center">
              <Text
                className="text-sm text-gray-500"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                {"Don't have an account? "}
                <Link href="/(auth)/sign-up" asChild>
                  <Text
                    className="text-vuior-alternate-500"
                    style={{ fontFamily: "Inter_600SemiBold" }}
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
