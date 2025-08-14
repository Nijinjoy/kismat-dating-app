import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const VerificationScreen = ({ route, navigation }) => {
  const { phone } = route.params || {};
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < 4) {
      alert("Please enter the complete OTP");
      return;
    }
    Keyboard.dismiss();
    console.log("Verifying OTP:", code);
    // navigation.navigate("NextScreen");
  };

  return (
    <View style={styles.container}>
      {/* Verification Icon */}
      <Ionicons
        name="shield-checkmark-outline"
        size={40}
        color="#4CAF50"
        style={styles.icon}
      />

      {/* Title & Subtitle */}
      <Text style={styles.title}>Enter your verification code</Text>
      <Text style={styles.subtitle}>
        Enter the 4-digit code sent to {phone || "your phone number"}.
      </Text>

      {/* OTP Inputs */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
                inputRefs.current[index - 1].focus();
              }
            }}
          />
        ))}
      </View>

      {/* Floating Round Button */}
      <TouchableOpacity
        style={styles.fabButton}
        onPress={handleVerify}
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-forward" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
    paddingTop: 40,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    marginBottom: 30,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#fff",
  },
  fabButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#4CAF50",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4CAF50",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
});
