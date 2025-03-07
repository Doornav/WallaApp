// CreateGroupScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, SafeAreaView } from 'react-native';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import ToggleSwitch from '../components/ToggleSwitch';
import { supabase } from '../utils/supabase';
import * as Location from 'expo-location';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { COLORS, SPACING } from '../styles/theme';

type CreateGroupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateGroup'>;

type Props = {
    navigation: CreateGroupScreenNavigationProp;
};

const CreateGroupScreen: React.FC<Props> = ({ navigation }) => {
    // Form states
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [loading, setLoading] = useState(false);

    // New toggle states
    const [isPrivate, setIsPrivate] = useState(false);
    const [hasMaxPeople, setHasMaxPeople] = useState(false);
    const [maxPeople, setMaxPeople] = useState('');
    const [useCurrentLocation, setUseCurrentLocation] = useState(false);
    const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    // Request location if useCurrentLocation is enabled
    useEffect(() => {
        const getLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission Denied', 'Location permission was denied.');
                    return;
                }
                const position = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
            } catch (error) {
                Alert.alert('Error', 'Unable to fetch location.');
            }
        };

        if (useCurrentLocation) {
            getLocation();
        } else {
            setCurrentLocation(null);
        }
    }, [useCurrentLocation]);

    const handleCreateGroup = async () => {
        if (!groupName.trim()) {
            Alert.alert('Validation Error', 'Please enter a group name.');
            return;
        }
        if (hasMaxPeople && (!maxPeople.trim() || isNaN(Number(maxPeople)))) {
            Alert.alert('Validation Error', 'Please enter a valid number for max people.');
            return;
        }

        setLoading(true);
        try {
            // Insert a new group into Supabase with a proper GeoJSON object for location
            const { data, error } = await supabase.from('groups').insert([
                {
                    name: groupName,
                    description: groupDescription,
                    is_private: isPrivate,
                    max_members: hasMaxPeople ? Number(maxPeople) : null,
                    location: useCurrentLocation && currentLocation
                        ? { type: 'Point', coordinates: [currentLocation.longitude, currentLocation.latitude] }
                        : null,
                },
            ]);
            if (error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Success', 'Group created successfully!');
                navigation.goBack();
            }
        } catch (err) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            {/* Header Component */}
            <Header
                title="Create Group"
                showBackButton={true}
                onBackPress={() => navigation.goBack()}
            />

            {/* Content */}
            <View style={styles.content}>
                <TextInput
                    label="Group Name"
                    placeholder="Enter group name"
                    value={groupName}
                    onChangeText={setGroupName}
                />
                <TextInput
                    label="Group Description"
                    placeholder="Enter group description"
                    value={groupDescription}
                    onChangeText={setGroupDescription}


                />

                {/* Toggle for Private Group */}
                <ToggleSwitch
                    label="Private Group"
                    value={isPrivate}
                    onValueChange={setIsPrivate}
                    containerStyle={styles.toggleContainer}
                />

                {/* Toggle and Input for Max People */}
                <ToggleSwitch
                    label="Set Maximum People"
                    value={hasMaxPeople}
                    onValueChange={setHasMaxPeople}
                    containerStyle={styles.toggleContainer}
                />
                {hasMaxPeople && (
                    <TextInput
                        label="Max People"
                        placeholder="Enter max people"
                        value={maxPeople}
                        onChangeText={setMaxPeople}
                        keyboardType="numeric"
                        containerStyle={styles.inputMargin}
                    />
                )}

                {/* Toggle for Location */}
                <ToggleSwitch
                    label="Use Current Location"
                    value={useCurrentLocation}
                    onValueChange={setUseCurrentLocation}
                    containerStyle={styles.toggleContainer}
                />

                <Button
                    title={loading ? 'Creating...' : 'Create Group'}
                    onPress={handleCreateGroup}
                    disabled={loading}
                    fullWidth
                    size="medium"
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: SPACING.m,
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    toggleContainer: {
        marginVertical: SPACING.s,
    },
    inputMargin: {
        marginBottom: 20,
    },
});

export default CreateGroupScreen;
