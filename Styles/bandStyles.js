import { StyleSheet } from 'react-native';

export const bandStyles = StyleSheet.create({
    image: {
        width: '100%',
        height: 250,
    },
    logo: {
        width: 100,
        height: 30,
    },
    logoContainer: {
        flex: 4,justifyContent: 'center',
        alignItems: 'flex-start',
    },
    location: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    bio: {
        margin: '5%',
        padding: '2%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    socials: {
        padding: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    }
});
