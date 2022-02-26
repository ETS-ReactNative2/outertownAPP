import React, { useState } from "react";
import { Text, Pressable } from "react-native";
import { showLocation } from "react-native-map-link";
import { venueStyles } from "../../Styles/venueStyles";

export default function VenueAddress(props) {
    const [pressOpacity, setPressOpacity] = useState(1);
    const venueInfo = props.venueInfo;
    return (
        <Pressable
            style = {{opacity: pressOpacity}}
            onPressIn={()=>{
                setPressOpacity(0.5)
            }}
            onPressOut={()=>{
                setPressOpacity(1);
                showLocation({
                    latitude: venueInfo.Latitude,
                    longitude: venueInfo.Longitude,
                    title: venueInfo.Name,
                    alwaysIncludeGoogle: true,
                    googleForceLatLon: true,
                    dialogMessage: `Choose an app to show the location of ${venueInfo.Name}`
                })
            }}
        >
            <Text
                accessible={true}
                accessibilityLabel={`Address of venue ${venueInfo.Name}`}
                style={venueStyles.venueAddressText}
            >
                {venueInfo.Address}
            </Text>

        </Pressable>
    );
    // return <Pressable
    // >
    //     <Text
    //         accessible={true}
    //         accessibilityLabel={`Address of venue ${venueInfo.Name}`}
    //         style={venueStyles.venueAddressText}
    //     >
    //         {venueInfo.Address}
    //     </Text>;
    // </Pressable>
}