// App.tsx
import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import AuthProvider and AuthContext
import { AuthProvider, AuthContext } from './src/contexts/AuthContext';

// Import screens
import WelcomeScreen from './src/screens/Welcome';
import PhoneNumberScreen from './src/screens/PhoneNumber';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import EmailScreen from './src/screens/Email';
import NameScreen from './src/screens/Name';
import VerifyOTPScreen from './src/screens/VerifyOTP';
import Onboarding1Screen from './src/screens/Onboarding1';
import Onboarding2Screen from './src/screens/Onboarding2';
import FindGroupScreen from './src/screens/FindGroup';
import CreateGroupScreen from './src/screens/CreateGroup';
// Define your stack navigation param types
export type RootStackParamList = {
  Welcome: undefined;
  PhoneNumber: undefined;
  Email: undefined;
  Main: undefined;
  Name: undefined;
  VerifyOTP: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
  FindGroup: undefined;
  CreateGroup: undefined;
};


const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
  // Access userToken & isLoading from AuthContext
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    // Still checking session or loading initial data
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A9411D" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {userToken == null ? (
        // Auth screens
        <>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PhoneNumber"
            component={PhoneNumberScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Email"
            component={EmailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Name"
            component={NameScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VerifyOTP"
            component={VerifyOTPScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding1"
            component={Onboarding1Screen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding2"
            component={Onboarding1Screen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FindGroup"
            component={FindGroupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateGroup"
            component={CreateGroupScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        // Main app once authenticated
        <Stack.Screen
          name="FindGroup"
          component={FindGroupScreen}
          options={{ headerShown: false }}
        />
        // <Stack.Screen
        //   name="Main"
        //   component={MainTabNavigator}
        //   options={{ headerShown: false }}
        // />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
          'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
          'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
          'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    // Show a loading screen while fonts load
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A9411D" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
