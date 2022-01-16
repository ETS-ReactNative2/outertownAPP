// import dependencies
import React from 'react';
import { Text, View, Image } from 'react-native';
// import styles
import { venueStyles } from '../Styles/venueStyles';

export default function VenueTitle(props) {
    const venueLogoPath = 'https://outertownfest.com/assets/images/venueLogos/';
    const venue = props.venue;
    let textTitle, logoTitle;
    if (venue.VenueLogo !== '') {
        logoTitle = (<View
            style={venueStyles.venueLogo}
        >
            <Image
                style={venueStyles.venueLogoImage}
                source={{uri: venueLogoPath+venue.VenueLogo}}
                resizeMode='contain'
            />
        </View>)
    }
    if (venue.TitleFont !== '') {
        const fontSize = parseInt(venue.TitleFontSize);
        const appFont = venue.TitleFont.replaceAll(' ', '');
        textTitle = (<View
            style={venueStyles.venueTitle}
        >
            <Text
                style={{fontFamily: appFont, fontSize: fontSize}}
            >
                {venue.Name}
            </Text>
        </View>)
    }
    return (
        <View
            style={venueStyles.venueTitleContainer}
        >
            {textTitle}
            {logoTitle}
        </View>
    )
}