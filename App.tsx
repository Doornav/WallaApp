import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

// Import your screen components
import WelcomeScreen from './src/screens/Welcome';
import LoginScreen from './src/screens/Login';
import SignupScreen from './src/screens/Signup';
import MainTabNavigator from './src/navigation/MainTabNavigator';

// Define your stack navigation param types
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  Main: undefined;
};

type AuthContextType = {
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (token: string) => Promise<void>;
};

// Create a context to provide auth functions
export const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load custom fonts
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

  // Check if the user is logged in
  useEffect(() => {
    const bootstrapAsync = async () => {
      let token = null;
      try {
        // Fetch the token from storage
        token = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
        console.error('Failed to get token from storage', e);
      }

      // Set the token and update loading state
      setUserToken(token);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  // Create auth context for global auth state management
  const authContext = React.useMemo(() => ({
    signIn: async (token: string) => {
      try {
        await AsyncStorage.setItem('userToken', token);
        setUserToken(token);
      } catch (e) {
        console.error('Failed to save token', e);
      }
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        setUserToken(null);
      } catch (e) {
        console.error('Failed to remove token', e);
      }
    },
    signUp: async (token: string) => {
      try {
        await AsyncStorage.setItem('userToken', token);
        setUserToken(token);
      } catch (e) {
        console.error('Failed to save token', e);
      }
    },
  }), []);

  if (isLoading || !fontsLoaded) {
    // Show a loading screen while checking authentication and loading fonts
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A9411D" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {userToken == null ? (
            // Auth screens - shown when not logged in
            <>
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            // Main app screens - shown when logged in
            <Stack.Screen
              name="Main"
              component={MainTabNavigator}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});