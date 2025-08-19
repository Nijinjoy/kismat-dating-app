import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, 
         KeyboardAvoidingView, Platform, Image, Animated, Easing, ScrollView } from 'react-native';
import CommonInput from '../../components/CommonInput';
import { logo } from '../../assets/images';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [buttonScale] = useState(new Animated.Value(1));

  const handleLogin = () => {
    let newErrors = {};
    if (!email.includes('@')) newErrors.email = "Enter a valid email";
    if (password.length < 6) newErrors.password = "Password must be at least 6 chars";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Button press animation
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 0.95,
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: true
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true
        })
      ]).start(() => {
        console.log('Login attempt with:', { email, password });
        // Handle login logic here
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Decorative Elements */}
          <View style={styles.decorativeCircle} />
          <View style={styles.decorativeSquare} />
          
          <View style={styles.contentContainer}>
            <View style={styles.logoContainer}>
              <Image 
                source={logo} 
                style={styles.logo}
              />
            </View>

            <View style={styles.formCard}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to continue your journey</Text>
              
              <CommonInput
                type="email"
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                error={errors.email}
                containerStyle={styles.inputContainer}
                icon="email"
              />

              <CommonInput
                type="password"
                label="Password"
                value={password}
                onChangeText={setPassword}
                error={errors.password}
                containerStyle={styles.inputContainer}
                icon="lock"
              />
              
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <TouchableOpacity 
                  style={styles.loginButton} 
                  onPress={handleLogin}
                  activeOpacity={0.9}
                >
                  <Text style={styles.loginButtonText}>Sign In</Text>
                </TouchableOpacity>
              </Animated.View>

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialLoginContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialButtonText}>G</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialButtonText}>f</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerButton}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  decorativeCircle: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(78, 134, 228, 0.1)',
  },
  decorativeSquare: {
    position: 'absolute',
    bottom: -40,
    left: -40,
    width: 150,
    height: 150,
    transform: [{ rotate: '45deg' }],
    backgroundColor: 'rgba(78, 134, 228, 0.1)',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  contentContainer: {
    zIndex: 2,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    tintColor: '#4e86e4',
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 25,
    shadowColor: '#4e86e4',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 5,
    color: '#333',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#4e86e4',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#4e86e4',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#4e86e4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    paddingHorizontal: 10,
    color: '#888',
    fontWeight: '600',
    fontSize: 14,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 10,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  socialButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4e86e4',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  registerText: {
    color: '#666',
    fontSize: 16,
    marginRight: 5,
  },
  registerButton: {
    color: '#4e86e4',
    fontSize: 16,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
