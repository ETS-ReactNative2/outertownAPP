import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, Image } from 'react-native';
import Performance from './Performance';

export function VenueInfo({ route, navigation }) {
    console.log(route.params)
    const venue = route.params.venue;
    const performances = route.params.performancesInfo.sort((a, b) => a.Start > b.start);
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
            {performances.map((performance, id) => {
                return (
                    <Performance
                        performance={performance}
                        action={() => navigation.navigate('Band Info', {
                            bandInfo: route.params.bandsInfo.filter((band) => band.Name === performance.Band)
                        })}
                        key={id}
                    />
                )
            })}
        </SafeAreaView>
    )
}