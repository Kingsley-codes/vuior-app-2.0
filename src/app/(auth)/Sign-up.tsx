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
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CountryPicker, { Country } from "react-native-country-picker-modal";
import { Link } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import GoogleIcon from "@/components/GoogleIcon";

// Types
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const authBackground = require("../../../assets/authBgImage.png");

// Validation
const validateForm = (form: FormData) => {
  const errors: Partial<Record<keyof FormData, string>> = {};

  if (!form.fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (form.fullName.trim().length < 2) {
    errors.fullName = "Name must be at least 2 characters";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = "Email is invalid";
  }

  if (!form.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10,15}$/.test(form.phone.replace(/\D/g, ""))) {
    errors.phone = "Phone number must be 10-15 digits";
  }

  if (!form.password) {
    errors.password = "Password is required";
  } else if (form.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (!/(?=.*\d)(?=.*[!@#$%^&*])/.test(form.password)) {
    errors.password = "Password must contain a number and symbol";
  }

  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export default function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    callingCode: ["1"],
    cca2: "US",
    currency: ["USD"],
    flag: "flag-us",
    name: "United States",
    region: "Americas",
    subregion: "North America",
  });
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  const handleInputChange = (field: keyof FormData, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleSignUp = () => {
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Alert.alert(
        "Validation Error",
        "Please fix the errors before continuing",
      );
      return;
    }
    if (!agreed) {
      Alert.alert(
        "Agreement Required",
        "Please agree to the Terms of Service and Privacy Policy",
      );
      return;
    }
    console.log("Sign up data:", {
      ...form,
      countryCode: selectedCountry.cca2,
      callingCode: selectedCountry.callingCode?.[0],
    });
    Alert.alert("Success", "Account created successfully!");
  };

  const handleSocialSignUp = (provider: "google" | "apple") => {
    Alert.alert("Info", `${provider} sign up coming soon!`);
  };

  const onSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setShowCountryPicker(false);
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
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Section */}
          <View className="items-center pt-18 pb-6">
            <Image
              source={require("../../../assets/signInLogo.png")}
              style={{ width: 200, height: 75 }}
              resizeMode="contain"
            />
            <Text
              className="text-2xl text-gray-900 mt-5"
              style={{ fontFamily: "Inter_700Bold" }}
            >
              Create your account
            </Text>
            <Text
              className="text-sm text-gray-500 mt-1"
              style={{ fontFamily: "Inter_400Regular" }}
            >
              Join Vuior and start saving by paying bills early
            </Text>
          </View>

          {/* Form */}
          <View className="px-5 mt-2">
            {/* Full Name */}
            <View className="mb-4">
              <Text
                className="text-sm text-gray-700 mb-1.5"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Full name
              </Text>
              <View
                className="flex-row items-center border border-gray-200 rounded-xl px-3.5 py-1.5"
                style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
              >
                <Ionicons name="person-outline" size={18} color="#9ca3af" />
                <TextInput
                  className="flex-1 ml-2.5 text-sm text-gray-900"
                  style={{ fontFamily: "Inter_400Regular" }}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9ca3af"
                  value={form.fullName}
                  onChangeText={(v) => handleInputChange("fullName", v)}
                  autoCapitalize="words"
                />
              </View>
              {errors.fullName && (
                <Text
                  className="text-xs text-red-500 mt-1 ml-1"
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  {errors.fullName}
                </Text>
              )}
            </View>

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
                  onChangeText={(v) => handleInputChange("email", v)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email && (
                <Text
                  className="text-xs text-red-500 mt-1 ml-1"
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  {errors.email}
                </Text>
              )}
            </View>

            {/* Phone Number */}
            <View className="mb-4">
              <Text
                className="text-sm text-gray-700 mb-1.5"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Phone number
              </Text>
              <View
                className="flex-row items-center border border-gray-200 rounded-xl px-3.5 py-1.5"
                style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
              >
                <Ionicons name="call-outline" size={18} color="#9ca3af" />
                <TouchableOpacity
                  onPress={() => setShowCountryPicker(true)}
                  className="flex-row items-center ml-2 mr-1"
                  activeOpacity={0.7}
                >
                  <CountryPicker
                    countryCode={selectedCountry.cca2}
                    withFlag
                    withEmoji
                    withCallingCode
                    withFilter={false}
                    onSelect={onSelectCountry}
                    visible={false}
                    onClose={() => {}}
                    containerButtonStyle={{ padding: 0 }}
                  />
                  <Ionicons
                    name="chevron-down"
                    size={14}
                    color="#6b7280"
                    style={{ marginLeft: 2 }}
                  />
                  <Text
                    className="text-sm text-gray-700 ml-1"
                    style={{ fontFamily: "Inter_400Regular" }}
                  >
                    +{selectedCountry.callingCode?.[0]}
                  </Text>
                </TouchableOpacity>
                <View className="w-px h-5 bg-gray-200 mr-2" />
                <TextInput
                  className="flex-1 text-sm text-gray-900"
                  style={{ fontFamily: "Inter_400Regular" }}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#9ca3af"
                  value={form.phone}
                  onChangeText={(v) => handleInputChange("phone", v)}
                  keyboardType="phone-pad"
                />
              </View>
              {errors.phone && (
                <Text
                  className="text-xs text-red-500 mt-1 ml-1"
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  {errors.phone}
                </Text>
              )}
            </View>

            {/* Country Picker Modal */}
            <Modal
              visible={showCountryPicker}
              animationType="slide"
              transparent={false}
              onRequestClose={() => setShowCountryPicker(false)}
            >
              <View className="flex-1">
                <CountryPicker
                  countryCode={selectedCountry.cca2}
                  withFlag
                  withEmoji
                  withCallingCode
                  withFilter
                  withModal={false}
                  visible={true}
                  onSelect={onSelectCountry}
                  onClose={() => setShowCountryPicker(false)}
                  preferredCountries={["US", "GB", "CA", "AU", "IN"]}
                  filterProps={{
                    placeholder: "Search country...",
                    autoFocus: true,
                  }}
                  containerButtonStyle={{ backgroundColor: "transparent" }}
                />
              </View>
            </Modal>

            {/* Password */}
            <View className="mb-1">
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
                  placeholder="Create a password"
                  placeholderTextColor="#9ca3af"
                  value={form.password}
                  onChangeText={(v) => handleInputChange("password", v)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="p-1"
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={18}
                    color="#9ca3af"
                  />
                </TouchableOpacity>
              </View>
              <Text
                className="text-xs text-gray-400 mt-1.5 ml-1"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                At least 8 characters with a number and symbol
              </Text>
              {errors.password && (
                <Text
                  className="text-xs text-red-500 mt-1 ml-1"
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  {errors.password}
                </Text>
              )}
            </View>

            {/* Confirm Password */}
            <View className="mb-5 mt-3">
              <Text
                className="text-sm text-gray-700 mb-1.5"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Confirm password
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
                  placeholder="Confirm your password"
                  placeholderTextColor="#9ca3af"
                  value={form.confirmPassword}
                  onChangeText={(v) => handleInputChange("confirmPassword", v)}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="p-1"
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-outline" : "eye-off-outline"
                    }
                    size={18}
                    color="#9ca3af"
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <Text
                  className="text-xs text-red-500 mt-1 ml-1"
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  {errors.confirmPassword}
                </Text>
              )}
            </View>

            {/* Terms Checkbox */}
            <View className="flex-row items-center mb-6">
              <TouchableOpacity
                onPress={() => setAgreed(!agreed)}
                className="w-5 h-5 rounded mr-2.5 items-center justify-center"
                style={{
                  borderWidth: 1.5,
                  borderColor: agreed ? "#15803d" : "#d1d5db",
                  backgroundColor: agreed ? "#15803d" : "#ffffff",
                }}
                activeOpacity={0.8}
              >
                {agreed && (
                  <Ionicons name="checkmark" size={13} color="#ffffff" />
                )}
              </TouchableOpacity>
              <Text
                className="text-sm text-gray-600 flex-1 flex-wrap"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                I agree to the{" "}
                <Text
                  className="text-vuior-alternate-500"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  Terms of Service
                </Text>{" "}
                and{" "}
                <Text
                  className="text-vuior-alternate-500"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  Privacy Policy
                </Text>
              </Text>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              className="bg-vuior-alternate-500 rounded-xl py-4 items-center mb-5"
              activeOpacity={0.88}
              onPress={handleSignUp}
            >
              <Text
                className="text-base text-white"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>

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
            <TouchableOpacity
              className="flex-row items-center justify-center border border-gray-200 rounded-xl py-3.5 mb-3"
              style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
              activeOpacity={0.85}
              onPress={() => handleSocialSignUp("google")}
            >
              <GoogleIcon size={20} />
              <Text
                className="text-sm text-gray-900 ml-2"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Continue with Google
              </Text>
            </TouchableOpacity>

            {/* Continue with Apple */}
            <TouchableOpacity
              className="flex-row items-center justify-center border border-gray-200 rounded-xl py-3.5 mb-6"
              style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
              activeOpacity={0.85}
              onPress={() => handleSocialSignUp("apple")}
            >
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
                Continue with Apple
              </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View className="items-center mb-8">
              <Text
                className="text-sm text-gray-500"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                Already have an account?{" "}
                <Link href="/(auth)/Sign-in" asChild>
                  <Text
                    className="text-vuior-alternate-500"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    Log in
                  </Text>
                </Link>
              </Text>
            </View>

            {/* Trust Badges */}
            <View className="flex-row justify-around pt-5 border-t border-gray-100 pb-2">
              {/* Secure & Encrypted */}
              <View className="items-center flex-1">
                <View className="w-11 h-11 rounded-full bg-green-50 items-center justify-center mb-2">
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={22}
                    color="#15803d"
                  />
                </View>
                <Text
                  className="text-xs text-gray-900 text-center"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Secure & encrypted
                </Text>
                <Text
                  className="text-xs text-gray-400 text-center mt-0.5"
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  Your data is protected
                </Text>
              </View>

              {/* Save more */}
              <View className="items-center flex-1">
                <View className="w-11 h-11 rounded-full bg-green-50 items-center justify-center mb-2">
                  <Ionicons name="time-outline" size={22} color="#15803d" />
                </View>
                <Text
                  className="text-xs text-gray-900 text-center"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Save more
                </Text>
                <Text
                  className="text-xs text-gray-400 text-center mt-0.5"
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  Pay early, earn more
                </Text>
              </View>

              {/* Bills made easy */}
              <View className="items-center flex-1">
                <View className="w-11 h-11 rounded-full bg-green-50 items-center justify-center mb-2">
                  <Ionicons name="card-outline" size={22} color="#15803d" />
                </View>
                <Text
                  className="text-xs text-gray-900 text-center"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Bills made easy
                </Text>
                <Text
                  className="text-xs text-gray-400 text-center mt-0.5"
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  All in one place
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
