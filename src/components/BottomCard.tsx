// BottomCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Group } from '../types/groups';
import { COLORS } from '../styles/theme';
import Button from './Button';

type BottomCardProps = {
    group: Group;
    onClose: () => void;
    onCreateGroup: () => void; // New prop for handling Create Group press
};

const BottomCard: React.FC<BottomCardProps> = ({ group, onClose, onCreateGroup }) => {
    return (
        <View style={styles.bottomCardContainer}>
            <Text style={styles.cardTitle}>{group.name}</Text>
            <Text style={styles.cardSubtitle}>
                {group.current_member_count || 0} people
            </Text>

            <View style={styles.line} />

            <Text style={styles.cardBio}>
                {group.description || 'Looking for people to join our group!'}
            </Text>

            <Button
                title="Request to Join"
                onPress={() => console.log('request to join button pressed')}
                size="medium"
            />

            <Text style={styles.orText}>Or</Text>

            <Button
                title="Create Group"
                onPress={onCreateGroup} // Pass the function from the parent here
                size="medium"
                variant="secondary"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    bottomCardContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.primary,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
    },
    line: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#FFF',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#FFF',
        marginBottom: 10,
    },
    cardBio: {
        fontSize: 14,
        color: '#FFF',
        marginBottom: 20,
    },
    orText: {
        color: '#FFF',
        textAlign: 'center',
        marginVertical: 15,
    },
});

export default BottomCard;
