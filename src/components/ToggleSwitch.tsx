// ToggleSwitch.tsx
import React from 'react';
import { View, Text, Switch, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SPACING } from '../styles/theme';

interface ToggleSwitchProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    disabled?: boolean;
    label?: string;
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    value,
    onValueChange,
    disabled = false,
    label,
    containerStyle,
    labelStyle,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
            <Switch
                value={value}
                onValueChange={onValueChange}
                disabled={disabled}
                thumbColor={value ? COLORS.primary : COLORS.textSecondary}
                trackColor={{ false: COLORS.border, true: COLORS.secondary }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SPACING.s,
    },
    label: {
        fontSize: 16,
        color: COLORS.text,
    },
});

export default ToggleSwitch;
