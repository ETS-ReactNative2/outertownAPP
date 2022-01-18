import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
// import Components
import VenueTitle from './VenueTitle';
// import styles
import { baseStyles } from '../../Styles/baseStyles';
// import modules
import { venueImagePath } from '../../Modules/paths';
import { venueStyles } from '../../Styles/venueStyles';

export default function VenueList(props) {
    const venueInfo = props.venueInfo;
    const navigation = props.navigation;
    return (
        <TouchableOpacity
            onPress={()=>{navigation.navigate('Venue Info', {
                    venue: venueInfo,
                })}
            }
        >
        <View
            style={venueStyles.venueListContainer}
        >
            <VenueTitle
                venue={venueInfo}
            />

            <Image
                style={venueStyles.venueListImage}
                source={{uri: venueImagePath+venueInfo.VenueImg}}
            />
        </View>
        </TouchableOpacity>
    );
}