import { StyleSheet } from 'react-native';

export const venueStyles = StyleSheet.create({
  venueTitleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2%',
  },
  venueLogo: {
    flex: 1,
    padding: '1%'
  },
  venueLogoImage: {
    flex: 1,
    height: 50,
  },
  venueTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})