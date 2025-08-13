import { View, Text, StyleSheet, Animated, Easing, Image } from 'react-native';
import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { logo } from '../../assets/images';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const pulseAnim = new Animated.Value(1);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true
        })
      ])
    ).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();
    const timer = setTimeout(() => {
      navigation.replace('Welcome'); 
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#FF6B6B', '#FF8E53', '#FF6B6B']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Image 
            source={logo} 
            style={styles.logo} 
            resizeMode="contain"
          />
        </Animated.View>
        
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.title}>Kismat</Text>
          <Text style={styles.tagline}>Find Your Perfect Match</Text>
        </Animated.View>
      </View>
  
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with ❤️</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { alignItems: 'center', marginBottom: 50 },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  tagline: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
    opacity: 0.9,
    letterSpacing: 0.5,
  },
  footer: { position: 'absolute', bottom: 30 },
  footerText: { color: 'rgba(255, 255, 255, 0.7)', fontSize: 14 },
  logo: { width: 120, height: 120, marginBottom: 20 },
});

export default SplashScreen;
