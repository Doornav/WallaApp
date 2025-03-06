import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    StatusBar
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Button from '../components/Button';
import { COLORS, TYPOGRAPHY } from '../styles/theme';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

type Props = {
    navigation: WelcomeScreenNavigationProp;
};

const Welcome: React.FC<Props> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.headerContainer}>
                <Text style={{ ...TYPOGRAPHY.h1, alignSelf: 'center' }}>Welcome to Walla</Text>
            </View>

            <View style={styles.contentContainer}>
                <Text style={{ ...TYPOGRAPHY.h1, lineHeight: 42, paddingTop: 10 }}>
                    Empowering Communities with Affordable, Group-based Wholesale Delivery
                </Text>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Log In"
                        onPress={() => navigation.navigate('Login')}
                        variant='primary'
                    />

                    <Button
                        title="Sign up"
                        variant="secondary"
                        onPress={() => navigation.navigate('Signup')}

                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    headerContainer: {
        paddingTop: 50,
        paddingBottom: 24,
    },

    contentContainer: {
        flex: 1,
        backgroundColor: COLORS.primary,
        borderTopLeftRadius: 56,
        borderTopRightRadius: 56,
        padding: 24,
        justifyContent: 'space-between',
        marginBottom: -40,
    },

    buttonContainer: {
        marginBottom: 40,
        gap: 16,
    },

});

export default Welcome;