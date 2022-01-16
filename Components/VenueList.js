import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
// import Components
import VenueTitle from './VenueTitle';
// import styles
import { baseStyles } from '../Styles/baseStyles';

export default function VenueList(venue, navigation) {
    const venueImagePath = 'https://outertownfest.com/assets/images/venues/';
    return (
        <TouchableOpacity
            style={{width: '100%', flex: 1, justifyContent: 'top', alignItems: 'center'}}
            onPress={()=>{navigation.navigate('Venue Info', {
                    venue: venue,
                })}
            }
        >
            <VenueTitle
                venue={venue}
            />

            <Image
                style={{width: '80%', height: 80}}
                source={{uri: venueImagePath+venue.VenueImg}}
            />
        </TouchableOpacity>
    );
}