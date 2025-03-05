import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import your main screens
import MainScreen from '../screens/Main';


// Define the tab navigator param types
export type MainTabParamList = {
    Main: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string;

                    if (route.name === 'Main') {
                        iconName = focused ? 'home' : 'home-outline';
                    }

                    return <Ionicons name={"home"} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#4CAF50',
                tabBarInactiveTintColor: 'gray',
                headerShown: true,
            })}
        >
            <Tab.Screen name="Main" component={MainScreen} />

        </Tab.Navigator>
    );
};

export default MainTabNavigator;