// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../utils/supabase'; // Adjust path if needed

type AuthContextType = {
    userToken: string | null;
    isLoading: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
    signUp: () => Promise<void>;
    email: string;
    setEmail: (email: string) => void;
    OTP: string;
    setOTP: (OTP: string) => void;
    phoneNumber: string;
    setPhoneNumber: (phoneNumber: string) => void;
    firstName: string;
    setFirstName: (firstName: string) => void;
    lastName: string;
    setLastName: (lastName: string) => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState<string | null>(null);

    // User information states
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [OTP, setOTP] = useState('');

    // Load user info from AsyncStorage
    const loadUserInfo = async () => {
        try {
            const storedEmail = await AsyncStorage.getItem('userEmail');
            const storedPhone = await AsyncStorage.getItem('userPhone');
            const storedFirstName = await AsyncStorage.getItem('userFirstName');
            const storedLastName = await AsyncStorage.getItem('userLastName');

            if (storedEmail) setEmail(storedEmail);
            if (storedPhone) setPhoneNumber(storedPhone);
            if (storedFirstName) setFirstName(storedFirstName);
            if (storedLastName) setLastName(storedLastName);
        } catch (e) {
            console.error('Failed to load user info from storage', e);
        }
    };

    // Check if the user is already logged in using Supabase's session persistence
    useEffect(() => {
        const bootstrapAsync = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) {
                    console.error('Error checking Supabase session:', error);
                } else if (session) {
                    // If a session exists, store the access token in state
                    setUserToken(session.access_token);
                    await loadUserInfo();
                }
            } catch (e) {
                console.error('Error checking Supabase session', e);
            }
            setIsLoading(false);
        };

        bootstrapAsync();
    }, []);

    // Save user info to storage
    const saveUserInfo = async () => {
        try {
            if (email) await AsyncStorage.setItem('userEmail', email);
            if (phoneNumber) await AsyncStorage.setItem('userPhone', phoneNumber);
            if (firstName) await AsyncStorage.setItem('userFirstName', firstName);
            if (lastName) await AsyncStorage.setItem('userLastName', lastName);
        } catch (e) {
            console.error('Failed to save user info to storage', e);
        }
    };

    const signIn = async () => {
        try {
            const phone = '+1' + phoneNumber;
            const token = OTP;
            const { data, error } = await supabase.auth.verifyOtp({
                phone,
                token,
                type: 'sms',
            });
            if (error) {
                console.error('OTP verification error:', error);
                return;
            }
            console.log({ data })
            if (data.session) {
                // Save the access token so the user remains logged in
                await AsyncStorage.setItem('userToken', data.session.access_token);
                setUserToken(data.session.access_token);
            }

            const fullName = firstName + ' ' + lastName;
            const { data: updateData, error: updateError } = await supabase.auth.updateUser({
                email: email, // sets the email in the Auth table
                data: { full_name: fullName },
            });
            if (updateError) {
                console.error('Error updating user:', updateError);
            }
            // Optionally save additional user info to local storage
            await saveUserInfo();
        } catch (e) {
            console.error('Sign in failed', e);
        }
    };

    const signOut = async () => {
        try {
            await supabase.auth.signOut();
            await AsyncStorage.removeItem('userToken');
            setUserToken(null);
            // Optionally, clear stored user info if needed
        } catch (e) {
            console.error('Failed to sign out', e);
        }
    };

    const signUp = async () => {
        try {
            const phone = '+1' + phoneNumber;
            // Initiate sign-up by sending an OTP to the user's phone.
            const { data, error } = await supabase.auth.signInWithOtp({
                phone,
            });
            if (error) {
                console.error('Error during sign up:', error);
                return;
            }
            console.log('OTP sent to:', phone);
        } catch (error) {
            console.error('Sign up failed', error);
        }
    };

    const authContextValue = useMemo(
        () => ({
            userToken,
            isLoading,
            signIn,
            signOut,
            signUp,
            email,
            setEmail,
            phoneNumber,
            setPhoneNumber,
            firstName,
            setFirstName,
            lastName,
            setLastName,
            OTP,
            setOTP,
        }),
        [
            userToken,
            isLoading,
            email,
            phoneNumber,
            firstName,
            lastName,
            OTP
        ]
    );

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};
