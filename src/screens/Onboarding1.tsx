import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Button from '../components/Button';
import { COLORS, FONTS, TYPOGRAPHY } from '../styles/theme';

type Onboarding1ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding1'>;

type Props = {
    navigation: Onboarding1ScreenNavigationProp;
};

const Onboarding1Screen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Map background with controlled opacity */}
            <View style={styles.mapContainer}>
                <Image
                    source={require('../../assets/map_background.png')}
                    style={styles.mapImage}
                    opacity={0.3} // Adjust this value (0.0 to 1.0) to control transparency
                />
            </View>

            <SafeAreaView style={styles.contentWrapper}>
                <StatusBar barStyle="dark-content" />

                {/* Content container with primary color */}
                <View style={styles.contentContainer}>
                    <Text style={styles.headingText}>
                        Walla prides ourself by being the cheapest grocery delivery service. That means:
                    </Text>

                    <Text style={styles.bulletPoints}>
                        - No Memberships{'\n'}
                        - No Price Markups{'\n'}
                        - Low Fees
                    </Text>
                </View>

                {/* Button container */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Next"
                        onPress={() => navigation.navigate('Onboarding2')}
                        style={styles.button}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject, // Fill the entire screen
    },
    mapImage: {
        width: '100%',
        height: '100%',
        // opacity property is set directly on the Image component
    },
    contentWrapper: {
        flex: 1,
    },
    contentContainer: {
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 56,
        borderBottomRightRadius: 56,
        padding: 24,
        paddingTop: 80,
        paddingBottom: 40,
        marginTop: -60
    },
    headingText: {
        ...TYPOGRAPHY.h1,
        color: '#000',
        lineHeight: 42,
        marginBottom: 30,
        fontSize: 32,
    },
    bulletPoints: {
        ...TYPOGRAPHY.h1,
        color: '#000',
        lineHeight: 60,
        fontSize: 32,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        paddingBottom: 60
    },
    button: {
        backgroundColor: '#222',
        borderRadius: 28,
        height: 56,
    }
});

export default Onboarding1Screen;