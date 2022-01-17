import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
// import Components
import VenueTitle from './VenueTitle';
// import styles
import { baseStyles } from '../../Styles/baseStyles';
// import modules
import { venueImagePath } from '../../Modules/paths';

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
            style={{width: '100%', justifyContent: 'flex-start', alignItems: 'center'}}
        >
            <VenueTitle
                venue={venueInfo}
            />

            <Image
                style={{width: '80%', height: 80}}
                source={{uri: venueImagePath+venueInfo.VenueImg}}
            />
        </View>
        </TouchableOpacity>
    );
}