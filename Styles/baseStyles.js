import { StyleSheet } from 'react-native';

export const baseStyles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#f4f4ec',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      width: '100%',
    },
    contentContainer: {
      width: '100%',
      justifyContent: 'flex-start',
      paddingBottom: 40,
    },
    stdTitle: {
      fontFamily: 'InterBold',
      fontSize: 18,
      textAlign: 'center',
    },
    stdText: {
      fontFamily: 'KoHo',
      fontSize: 15,
    },
    header: {
      width:'100%',
      backgroundColor:'#5509e3',
      justifyContent: 'center',
      alignItems: 'center'
    },
    headerText: {
      color: '#e9f8ff',
      fontFamily: 'KoHo',
      fontSize: 12
    },
    // call to action
    callToActionContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '1%',
      top: -10, // covers up transition from logo to background road
    },
    callToActionButton: {
      flex: 1,
      backgroundColor: 'steelblue',
      padding: 10,
      borderRadius: 10,
    },
    callToActionText: {
      fontFamily: 'KoHoBold',
      fontSize: 18,
      color: '#a91010',
    },
    // image background
    imageBackgroundStyle: {
      width: '100%',
      alignItems: 'center',
    },
    imageBackgroundImageStyle: {
      width: '100%',
      height: 875 // fudge, calculated to match logo
    }
})