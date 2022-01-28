import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width;

export const performanceStyles = StyleSheet.create({
    hideButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '2%',
        paddingBottom: '2%',
        backgroundColor: '#e4bf49'
    },
    hideText: {
        fontFamily: 'InterBold',
      fontSize: screenWidth * 0.04,
      color: '#353535',
    }
})