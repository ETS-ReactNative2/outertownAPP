import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, Image } from 'react-native';

export function VenueInfo({ route, navigation }) {
    const venue = route.params.venue;
    return (
        <SafeAreaView>
            <Text>
                {venue.Name}
            </Text>
            <Text>
                {venue.Address}
            </Text>
            <Text>
                {venue.Info}
            </Text>
        </SafeAreaView>
    )
}