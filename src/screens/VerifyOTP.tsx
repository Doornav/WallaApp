import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { AuthContext } from '../contexts/AuthContext';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Header from '../components/Header';
import { COLORS, TYPOGRAPHY, SPACING, FONTS } from '../styles/theme';

type VerifyOTPScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VerifyOTP'>;

type Props = {
    navigation: VerifyOTPScreenNavigationProp;
};


const VerifyOTPScreen: React.FC<Props> = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    // Use phoneNumber from context instead of local state
    const { OTP, setOTP, signIn } = useContext(AuthContext);

    const handleContinue = async () => {
        const otpRegex = /^\d{6}$/;


        // Basic validation
        if (!OTP) {
            setError("Phone number required");
            return;
        } else if (!otpRegex.test(OTP)) {
            setError("Phone number is invalid");
            return;
        }

        setIsLoading(true);
        try {
            await signIn();
            navigation.navigate("Onboarding1")
        } catch (error) {
            console.error('Signup error:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleSocialSignup = async (provider: 'google') => {
        // In a real app, you would implement social sign-in here
        console.log(`Signing up with ${provider}`);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                {/* Using the Header component instead of the custom header */}
                <Header
                    title="Phone Number"
                    showSearchButton={false}
                    onBackPress={() => navigation.goBack()}
                />
                <View style={styles.content}>

                    <View style={{ marginBlock: 40 }}>
                        <TextInput
                            placeholder="OTP: 6 digits"
                            value={OTP}
                            onChangeText={setOTP} // This will update the context
                            keyboardType="decimal-pad"
                            error={error}
                        />
                    </View>


                    {/* Continue Button */}
                    <Button
                        title="Continue"
                        onPress={handleContinue}
                        loading={isLoading}
                        fullWidth
                        style={styles.continueButton}
                    />

                    {/* Or Divider */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#CCCCCC', }} />
                        <Text style={{ ...TYPOGRAPHY.body, color: COLORS.textSecondary, paddingHorizontal: SPACING.m, }}>Or</Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#CCCCCC', }} />
                    </View>
                </View>
                {/* Social Sign-in */}
                <View style={styles.socialContainer}>
                    <Button
                        variant='secondary'
                        title='Continue with Google'
                        onPress={() => handleSocialSignup('google')}

                    />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    content: {
        paddingHorizontal: SPACING.m,
        marginBottom: 30,
    },
    continueButton: {
        backgroundColor: '#222',
        borderRadius: 28,
        height: 56,
        marginBottom: SPACING.l,
    },
    socialContainer: {
        flex: 1,
        backgroundColor: COLORS.primary,
        borderTopLeftRadius: 56,
        borderTopRightRadius: 56,
        padding: 24,
        justifyContent: 'space-between',
        marginBottom: -40,
    },
    socialButton: {
        flexDirection: 'row',
        backgroundColor: COLORS.secondary,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 28,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.m,
    },
    socialIcon: {
        width: 20,
        height: 20,
        marginRight: SPACING.m,
    },
    socialButtonText: {
        ...TYPOGRAPHY.body,
        fontFamily: FONTS.medium,
        color: COLORS.text,
    },

});

export default VerifyOTPScreen;