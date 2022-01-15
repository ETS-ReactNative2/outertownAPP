import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';

export default function VenueList(props) {
    const venueImagePath = 'https://outertownfest.com/assets/images/venues/';
    return (
        <TouchableOpacity
            style={{width: '100%', flex: 1, justifyContent: 'top', alignItems: 'center'}}
            onPress={props.action}
        >
            <Text>
                {props.name}
            </Text>
            <Image
                style={{width: '80%', height: 50}}
                source={{uri: venueImagePath+props.image}}
            />
        </TouchableOpacity>
    );
}