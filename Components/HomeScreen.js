// import dependencies
import React, { useEffect, useState } from 'react';
import { Text, Button, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import components
import ScreenWrapper from './Common/ScreenWrapper.js';
import Loading from './Common/Loading.js';
import LinkWrapper from './Common/LinkWrapper.js';
import VenueList from './Venue/VenueList.js'
// import styles
import { baseStyles } from '../Styles/baseStyles.js';

export default function HomeScreen({route, navigation}) {
    const [venuesInfo, setVenuesInfo] = useState(false);
    useEffect(() => {
        (async() => {
            // get venue data from local storage
            const localVenuesData = await AsyncStorage.getItem('@venuesData');
            setVenuesInfo(JSON.parse(localVenuesData));
        })();
    }, []);

    // get local datetime and festival datetimes
    const today = Date.now();
    const festivalDayStart = Date.parse(new Date(Date.UTC(2022, 3, 10)));
    const festivalDayEnd = Date.parse(new Date(Date.UTC(2022, 3, 11, 4)));
    // after the festival, display trailer for 2023
    if (today > festivalDayEnd) {
        return (
            <View>
                <Text>
                    You missed it - try again next year!
                </Text>
            </View>
        )
    }
    // before the festival, display buy ticket call to action
    let buyTickets;
    if (today < festivalDayStart) {
        buyTickets = (
            <LinkWrapper
                url={"https://www.gigantic.com/outer-town-festival-tickets/bristol-various-bristol-venues/2022-04-10-14-30"}
                linkComponent={<View><Text>Buy Tickets for OuterTownFestival 2022</Text></View>}
            />
        )
    }

    // if we haven't got all the data yet, show the loading screen
    if (!venuesInfo) {
        return (
            <Loading />
        )
    }
    
    return (
        <ScreenWrapper>
            <ScrollView style={baseStyles.content}>
                <View style={baseStyles.contentContainer}>
                    <Text style={baseStyles.stdTitle}>
                        Outer Town 2021
                    </Text>
                    {buyTickets}
                    {venuesInfo.map((venueInfo)=>
                    <View key={venueInfo.Name}>
                        <VenueList
                        venueInfo={venueInfo}
                        navigation={navigation}
                        />
                    </View>)}
                </View>
            </ScrollView>
        </ScreenWrapper>
    )
}