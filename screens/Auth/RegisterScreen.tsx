import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = () => {
  const [countryCode, setCountryCode] = useState("IN");
  const [callingCode, setCallingCode] = useState("91");
  const [phoneNumber, setPhoneNumber] = useState("");

  const buttonBottom = useRef(new Animated.Value(20)).current; // Initial bottom position

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      Animated.timing(buttonBottom, {
        toValue: e.endCoordinates.height + 20, // Move above keyboard
        duration: 200,
        useNativeDriver: false,
      }).start();
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(buttonBottom, {
        toValue: 20, // Back to bottom
        duration: 200,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleContinue = () => {
    if (phoneNumber.trim().length < 6) {
      alert("Please enter a valid phone number");
      return;
    }
    console.log(`+${callingCode} ${phoneNumber}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Heading */}
        <Text style={styles.heading}>Let’s Get Started</Text>
        <Text style={styles.subHeading}>
          Enter your phone number to register
        </Text>

        {/* Phone Number Input */}
        <View style={styles.phoneContainer}>
          <CountryPicker
            countryCode={countryCode}
            withFlag
            withCallingCode
            withFilter
            onSelect={(country) => {
              setCountryCode(country.cca2);
              setCallingCode(country.callingCode[0]);
            }}
          />
          <Text style={styles.callingCode}>+{callingCode}</Text>
          <Ionicons
            name="call-outline"
            size={20}
            color="#4CAF50"
            style={{ marginRight: 5 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
      </KeyboardAvoidingView>

      {/* Floating Round Button */}
      <Animated.View style={[styles.fabButton, { bottom: buttonBottom }]}>
        <TouchableOpacity onPress={handleContinue} activeOpacity={0.8}>
          <Ionicons name="arrow-forward" size={28} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 5,
    marginTop: 50,
  },
  subHeading: {
    fontSize: 16,
    textAlign: "center",
    color: "#777",
    marginBottom: 30,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  callingCode: {
    marginHorizontal: 8,
    fontSize: 16,
    color: "#333",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  fabButton: {
    position: "absolute",
    right: 20,
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

