import React, { useContext } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import WallaButton from '../components/Button';
import { COLORS, TYPOGRAPHY, SPACING } from '../styles/theme';

const MainScreen = () => {
    const { signOut } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await signOut();
            // The App.tsx component will automatically redirect to authentication flow
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            {/* User profile content would go here */}

            <View style={styles.logoutContainer}>
                <WallaButton
                    title="Log Out"
                    variant="text"
                    onPress={handleLogout}
                    style={styles.logoutButton}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SPACING.m,
    },
    title: {
        ...TYPOGRAPHY.h1,
        color: COLORS.text,
        marginBottom: SPACING.l,
    },
    logoutContainer: {
        marginTop: 'auto',
        marginBottom: SPACING.xl,
    },
    logoutButton: {
        borderColor: COLORS.error,
    },
});

export default MainScreen;