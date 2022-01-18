// import dependencies
import React, { useEffect, useState } from 'react';
import { Text, Button, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import components
import ScreenWrapper from './Common/ScreenWrapper.js';
import Loading from './Common/Loading.js';
import LinkWrapper from './Common/LinkWrapper.js';
import OTLogo from './Common/OTLogo.js';
import VenueList from './Venue/VenueList.js'
// import styles
import { baseStyles } from '../Styles/baseStyles.js';
import { venueStyles } from '../Styles/venueStyles'

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
                <OTLogo />
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
                linkComponent={
                <View style={baseStyles.callToActionContainer}>
                    <View style={baseStyles.callToActionButton}>
                        <Text style={baseStyles.callToActionText}>
                            Buy Tickets &gt;&gt;&gt;
                        </Text>
                    </View>
                </View>
                }
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
            <View style={baseStyles.contentContainer}>
                <OTLogo />
                {buyTickets}
                <View style={venueStyles.venueListContainer}>
                    <Text style={baseStyles.stdTitle}>
                        Participating Venues
                    </Text>
                </View>
                {venuesInfo.map((venueInfo)=>
                <View key={venueInfo.Name}>
                    <VenueList
                    venueInfo={venueInfo}
                    navigation={navigation}
                    />
                </View>)}
            </View>
        </ScreenWrapper>
    )
}