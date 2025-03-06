// Define font family mapping
export const FONTS = {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
};

// Define app color palette
export const COLORS = {
    background: '#EBE5DD',
    primary: '#A9411D',
    secondary: '#F5F3F0',
    black: "#181516",

    // Additional complementary colors
    text: '#101010',
    textLight: '#FFF8EF',
    textSecondary: "#383838",
    success: '#587B46',
    error: '#C62828',
    warning: '#E59D23',
    disabled: '#CCBFBA',

    // UI element colors
    cardBackground: '#FFFFFF',
    border: '#555555',
    icon: '#A9411D',
};

// Define spacing constants
export const SPACING = {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
};

// Define border radius constants
export const BORDER_RADIUS = {
    s: 4,
    m: 10,
    l: 16,
    xl: 24,
    round: 100, // For circular elements
};

// Define typography styles
export const TYPOGRAPHY = {
    h1: {
        fontFamily: FONTS.medium,
        fontSize: 33,
        lineHeight: 34,
    },
    h2: {
        fontFamily: FONTS.bold,
        fontSize: 24,
        lineHeight: 30,
    },
    h3: {
        fontFamily: FONTS.semiBold,
        fontSize: 20,
        lineHeight: 26,
    },
    subtitle: {
        fontFamily: FONTS.semiBold,
        fontSize: 18,
        lineHeight: 24,
    },
    body: {
        fontFamily: FONTS.regular,
        fontSize: 16,
        lineHeight: 22,
    },
    bodyMedium: {
        fontFamily: FONTS.medium,
        fontSize: 16,
        lineHeight: 22,
    },
    bodySmall: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        lineHeight: 20,
    },
    caption: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        lineHeight: 16,
    },
};

// Export the theme object for use across the app
const theme = {
    colors: COLORS,
    spacing: SPACING,
    borderRadius: BORDER_RADIUS,
    typography: TYPOGRAPHY,
    fonts: FONTS,
};

export default theme;