// import dependencies
import React, { useEffect, useState } from 'react';
import { Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import components
import ScreenWrapper from './ScreenWrapper';
import Performance from './Performance';
import Loading from './Loading';
// import modules
import parsePerformances from '../Modules/parsePerformances';

export default function VenueInfo({ route, navigation }) {
    const [venueInfo, setVenueInfo] = useState(false);
    const [performances, setPerformances] = useState(false);
    useEffect(() => {
        (async() => {
            // get local data for venues and performances
            const localVenuesData       = AsyncStorage.getItem('@venuesData');
            const localPerformancesData = AsyncStorage.getItem('@performancesData');
            let values = await Promise.all([localVenuesData, localPerformancesData]);
            // get data for just this venue
            const venueData = JSON.parse(values[0])
                .filter(venue=> venue.Name === route.params.venue.Name);
            setVenueInfo(venueData[0]);
            // get performances for just this venue, and sort in ascending chronological order
            setPerformances(parsePerformances(values[1], route.params.venue.Name));
        })();
    }, [route.params.venue.Name]);

    if (!venueInfo || !performances) {
        return (
            <Loading />
        )
    }

    return (
        <ScreenWrapper>
            <Text>
                {venueInfo.Name}
            </Text>
            <Text>
                {venueInfo.Address}
            </Text>
            <Text>
                {venueInfo.Info}
            </Text>
            <FlatList
                data={performances}
                renderItem={({ item }) => Performance(item, navigation)}
                keyExtractor={item=>item.Id}
            />
        </ScreenWrapper>
    )
}