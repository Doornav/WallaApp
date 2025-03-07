import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { supabase } from '../utils/supabase';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { Group } from '../types/groups';
import BottomCard from '../components/BottomCard'; // import the bottom card component

type FindGroupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FindGroup'>;

type Props = {
    navigation: FindGroupScreenNavigationProp;
};

const FindGroupScreen: React.FC<Props> = ({ navigation }) => {
    const [location, setLocation] = useState<any>(null);
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchGroups = async () => {
            try {
                // Get location permissions
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.error('Permission to access location was denied');
                    return;
                }

                // Get current location
                const position = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = position.coords;
                console.log('Current location:', latitude, longitude);

                if (isMounted) {
                    setLocation({
                        latitude,
                        longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                }

                // Fetch nearby groups using Supabase RPC
                const { data, error } = await supabase.rpc('find_nearby_groups', {
                    lat: latitude,
                    lng: longitude,
                    distance_km: 10,
                });

                if (error) throw error;

                console.log('Groups data returned:', data);

                if (isMounted && data) {
                    // Make sure we have valid data before setting state
                    const validGroups = data.filter(
                        (group: Group) =>
                            group.location &&
                            group.location.coordinates &&
                            group.location.coordinates.length === 2
                    );

                    if (validGroups.length > 0) {
                        console.log(`Found ${validGroups.length} valid groups with coordinates`);
                    } else {
                        console.log('No groups with valid coordinates found');
                    }

                    setGroups(validGroups);
                }
            } catch (error) {
                console.error('Error fetching groups:', error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchGroups();

        return () => {
            isMounted = false;
        };
    }, []);

    // Render markers more safely
    const renderMarkers = () => {
        if (!groups || groups.length === 0) return null;

        return groups.map((group) => {
            if (!group.location || !group.location.coordinates) {
                console.log(`Group ${group.id} has missing coordinates`);
                return null;
            }

            const latitude = group.location.coordinates[1];
            const longitude = group.location.coordinates[0];

            if (isNaN(latitude) || isNaN(longitude)) {
                console.log(`Group ${group.id} has invalid coordinates:`, group.location.coordinates);
                return null;
            }

            return (
                <Marker
                    key={group.id}
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                    }}
                    onPress={() => setSelectedGroup(group)} // Set selected group on press
                />
            );
        });
    };

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <Text>Loading groups...</Text>
                </View>
            )}

            {location && (
                <MapView
                    key={groups.length} // re-renders map when groups update
                    style={styles.map}
                    initialRegion={location}
                    onRegionChangeComplete={(region) => setLocation(region)}
                >
                    {/* Current location marker */}
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title="My Location"
                        pinColor="blue"
                    />

                    {/* Group markers */}
                    {renderMarkers()}
                </MapView>
            )}

            {/* Render the bottom card if a group is selected */}
            {selectedGroup && (
                <BottomCard
                    group={selectedGroup}
                    onClose={() => setSelectedGroup(null)}
                    onCreateGroup={() => navigation.navigate('CreateGroup')} // or any other action
                />

            )}

            {!loading && groups.length === 0 && (
                <View style={styles.noGroupsOverlay}>
                    <Text style={styles.noGroupsText}>No groups found nearby</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderRadius: 5,
    },
    noGroupsOverlay: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 10,
    },
    noGroupsText: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
});

export default FindGroupScreen;
