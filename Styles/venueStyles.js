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
    minHeight: 50,
    padding: '1%',
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
  venueFullImage: {
    width: '80%',
    height: 200,
  },
  venueDiv: {
    width:'100%',
    padding: '2%',
    alignItems: 'center',
  },
  venueAddressText: {
    fontFamily: 'KoHo',
    fontSize: 8
  },
  venueInfoText: {
    fontFamily: 'KoHo',
    fontSize: 12,
  }
})