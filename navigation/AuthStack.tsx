import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/Auth/SplashScreen';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import VerificationScreen from '../screens/Auth/VerificationScreen';
import ProfileDetailsScreen from '../screens/Auth/ProfileDetailsScreen';
import ProfilePictureScreen from '../screens/Auth/ProfilePictureScreen';
import BioScreen from '../screens/Auth/BioScreen';
import NotificationScreen from '../screens/Auth/NotificationScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Verify" component={VerificationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProfilePicture" component={ProfilePictureScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Bio" component={BioScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthStack;
