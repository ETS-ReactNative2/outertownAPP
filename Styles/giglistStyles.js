import { StyleSheet } from 'react-native';

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
        marginBottom: 5,
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
        fontSize: 18
    },
    textSmall: {
        fontFamily: 'KoHo',
        fontSize: 15,
    },
    textVenue: {
        fontFamily: 'KoHo',
        fontSize: 16,
    },
})