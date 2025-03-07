import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    ViewStyle,
    StyleProp,
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from '../styles/theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'text';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

// Define a map that ties button container paddings/minHeight and text fontSize together
const SIZE_MAP = {
    small: {
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.m,
        minHeight: 32,
        fontSize: 16,
    },
    medium: {
        paddingVertical: SPACING.s,
        paddingHorizontal: SPACING.l,
        minHeight: 44,
        fontSize: 20,
    },
    large: {
        paddingVertical: SPACING.m,
        paddingHorizontal: SPACING.xl,
        minHeight: 56,
        fontSize: 24,
    },
};

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    fullWidth = false,
    icon,
    style,
}) => {
    // Determine button background based on variant
    const getButtonStyle = () => {
        switch (variant) {
            case 'primary':
                return styles.primaryButton;
            case 'secondary':
                return styles.secondaryButton;
            case 'text':
                return styles.textButton;
            default:
                return styles.primaryButton;
        }
    };

    // Determine text style based on variant
    const getTextStyle = () => {
        switch (variant) {
            case 'primary':
                return styles.primaryText;
            case 'secondary':
                return styles.secondaryText;
            case 'text':
                return styles.secondaryText;
            default:
                return styles.primaryText;
        }
    };

    // Apply a disabled style if needed
    const getDisabledStyle = () => (disabled ? styles.disabledButton : {});

    // Get size-related values
    const sizeStyles = SIZE_MAP[size] || SIZE_MAP.medium;

    // Combine styles: note the inline size values drive both the container and the text
    const buttonStyles = [
        styles.button,
        getButtonStyle(),
        {
            paddingVertical: sizeStyles.paddingVertical,
            paddingHorizontal: sizeStyles.paddingHorizontal,
            minHeight: sizeStyles.minHeight,
        },
        getDisabledStyle(),
        fullWidth && styles.fullWidth,
        style,
    ];

    const textStyles = [
        getTextStyle(),
        {
            fontSize: sizeStyles.fontSize,
        },
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={variant === 'primary' ? COLORS.secondary : COLORS.primary}
                />
            ) : (
                <>
                    {icon && icon}
                    <Text style={textStyles}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDER_RADIUS.round,
    },
    // Variant Styles
    primaryButton: {
        backgroundColor: COLORS.black,
    },
    secondaryButton: {
        backgroundColor: COLORS.secondary,
    },
    textButton: {
        backgroundColor: 'transparent',
    },
    primaryText: {
        fontFamily: FONTS.semiBold,
        color: COLORS.textLight,
    },
    secondaryText: {
        fontFamily: FONTS.semiBold,
        color: COLORS.text,
    },
    // Disabled state style
    disabledButton: {
        opacity: 0.6,
    },
    // Full width style
    fullWidth: {
        width: '100%',
    },
});

export default Button;
