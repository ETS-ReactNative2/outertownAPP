import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
// import Components
import VenueTitle from './VenueTitle';
// import modules
import { venueImagePath } from '../../Modules/paths';
import { venueStyles } from '../../Styles/venueStyles';

/**
 * @function VenueList :
 * React Native component for displaying a list of venues
 * @param {Object} props 
 * @returns {Component}
 */
export default function VenueList(props) {
    const venueInfo = props.venueInfo;
    const navigation = props.navigation;
    return (
        <TouchableOpacity
            accessible={true}
            accessibilityLabel={`Navigate to information page for venue ${venueInfo.Name}`}
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
                accessible={true}
                accessibilityLabel={`Image of venue ${venueInfo.Name}`}
                style={venueStyles.venueListImage}
                source={{uri: venueImagePath+venueInfo.VenueImg}}
            />
        </View>
        </TouchableOpacity>
    );
}