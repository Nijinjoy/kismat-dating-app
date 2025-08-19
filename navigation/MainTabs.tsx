import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Main/HomeScreen';
import MatchesScreen from '../screens/Main/MatchesScreen';
import ChatListScreen from '../screens/Main/ChatListScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false, // 🚀 Hide default header for all tabs
    }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
      }} />
      <Tab.Screen name="Matches" component={MatchesScreen} options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />
      }} />
      <Tab.Screen name="Chats" component={ChatListScreen} options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="chatbubble" size={size} color={color} />
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />
      }} />
    </Tab.Navigator>
  );
};

export default MainTabs;
