import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, TYPOGRAPHY, SPACING } from '../styles/theme';

interface HeaderProps {
    title?: string;
    subtitle?: string;
    showBackButton?: boolean;
    showSearchButton?: boolean;
    onBackPress?: () => void;
    onSearchPress?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    subtitleStyle?: StyleProp<TextStyle>;
}


const WallaHeader: React.FC<HeaderProps> = ({
    title = 'Near Me',
    subtitle,
    showBackButton = true,
    showSearchButton = true,
    onBackPress,
    onSearchPress,
    containerStyle,
    titleStyle,
    subtitleStyle,
}) => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    const handleSearchPress = () => {
        if (onSearchPress) {
            onSearchPress();
        }
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {/* Left Button (Back) */}
            <View style={styles.leftContainer}>
                {showBackButton && (
                    <TouchableOpacity
                        style={styles.circleButton}
                        onPress={handleBackPress}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Center (Title and Subtitle) */}
            <View style={styles.centerContainer}>
                <Text style={[styles.title, titleStyle]}>{title}</Text>
                {subtitle && (
                    <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
                )}
            </View>

            {/* Right Button (Search) */}
            <View style={styles.rightContainer}>
                {showSearchButton && (
                    <TouchableOpacity
                        style={styles.circleButton}
                        onPress={handleSearchPress}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="search" size={24} color="#000" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SPACING.m,
        paddingHorizontal: SPACING.s,
        backgroundColor: COLORS.secondary,
        height: 70,
        paddingInline: 20
    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start',

    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',

    },
    circleButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        // Add subtle shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    title: {
        ...TYPOGRAPHY.subtitle,
    },
    subtitle: {
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.textLight,
    },
});

export default WallaHeader;