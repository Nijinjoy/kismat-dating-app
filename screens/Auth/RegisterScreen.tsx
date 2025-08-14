import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const RegisterScreen = () => {
  const insets = useSafeAreaInsets();
  const [countryCode, setCountryCode] = useState("IN");
  const [callingCode, setCallingCode] = useState("91");
  const [phoneNumber, setPhoneNumber] = useState("");

  const buttonBottom = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      Animated.timing(buttonBottom, {
        toValue: e.endCoordinates.height + 20,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(buttonBottom, {
        toValue: 20,
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
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Top Icon */}
        <View style={styles.topIconWrapper}>
          <Ionicons name="call" size={30} color="#4CAF50" />
        </View>

        {/* Heading */}
        <View style={styles.textWrapper}>
          <Text style={styles.heading}>What’s your phone number?</Text>
          <Text style={styles.subHeading}>
            Enter your phone number to register
          </Text>
        </View>

{/* Country Picker Input */}
<View style={[styles.inputWrapper, { marginTop: 20 }]}>
  <View style={{ flexDirection: "row", alignItems: "center" }}>
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
  </View>
</View>


        {/* Phone Number Input */}
        <View style={styles.inputWrapper}>
          <Ionicons
            name="call-outline"
            size={20}
            color="#4CAF50"
            style={{ marginRight: 5 }}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        {/* Paragraph */}
        <Text style={styles.paragraph}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
          We may send you SMS notifications for verification purposes.
        </Text>
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
  topIconWrapper: {
    alignItems: "flex-start",
    marginTop: 10,
  },
  textWrapper: {
    alignItems: "flex-start",
    marginTop: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
  },
  subHeading: {
    fontSize: 14,
    color: "#666",
    textAlign: "left",
    marginTop: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 2,
    marginBottom: 2,
    marginTop: 20, // <-- space from above text
  },  
  callingCode: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  paragraph: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
    lineHeight: 20,
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
