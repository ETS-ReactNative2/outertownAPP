import { StyleSheet } from 'react-native';

export const baseStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4ec',
        alignItems: 'center',
        justifyContent: 'center',
      },
    stdTitle: {
      fontFamily: 'Inter',
      fontSize: 18,
    },
    contentContainer: {
      width: '100%',
    },
    footer: {
      flex:1,
      width:'100%',
      backgroundColor:'#5509e3',
      justifyContent: 'center',
      alignItems: 'center'
    },
    footerText: {
      color: '#e9f8ff',
      fontFamily: 'KoHo',
      fontSize: 12
    },
    upperContent: {
      flex: 15,
      width: '100%',
      justifyContent: 'flex-start',
      alignItems:'center'
    }
})