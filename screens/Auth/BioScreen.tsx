import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const { width } = Dimensions.get("window");

const questions = [
  { key: "height", label: "What's your height", options: ["4ft", "5ft", "5ft 5in", "6ft"] },
  { key: "status", label: "Relationship Status", options: ["Single", "Married", "Divorced", "Widowed"] },
  { key: "community", label: "Your community", options: ["I prefer not to say", "Hindu", "Christian", "Muslim", "Baptist"] },
  { key: "motherTongue", label: "Your mother tongue", options: ["English", "Hindi", "Tamil", "Malayalam"] },
  { key: "smoking", label: "Do you Smoke?", options: ["Regular", "Socially", "Occasionally"] },
  { key: "drinking", label: "Your drinking habits", options: ["Regular", "Socially", "Occasionally"] },
  { key: "settlePlans", label: "Settling down plans", options: ["In my hometown", "In another city", "Abroad"] },
];

const questionIcons = {
  height: "ruler-vertical",
  status: "heart",
  community: "users",
  motherTongue: "language",
  smoking: "smoking",
  drinking: "glass-cheers",
  settlePlans: "map-marker-alt",
};

const BioScreen = () => {
const navigation =useNavigation()
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const flatListRef = useRef(null);

  const handleSelect = (questionKey, value) => {
    const updatedAnswers = { ...answers, [questionKey]: value };
    setAnswers(updatedAnswers);

    if (currentIndex < questions.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      setIsCompleted(true); 
    //   navigation.navigate("Home")
      console.log("Final Answers:", updatedAnswers);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <FontAwesome5
        name={questionIcons[item.key]}
        size={40}
        color="#667eea"
        style={{ marginBottom: 15 }}
      />
      <Text style={styles.question}>{item.label}</Text>
      <View style={styles.optionsContainer}>
        {item.options.map((option, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.optionButton,
              answers[item.key] === option && styles.selectedOption,
            ]}
            onPress={() => handleSelect(item.key, option)}
          >
            <Text
              style={[
                styles.optionText,
                answers[item.key] === option && styles.selectedOptionText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (isCompleted) {
    return (
      <View style={styles.completedContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#667eea" />

        <FontAwesome5 name="check-circle" size={100} color="#4CAF50" />
        <Text style={styles.doneText}>All Done!</Text>
        <Text style={styles.doneDescription}>
          We built this app exclusively for you to meet someone special.{"\n"}
          Be good, be authentic, and find that love.
        </Text>
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.replace("MainTabs")}
          >
            <Text style={styles.homeButtonText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9ff" }}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <View style={styles.bottomProgressBarContainer}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
      <FlatList
        ref={flatListRef}
        data={questions}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressFill: {
    height: "100%",
    backgroundColor: "#667eea",
  },
  slide: {
    width,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  question: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
    color: "#2d3748",
  },
  optionsContainer: {
    width: "100%",
    alignItems: "center",
  },
  optionButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 8,
    width: "80%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  optionText: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
  },
  selectedOption: {
    borderColor: "#667eea",
  },
  selectedOptionText: {
    color: "#667eea",
    fontWeight: "700",
  },
  bottomProgressBarContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    height: 6,
    backgroundColor: "#e2e8f0",
    width: "100%",
  },
  completedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9ff",
    paddingHorizontal: 25,
    paddingTop: 60,
  },
  doneText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2d3748",
    marginTop: 20,
    marginBottom: 12,
  },
  doneDescription: {
    fontSize: 16,
    color: "#4a5568",
    textAlign: "center",
    lineHeight: 24,
    marginHorizontal: 20,
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  homeButton: {
    backgroundColor: "#667eea",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  
});

export default BioScreen;
