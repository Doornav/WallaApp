import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { COLORS, FONTS } from '../styles/theme';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

type Props = {
    navigation: WelcomeScreenNavigationProp;
};

const Welcome: React.FC<Props> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.headerContainer}>
                <Text style={styles.welcomeText}>Welcome to Walla</Text>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.taglineText}>
                    Empowering Communities with Affordable, Group-based Wholesale Delivery
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.loginButtonText}>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.signupButton}
                        onPress={() => navigation.navigate('Signup')}
                    >
                        <Text style={styles.signupButtonText}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    headerContainer: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 24,
    },
    welcomeText: {
        fontFamily: FONTS.bold,
        fontSize: 32,
        color: '#333',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: COLORS.primary,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        justifyContent: 'space-between',
    },
    taglineText: {
        fontFamily: FONTS.bold,
        fontSize: 36,
        color: '#000',
        marginTop: 40,
        lineHeight: 44,
    },
    buttonContainer: {
        marginBottom: 40,
        gap: 16,
    },
    loginButton: {
        backgroundColor: '#222',
        borderRadius: 28,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        fontFamily: FONTS.medium,
        fontSize: 18,
        color: '#fff',
    },
    signupButton: {
        backgroundColor: COLORS.secondary,
        borderRadius: 28,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupButtonText: {
        fontFamily: FONTS.medium,
        fontSize: 18,
        color: '#000',
    },
});

export default Welcome;