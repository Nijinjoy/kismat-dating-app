import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, 
         KeyboardAvoidingView, Platform, Image, Animated, Easing } from 'react-native';
import { logo } from '../../assets/images';
import CommonInput from '../../components/CommonInput';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [buttonScale] = useState(new Animated.Value(1));

  const handleRegister = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = "Full name is required";
    if (!email.includes('@')) newErrors.email = "Enter a valid email";
    if (password.length < 6) newErrors.password = "Password must be at least 6 chars";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
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
        console.log('Registration attempt with:', { name, email, password });
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
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
            <Text style={styles.title}>Create Account</Text>
            
            <CommonInput
              type="name"
              label="Full Name"
              value={name}
              onChangeText={setName}
              error={errors.name}
              containerStyle={styles.inputContainer}
            />

            <CommonInput
              type="email"
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              containerStyle={styles.inputContainer}
            />

            <CommonInput
              type="password"
              label="Password"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              containerStyle={styles.inputContainer}
            />
            
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity 
                style={styles.registerButton} 
                onPress={handleRegister}
                activeOpacity={0.9}
              >
                <Text style={styles.registerButtonText}>Create Account</Text>
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

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginButton}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
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
    justifyContent: 'center',
    padding: 20,
  },
  contentContainer: {
    zIndex: 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
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
    marginBottom: 25,
    color: '#333',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#4e86e4',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#4e86e4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  loginText: {
    color: '#666',
    fontSize: 16,
    marginRight: 5,
  },
  loginButton: {
    color: '#4e86e4',
    fontSize: 16,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
