import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

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
      minHeight: screenHeight,
    },
    contentContainer: {
      width: '100%',
      justifyContent: 'flex-start',
      paddingBottom: 40, // extra padding so there's always some scroll space
    },
    stdTitle: {
      fontFamily: 'InterBold',
      fontSize: screenWidth * 0.04,
      textAlign: 'center',
    },
    stdText: {
      fontFamily: 'KoHo',
      fontSize: screenWidth * 0.035,
    },
    header: {
      width:'100%',
      backgroundColor:'#2b2b27',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1.5%',
    },
    headerText: {
      color: '#e4bf49',
      fontFamily: 'InterBold',
      fontSize: screenWidth * 0.037,
    },
    // call to action
    callToActionContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '1%',
    },
    callToActionTickets: {
      top: '-15%', // covers up transition from logo to background road
    },
    callToActionButton: {
      flex: 1,
      backgroundColor: '#e4bf49',
      paddingTop: '3%',
      paddingBottom: '3%',
      paddingLeft: '5%',
      paddingRight: '5%'
    },
    callToActionText: {
      fontFamily: 'InterBold',
      fontSize: screenWidth * 0.04,
      color: '#353535',
    },
    // image background
    imageBackgroundStyle: {
      width: '100%',
      alignItems: 'center',
    },
    imageBackgroundImageStyle: {
      width: '100%',
      height: 1525 // fudge, calculated to match logo road width
    }
})