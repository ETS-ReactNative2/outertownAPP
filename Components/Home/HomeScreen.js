// import dependencies
import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import components
import ScreenWrapper from '../Common/ScreenWrapper.js';
import Loading from '../Common/Loading.js';
import LinkWrapper from '../Common/LinkWrapper.js';
import OTLogo from '../Common/OTLogo.js';
import VenueList from '../Venue/VenueList.js'
import PostShowHome from './PostShowHome.js';
import Performance from '../Performance/Performance.js';
import Welcome from './Welcome.js';
// import modules
import { venueImagePath, venueLogoPath } from '../../Modules/paths';
import { getPerformances } from '../../Modules/getPerformances';
import { getLocation } from '../../Modules/getLocation.js';
// import styles
import { baseStyles } from '../../Styles/baseStyles.js';
import { venueStyles } from '../../Styles/venueStyles'

/**
 * @function HomeScreen : 
 * React Native component to display application home screen
 * @param {Navigation} param0 
 * @returns {Component}
 */
export default function HomeScreen({route, navigation}) {
    const [venuesInfo, setVenuesInfo] = useState(false);
    const [location, setLocation] = useState(false);

    useEffect(() => {
        (async() => {
            // if (route.params.location) {
            //     const locationPerformances = await getPerformances(route.params.location.name);
            //     if (locationPerformances[0])
            //         setNextLocationPerformance(locationPerformances[0]);
            //     setLocation(route.params.location);
            // }
            // get venue data from local storage
            let localVenuesData = await AsyncStorage.getItem('@venuesData');
            localVenuesData = JSON.parse(localVenuesData)
            let images = [];
            for (let venue of localVenuesData) {
                if (venue.VenueImg)
                images.push(`${venueImagePath}${venue.VenueImg}`);
                if (venue.VenueLogo)
                images.push(`${venueLogoPath}${venue.VenueLogo}`);
            }
            for (let image of images) {
                await Image.prefetch(image);
            }
            setVenuesInfo(localVenuesData);
            getLocation(venuesInfo)
            .then(res => setLocation(res))
        })();
    }, []);


    // get local datetime and festival datetimes
    const today = Date.now();
    const festivalDayStart = Date.parse(new Date(Date.UTC(2022, 3, 10)));
    const festivalDayEnd = Date.parse(new Date(Date.UTC(2022, 3, 11, 4)));
    // after the festival, display trailer for 2023
    if (today > festivalDayEnd) {
        return (
            <PostShowHome
                navigation={navigation}
            />
        )
    }
    // before the festival, display buy ticket call to action
    let buyTickets;
    if (today < festivalDayStart) {
        buyTickets = (
            <View style={[baseStyles.callToActionContainer, baseStyles.callToActionTickets]}>
                <LinkWrapper
                    accessible={true}
                    accessibilityLabel={`External link to buy tickets for Outer Town Festival`}
                    url={"https://www.gigantic.com/outer-town-festival-tickets/bristol-various-bristol-venues/2022-04-10-14-30"}
                    linkComponent={
                        <View style={baseStyles.callToActionButton}>
                            <Text style={baseStyles.callToActionText}>
                                Tickets
                            </Text>
                        </View>
                    }
                />
            </View>
        )
    }

    // if the device is within 20 meters of any venue on the day of the gig, welcome them to the festival
    let welcome = null;
    if ((today >= festivalDayStart && today <= festivalDayEnd)) {
        welcome = <Welcome
            location = { location }
            navigation = { navigation }
        />
    }

    // if we haven't got all the data yet, show the loading screen
    if (!venuesInfo) {
        return (
            <Loading />
        )
    }
    
    return (
        <ScreenWrapper
            navigation={navigation}
        >
            <View style={baseStyles.contentContainer}>
                <View>
                    <OTLogo />
                    {welcome}
                    {buyTickets}
                </View>
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