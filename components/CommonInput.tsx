import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CommonInput = ({ 
  type = 'text', 
  label, 
  value, 
  onChangeText, 
  containerStyle,
  error = "",
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;
  
  const handleFocus = () => {
    setIsFocused(true);
    animateLabel(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) animateLabel(0);
  };

  const animateLabel = (toValue) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animateLabel(value ? 1 : isFocused ? 1 : 0);
  }, [value, isFocused]);

  const labelStyle = {
    position: 'absolute',
    left: 12,
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -6],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#888', '#4e86e4'],
    }),
    backgroundColor: 'white',
    paddingHorizontal: 4,
    zIndex: 1,
  };

  const keyboardType = type === 'email' ? 'email-address' : 'default';
  const autoCapitalize = type === 'name' ? 'words' : 'none';
  const secureTextEntry = type === 'password' && !showPassword;

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.Text style={[styles.label, labelStyle]}>
        {label}
      </Animated.Text>
      
      <TextInput
        style={[
          styles.input, 
          isFocused && styles.inputFocused,
          error ? styles.inputError : null,
          type === 'password' && { paddingRight: 40 }
        ]}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      
      {type === 'password' && (
        <TouchableOpacity 
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons 
            name={showPassword ? 'eye-off' : 'eye'} 
            size={20} 
            color="#888" 
          />
        </TouchableOpacity>
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    position: 'relative',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    fontSize: 16,
    backgroundColor: 'white',
  },
  inputFocused: {
    borderColor: '#4e86e4',
    borderWidth: 2,
  },
  inputError: {
    borderColor: 'red',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: '35%',
    transform: [{ translateY: -10 }],
    padding: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default CommonInput;
