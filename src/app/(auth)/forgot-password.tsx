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
import { Link, useRouter } from "expo-router";
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

const authBackground = require("../../../assets/authBgImage.png");

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { forgotPassword } = useAuth();
  const { socialSubmitting, continueWithGoogle, continueWithApple } =
    useSocialAuth();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (error) {
      setError("");
    }
  };

  const handleResetPassword = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Email is required");
      Alert.alert("Validation Error", "Please enter your email");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setError("Email is invalid");
      Alert.alert("Validation Error", "Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      await forgotPassword(trimmedEmail);
      Alert.alert(
        "Password Reset Sent",
        "Check your email for reset instructions.",
        [
          {
            text: "Back to Login",
            onPress: () => router.replace("/(auth)/sign-in"),
          },
        ],
      );
    } catch (resetError) {
      Alert.alert("Reset Failed", getAuthErrorMessage(resetError));
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
              Reset password
            </Text>
            <Text
              className="text-sm text-gray-500 mt-1 text-center"
              style={{ fontFamily: "Inter_400Regular" }}
            >
              Enter your email and we will send reset instructions
            </Text>
          </View>

          <View className="px-5 pb-12">
            <View className="mb-6">
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
                  value={email}
                  onChangeText={handleEmailChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {error && (
                <Text
                  className="text-xs text-red-500 mt-1 ml-1"
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  {error}
                </Text>
              )}
            </View>

            <Pressable
              className="bg-vuior-alternate-500 rounded-xl py-4 items-center mb-5"
              onPress={handleResetPassword}
              disabled={isSubmitting || Boolean(socialSubmitting)}
              style={({ pressed }) => ({
                opacity:
                  isSubmitting || Boolean(socialSubmitting)
                    ? 0.7
                    : pressed
                      ? 0.88
                      : 1,
              })}
            >
              <Text
                className="text-base text-white"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Text>
            </Pressable>

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

            <Pressable
              className="flex-row items-center justify-center border border-gray-200 rounded-xl py-3.5 mb-3"
              style={({ pressed }) => ({
                backgroundColor: "rgba(255,255,255,0.9)",
                opacity: pressed ? 0.85 : 1,
              })}
              onPress={continueWithGoogle}
              disabled={Boolean(socialSubmitting) || isSubmitting}
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

            <Pressable
              className="flex-row items-center justify-center border border-gray-200 rounded-xl py-3.5 mb-8"
              style={({ pressed }) => ({
                backgroundColor: "rgba(255,255,255,0.9)",
                opacity: pressed ? 0.85 : 1,
              })}
              onPress={continueWithApple}
              disabled={Boolean(socialSubmitting) || isSubmitting}
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

            <View className="items-center">
              <Text
                className="text-sm text-gray-500"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                Remembered your password?{" "}
                <Link href="/(auth)/sign-in" asChild>
                  <Text
                    className="text-vuior-alternate-500"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    Log in
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
