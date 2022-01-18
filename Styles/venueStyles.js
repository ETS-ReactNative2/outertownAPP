import { StyleSheet } from 'react-native';

export const venueStyles = StyleSheet.create({
  venueListContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '3%',
    backgroundColor: 'rgba(244, 244, 236, 0.5)',
    borderTopColor: 'rgba(0, 0, 0, 0.2)',
    borderTopWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
    paddingBottom: '0.8%',
  },
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
    // padding: '1%',
    top: '2%',
  },
  venueLogoImage: {
    flex: 1,
    height: 50,
  },
  venueTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: '3%',
  },
  venueFullImage: {
    width: '80%',
    height: 200,
  },
  venueListImage: {
    width: '80%',
    height: 80
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