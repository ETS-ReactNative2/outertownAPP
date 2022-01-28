import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width;

export const giglistStyles = StyleSheet.create({
    gigRow: {
        flex: 1,
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 5,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        padding: '1%',
        marginBottom: '2%',
        backgroundColor: 'white',
    },
    venue: {
        height: '100%',
        width: '30%',
        marginRight: '1%',
        justifyContent: 'center',
    },
    band: {
        height: '100%',
        width: '48%',
        marginRight: '1%',
        justifyContent: 'center',
    },
    time: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'KoHoBold',
        fontSize: screenWidth * 0.037,
    },
    textSmall: {
        fontFamily: 'KoHo',
        fontSize: screenWidth * 0.035,
    },
    textVenue: {
        fontFamily: 'KoHo',
        fontSize: screenWidth * 0.035,
    },
})