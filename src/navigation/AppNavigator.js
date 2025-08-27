import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator({ isAuthenticated }) {
  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Home' }} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerTitle: 'Login' }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerTitle: 'Signup' }} />
        </>
      )}
    </Stack.Navigator>
  );
}