import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';

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
            <Text>
                {venue.Name}
            </Text>
            <Image
                style={{width: '80%', height: 50}}
                source={{uri: venueImagePath+venue.VenueImg}}
            />
        </TouchableOpacity>
    );
}