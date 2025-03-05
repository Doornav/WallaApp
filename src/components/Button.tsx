import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    StyleProp
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../styles/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

interface WallaButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const WallaButton: React.FC<WallaButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    fullWidth = false,
    icon,
    style,
    textStyle,
}) => {
    // Determine the button style based on variant
    const getButtonStyle = () => {
        switch (variant) {
            case 'primary':
                return styles.primaryButton;
            case 'secondary':
                return styles.secondaryButton;
            case 'outline':
                return styles.outlineButton;
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
            case 'outline':
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

    // Determine text size style
    const getTextSizeStyle = () => {
        switch (size) {
            case 'small':
                return styles.smallText;
            case 'medium':
                return styles.mediumText;
            case 'large':
                return styles.largeText;
            default:
                return styles.mediumText;
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
        styles.text,
        getTextStyle(),
        getTextSizeStyle(),
        textStyle,
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
        borderRadius: BORDER_RADIUS.m,
    },

    // Variant Styles
    primaryButton: {
        backgroundColor: COLORS.primary,
        borderWidth: 0,
    },
    secondaryButton: {
        backgroundColor: COLORS.secondary,
        borderWidth: 0,
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: COLORS.primary,
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

    // Text Styles
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    primaryText: {
        color: COLORS.secondary,
    },
    secondaryText: {
        color: COLORS.primary,
    },

    // Text Size Styles
    smallText: {
        ...TYPOGRAPHY.caption,
        fontWeight: 'bold',
    },
    mediumText: {
        ...TYPOGRAPHY.body,
        fontWeight: 'bold',
    },
    largeText: {
        ...TYPOGRAPHY.h3,
        fontWeight: 'bold',
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

export default WallaButton;