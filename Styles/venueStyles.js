import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width;

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
  venueItemContainer: {
    width: 'auto',
    minWidth: '82%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0
  },
  venueTitleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2%',
    zIndex: 2,
  },
  venueLogo: {
    flex: 1,
    minHeight: 50, // fixed minimum size for container
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
    top: '2%',
  },
  venueFullImage: {
    width: '80%',
    height: 200, // fixed height for image display
  },
  venueListImage: {
    width: '80%',
    height: 80, // fixed height for image display
    zIndex: 1,
  },
  venueDiv: {
    width:'100%',
    padding: '2%',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 244, 236, 0.7)',
  },
  venueAddressText: {
    fontFamily: 'KoHo',
    fontSize: screenWidth * 0.03
  },
  venueInfoText: {
    fontFamily: 'KoHo',
    fontSize: screenWidth * 0.04,
  }
})