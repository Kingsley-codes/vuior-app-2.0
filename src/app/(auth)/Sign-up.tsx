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
  ImageBackground,
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

// Types
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

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

// Reusable input wrapper style
const inputWrapper = {
  flexDirection: "row" as const,
  alignItems: "center" as const,
  backgroundColor: "rgba(255,255,255,0.9)",
  borderWidth: 1,
  borderColor: "#e5e7eb",
  borderRadius: 12,
  paddingHorizontal: 14,
  paddingVertical: 14,
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

  const labelStyle = {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#374151",
    marginBottom: 6,
  };

  const inputTextStyle = {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#111827",
    fontFamily: "Inter_400Regular",
  };

  return (
    <ImageBackground
      source={require("../../../assets/authBgImage.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Section */}
          <View
            style={{ alignItems: "center", paddingTop: 72, paddingBottom: 24 }}
          >
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
                marginTop: 20,
              }}
            >
              Create your account
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: "#6b7280",
                marginTop: 4,
              }}
            >
              Join Vuior and start saving by paying bills early
            </Text>
          </View>

          {/* Form */}
          <View style={{ paddingHorizontal: 20, marginTop: 8 }}>
            {/* Full Name */}
            <View style={{ marginBottom: 16 }}>
              <Text style={labelStyle}>Full name</Text>
              <View style={inputWrapper}>
                <Ionicons name="person-outline" size={18} color="#9ca3af" />
                <TextInput
                  style={inputTextStyle}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9ca3af"
                  value={form.fullName}
                  onChangeText={(v) => handleInputChange("fullName", v)}
                  autoCapitalize="words"
                />
              </View>
              {errors.fullName && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#ef4444",
                    marginTop: 4,
                    marginLeft: 4,
                    fontFamily: "Inter_400Regular",
                  }}
                >
                  {errors.fullName}
                </Text>
              )}
            </View>

            {/* Email */}
            <View style={{ marginBottom: 16 }}>
              <Text style={labelStyle}>Email address</Text>
              <View style={inputWrapper}>
                <Ionicons name="mail-outline" size={18} color="#9ca3af" />
                <TextInput
                  style={inputTextStyle}
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
                  style={{
                    fontSize: 12,
                    color: "#ef4444",
                    marginTop: 4,
                    marginLeft: 4,
                    fontFamily: "Inter_400Regular",
                  }}
                >
                  {errors.email}
                </Text>
              )}
            </View>

            {/* Phone Number */}
            <View style={{ marginBottom: 16 }}>
              <Text style={labelStyle}>Phone number</Text>
              <View style={inputWrapper}>
                <Ionicons name="call-outline" size={18} color="#9ca3af" />
                <TouchableOpacity
                  onPress={() => setShowCountryPicker(true)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 8,
                    marginRight: 4,
                  }}
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
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 14,
                      color: "#374151",
                      marginLeft: 4,
                    }}
                  >
                    +{selectedCountry.callingCode?.[0]}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: 1,
                    height: 20,
                    backgroundColor: "#e5e7eb",
                    marginRight: 8,
                  }}
                />
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 14,
                    color: "#111827",
                    fontFamily: "Inter_400Regular",
                  }}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#9ca3af"
                  value={form.phone}
                  onChangeText={(v) => handleInputChange("phone", v)}
                  keyboardType="phone-pad"
                />
              </View>
              {errors.phone && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#ef4444",
                    marginTop: 4,
                    marginLeft: 4,
                    fontFamily: "Inter_400Regular",
                  }}
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
              <View style={{ flex: 1 }}>
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
            <View style={{ marginBottom: 4 }}>
              <Text style={labelStyle}>Password</Text>
              <View style={inputWrapper}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#9ca3af"
                />
                <TextInput
                  style={inputTextStyle}
                  placeholder="Create a password"
                  placeholderTextColor="#9ca3af"
                  value={form.password}
                  onChangeText={(v) => handleInputChange("password", v)}
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
              <Text
                style={{
                  fontSize: 12,
                  color: "#9ca3af",
                  marginTop: 6,
                  marginLeft: 4,
                  fontFamily: "Inter_400Regular",
                }}
              >
                At least 8 characters with a number and symbol
              </Text>
              {errors.password && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#ef4444",
                    marginTop: 4,
                    marginLeft: 4,
                    fontFamily: "Inter_400Regular",
                  }}
                >
                  {errors.password}
                </Text>
              )}
            </View>

            {/* Confirm Password */}
            <View style={{ marginBottom: 20, marginTop: 12 }}>
              <Text style={labelStyle}>Confirm password</Text>
              <View style={inputWrapper}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#9ca3af"
                />
                <TextInput
                  style={inputTextStyle}
                  placeholder="Confirm your password"
                  placeholderTextColor="#9ca3af"
                  value={form.confirmPassword}
                  onChangeText={(v) => handleInputChange("confirmPassword", v)}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ padding: 4 }}
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
                  style={{
                    fontSize: 12,
                    color: "#ef4444",
                    marginTop: 4,
                    marginLeft: 4,
                    fontFamily: "Inter_400Regular",
                  }}
                >
                  {errors.confirmPassword}
                </Text>
              )}
            </View>

            {/* Terms Checkbox */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <TouchableOpacity
                onPress={() => setAgreed(!agreed)}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  marginRight: 10,
                  alignItems: "center",
                  justifyContent: "center",
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
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#4b5563",
                  flex: 1,
                  flexWrap: "wrap",
                }}
              >
                I agree to the{" "}
                <Text
                  style={{ color: "#16a34a", fontFamily: "Inter_500Medium" }}
                >
                  Terms of Service
                </Text>{" "}
                and{" "}
                <Text
                  style={{ color: "#16a34a", fontFamily: "Inter_500Medium" }}
                >
                  Privacy Policy
                </Text>
              </Text>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={{
                backgroundColor: "#15803d",
                borderRadius: 12,
                paddingVertical: 16,
                alignItems: "center",
                marginBottom: 20,
              }}
              activeOpacity={0.88}
              onPress={handleSignUp}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: "#ffffff",
                }}
              >
                Sign Up
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
              onPress={() => handleSocialSignUp("google")}
            >
              <Ionicons
                name="logo-google"
                size={20}
                color="#EA4335"
                style={{ marginRight: 10 }}
              />
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
                marginBottom: 24,
                backgroundColor: "rgba(255,255,255,0.9)",
              }}
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
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: "#111827",
                }}
              >
                Continue with Apple
              </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={{ alignItems: "center", marginBottom: 32 }}>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#6b7280",
                }}
              >
                Already have an account?{" "}
                <Link href="/(auth)/Sign-in" asChild>
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      color: "#16a34a",
                    }}
                  >
                    Log in
                  </Text>
                </Link>
              </Text>
            </View>

            {/* Trust Badges */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                paddingTop: 20,
                borderTopWidth: 1,
                borderTopColor: "#f3f4f6",
                paddingBottom: 8,
              }}
            >
              {/* Secure & Encrypted */}
              <View style={{ alignItems: "center", flex: 1 }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: "#f0fdf4",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 8,
                  }}
                >
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={22}
                    color="#15803d"
                  />
                </View>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 12,
                    color: "#111827",
                    textAlign: "center",
                  }}
                >
                  Secure & encrypted
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 12,
                    color: "#9ca3af",
                    textAlign: "center",
                    marginTop: 2,
                  }}
                >
                  Your data is protected
                </Text>
              </View>

              {/* Save more */}
              <View style={{ alignItems: "center", flex: 1 }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: "#f0fdf4",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 8,
                  }}
                >
                  <Ionicons name="time-outline" size={22} color="#15803d" />
                </View>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 12,
                    color: "#111827",
                    textAlign: "center",
                  }}
                >
                  Save more
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 12,
                    color: "#9ca3af",
                    textAlign: "center",
                    marginTop: 2,
                  }}
                >
                  Pay early, earn more
                </Text>
              </View>

              {/* Bills made easy */}
              <View style={{ alignItems: "center", flex: 1 }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: "#f0fdf4",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 8,
                  }}
                >
                  <Ionicons name="card-outline" size={22} color="#15803d" />
                </View>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 12,
                    color: "#111827",
                    textAlign: "center",
                  }}
                >
                  Bills made easy
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 12,
                    color: "#9ca3af",
                    textAlign: "center",
                    marginTop: 2,
                  }}
                >
                  All in one place
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
