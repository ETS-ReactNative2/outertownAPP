import { StyleSheet } from 'react-native';

export const baseStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f4ec',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      width: '100%',
    },
    contentContainer: {
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
})