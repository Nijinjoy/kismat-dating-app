import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Image,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const NotificationPermissionScreen = ({ onEnable, onLater }) => {
  const [animation] = useState(new Animated.Value(0));
  const [buttonScale] = useState(new Animated.Value(1));
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          })
        ])
      )
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  };

  const containerTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0]
  });

  const containerOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const iconScale = pulseAnim.interpolate({
    inputRange: [1, 1.1],
    outputRange: [1, 1.05]
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: containerOpacity,
            transform: [{ translateY: containerTranslateY }]
          }
        ]}
      >
        <View style={styles.decorativeCircle} />
        <View style={styles.decorativeSquare} />
        
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: iconScale }] }]}>
          <View style={styles.iconBackground}>
            <Ionicons name="notifications" size={60} color="#4e86e4" />
          </View>
          <View style={styles.notificationDot} />
        </Animated.View>

        <Text style={styles.title}>Stay in the Loop!</Text>
        
        <Text style={styles.description}>
          Enable notifications to get important updates, personalized content, and never miss anything important.
        </Text>

        <View style={styles.benefitsContainer}>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4e86e4" />
            <Text style={styles.benefitText}>Instant alerts</Text>
          </View>
          
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4e86e4" />
            <Text style={styles.benefitText}>Personalized updates</Text>
          </View>
          
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4e86e4" />
            <Text style={styles.benefitText}>Exclusive content</Text>
          </View>
        </View>

        <Animated.View style={{ transform: [{ scale: buttonScale }], width: '100%' }}>
          <TouchableOpacity 
            style={styles.enableButton}
            onPress={onEnable}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
          >
            <Ionicons name="notifications" size={20} color="white" style={styles.buttonIcon} />
            <Text style={styles.enableButtonText}>Enable Notifications</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity 
          style={styles.laterButton}
          onPress={onLater}
          activeOpacity={0.7}
        >
          <Text style={styles.laterButtonText}>Maybe Later</Text>
        </TouchableOpacity>

        <Text style={styles.footnote}>
          You can change this anytime in Settings → Notifications
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    position: 'relative',
  },
  decorativeCircle: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(78, 134, 228, 0.08)',
  },
  decorativeSquare: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 200,
    height: 200,
    transform: [{ rotate: '45deg' }],
    backgroundColor: 'rgba(78, 134, 228, 0.05)',
  },
  iconContainer: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconBackground: {
    backgroundColor: 'rgba(78, 134, 228, 0.1)',
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ff4757',
    borderWidth: 2,
    borderColor: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  benefitsContainer: {
    width: '100%',
    marginBottom: 40,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  benefitText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#555',
  },
  enableButton: {
    backgroundColor: '#4e86e4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#4e86e4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  enableButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  buttonIcon: {
    marginRight: 10,
  },
  laterButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  laterButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  footnote: {
    marginTop: 25,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default NotificationPermissionScreen;
