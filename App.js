import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Root />
      </NavigationContainer>
    </AuthProvider>
  );
}

function Root() {
  const { initializing, user } = useContext(AuthContext);

  if (initializing) {
    return null; // Could render a splash/loading screen
  }

  return <AppNavigator isAuthenticated={!!user} />;
}