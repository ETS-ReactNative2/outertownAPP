// import dependencies
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Image } from 'react-native';
import VenueList from './VenueList.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import components
import Loading from './Loading.js';

export default function HomeScreen({route, navigation}) {
    const [venuesInfo, setVenuesInfo] = useState(false);

    useEffect(() => {
        (async() => {
            // get venue data from local storage
            const localVenuesData = await AsyncStorage.getItem('@venuesData');
            setVenuesInfo(JSON.parse(localVenuesData));
        })();
    }, []);

    // if we haven't got all the data yet, show the loading screen
    if (!venuesInfo) {
        return (
            <Loading />
        )
    }
    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text style={{ fontFamily: 'Bellefair', fontSize: 40 }}>
                Outer Town 2021
            </Text>
            {venuesInfo.map((venue, id)=>{
                return (
                    <VenueList
                        key={id}
                        name={venue.Name}
                        image={venue.VenueImg}
                        action={() => navigation.navigate('Venue Info', {
                            venue: venue,
                        })}
                    />
                )
            })}
        </SafeAreaView>
    )
}