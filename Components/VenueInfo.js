// import dependencies
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import components
import Performance from './Performance';
import Loading from './Loading';

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
            let performanceData = JSON.parse(values[1])
                .filter(performance=>performance.Venue===route.params.venue.Name);
            performanceData.map(performance=>performance.Start = new Date(performance.Start));
            performanceData.map(performance=>performance.End = new Date(performance.End));
            performanceData = performanceData.sort((a, b)=>Date.parse(a.Start) - Date.parse(b.Start));
            setPerformances(performanceData);
        })();
    }, []);

    if (!venueInfo || !performances) {
        return (
            <Loading />
        )
    }

    return (
        <SafeAreaView>
            <Text>
                {venueInfo.Name}
            </Text>
            <Text>
                {venueInfo.Address}
            </Text>
            <Text>
                {venueInfo.Info}
            </Text>
            {performances.map((performance, id) => {
                return (
                    <Performance
                        performance={performance}
                        action={() => navigation.navigate('Band Info', {
                            band: performance.Band
                        })}
                        key={id}
                    />
                )
            })}
        </SafeAreaView>
    )
}