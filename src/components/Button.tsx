import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    ViewStyle,

    StyleProp
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

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant,
    size,
    disabled = false,
    loading = false,
    fullWidth = false,
    icon,
    style,
}) => {
    // Determine the button style based on variant
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

    // Determine text color based on variant
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

    // Determine size style
    const getSizeStyle = () => {
        switch (size) {
            case 'small':
                return styles.smallButton;
            case 'medium':
                return styles.mediumButton;
            case 'large':
                return styles.largeButton;
            default:
                return styles.mediumButton;
        }
    };

    // Determine disabled style
    const getDisabledStyle = () => {
        if (disabled) {
            return styles.disabledButton;
        }
        return {};
    };

    // Combine styles
    const buttonStyles = [
        styles.button,
        getButtonStyle(),
        getSizeStyle(),
        getDisabledStyle(),
        fullWidth && styles.fullWidth,
        style,
    ];

    const textStyles = [
        getTextStyle(),
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
        height: 60,
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

    // Size Styles
    smallButton: {
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.m,
        minHeight: 32,
    },
    mediumButton: {
        paddingVertical: SPACING.s,
        paddingHorizontal: SPACING.l,
        minHeight: 44,
    },
    largeButton: {
        paddingVertical: SPACING.m,
        paddingHorizontal: SPACING.xl,
        minHeight: 56,
    },

    primaryText: {
        fontFamily: FONTS.semiBold,
        fontSize: 20,
        color: COLORS.textLight

    },
    secondaryText: {
        fontFamily: FONTS.semiBold,
        fontSize: 20,
        color: COLORS.text
    },


    // State Styles
    disabledButton: {
        opacity: 0.6,
    },

    // Width Style
    fullWidth: {
        width: '100%',
    },
});

export default Button;