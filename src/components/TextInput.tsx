import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    TextInputProps,
    ViewStyle,
    TextStyle,
    StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme, { COLORS, FONTS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../styles/theme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    leftIcon?: string;
    rightIcon?: string;
    onRightIconPress?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    labelStyle?: StyleProp<TextStyle>;
    errorStyle?: StyleProp<TextStyle>;
    showPasswordToggle?: boolean;
}

/**
 * A custom text input component for the Walla app
 */
const WallaTextInput: React.FC<InputProps> = ({
    label,
    error,
    leftIcon,
    rightIcon,
    onRightIconPress,
    containerStyle,
    inputStyle,
    labelStyle,
    errorStyle,
    showPasswordToggle = false,
    secureTextEntry,
    ...restProps
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

    const handleFocus = () => {
        setIsFocused(true);
        if (restProps.onFocus) {
            restProps.onFocus(new Event('focus') as any);
        }
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (restProps.onBlur) {
            restProps.onBlur(new Event('blur') as any);
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

            <View style={[
                styles.inputContainer,
                isFocused && styles.inputContainerFocused,
                error && styles.inputContainerError,
            ]}>
                {leftIcon && (
                    <Ionicons
                        name={leftIcon as any}
                        size={20}
                        color={COLORS.textLight}
                        style={styles.leftIcon}
                    />
                )}

                <TextInput
                    style={[
                        styles.input,
                        leftIcon && styles.inputWithLeftIcon,
                        (rightIcon || showPasswordToggle) && styles.inputWithRightIcon,
                        inputStyle,
                    ]}
                    placeholderTextColor={COLORS.textSecondary}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    secureTextEntry={showPasswordToggle ? !isPasswordVisible : secureTextEntry}
                    {...restProps}
                />

                {showPasswordToggle && (
                    <TouchableOpacity
                        style={styles.rightIcon}
                        onPress={togglePasswordVisibility}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={COLORS.textLight}
                        />
                    </TouchableOpacity>
                )}

                {rightIcon && !showPasswordToggle && (
                    <TouchableOpacity
                        style={styles.rightIcon}
                        onPress={onRightIconPress}
                        activeOpacity={0.7}
                        disabled={!onRightIconPress}
                    >
                        <Ionicons
                            name={rightIcon as any}
                            size={20}
                            color={COLORS.textLight}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        ...TYPOGRAPHY.bodyMedium,
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.border,
        borderRadius: BORDER_RADIUS.m,
        backgroundColor: COLORS.secondary,
        height: 50,
    },
    inputContainerFocused: {
        borderColor: COLORS.primary,
        borderWidth: 2,
    },
    inputContainerError: {
        borderColor: COLORS.error,
    },
    input: {
        ...TYPOGRAPHY.body,
        flex: 1,
        height: '100%',
        color: COLORS.text,
        paddingHorizontal: SPACING.m,
    },
    inputWithLeftIcon: {
        paddingLeft: SPACING.xs,
    },
    inputWithRightIcon: {
        paddingRight: SPACING.xs,
    },
    leftIcon: {
        marginLeft: SPACING.m,
    },
    rightIcon: {
        marginRight: SPACING.m,
        padding: SPACING.xs,
    },
    errorText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.error,
        marginTop: SPACING.xs,
    },
});

export default WallaTextInput;