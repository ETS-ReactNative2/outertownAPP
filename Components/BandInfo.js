import React from 'react';
import { Text, View } from 'react-native';

export default function BandInfo({route, navigation}) {
    const band = route.params.bandInfo[0];
    return (
        <View>
            <Text>{band.Name}</Text>
            <Text>from {band.Location}</Text>
        </View>
    )
}