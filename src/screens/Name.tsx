import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../App';
import { AuthContext } from '../contexts/AuthContext';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Header from '../components/Header';
import { COLORS, TYPOGRAPHY, SPACING, FONTS } from '../styles/theme';

type NameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Name'>;

type Props = {
    navigation: NameScreenNavigationProp;
};


const NameScreen: React.FC<Props> = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    // Use phoneNumber from context instead of local state
    const { signUp, firstName, setFirstName, lastName, setLastName } = useContext(AuthContext);

    const handleContinue = async () => {
        const nameRegex = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;


        // Basic validation
        if (!firstName || !lastName) {
            setError("Name is required");
            return;
        } else if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            setError("Name is invalid");
            return;
        }

        setIsLoading(true);
        try {

            navigation.navigate("Email")
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
                    title="Name"
                    showSearchButton={false}
                    onBackPress={() => navigation.goBack()}
                />
                <View style={styles.content}>

                    <View style={{ marginBlock: 40, }}>
                        <TextInput
                            placeholder="First Name"
                            value={firstName}
                            onChangeText={setFirstName} // This will update the context
                            keyboardType="default"
                            error={error}
                            containerStyle={{ marginBottom: 20 }}
                        />
                        <TextInput
                            placeholder="Last Name"
                            value={lastName}
                            onChangeText={setLastName} // This will update the context
                            keyboardType="default"
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

                        <View style={{ flex: 1, height: 1, backgroundColor: '#CCCCCC', }} />
                    </View>
                </View>
                {/* Social Sign-in */}
                <View style={styles.socialContainer}>

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

export default NameScreen;