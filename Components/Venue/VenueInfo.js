// import dependencies
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import components
import ScreenWrapper from '../Common/ScreenWrapper';
import Performance from '../Performance/Performance';
import Loading from '../Common/Loading';
import VenueTitle from './VenueTitle';
// import modules
import parsePerformances from '../../Modules/parsePerformances';
import { venueImagePath } from '../../Modules/paths';
import { baseStyles } from '../../Styles/baseStyles';
import { venueStyles } from '../../Styles/venueStyles';

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
        <ScreenWrapper
            innerPage={true}
        >
            <ScrollView style={baseStyles.content}>
                <View style={baseStyles.contentContainer}>
                    <View style={venueStyles.venueDiv}>
                        <VenueTitle
                            venue={venueInfo}
                        />
                        <Text style={venueStyles.venueAddressText}>
                            {venueInfo.Address}
                        </Text>
                        <Image
                            style={venueStyles.venueFullImage}
                            source={{uri: venueImagePath+venueInfo.VenueImg}}
                            resizeMode='contain'
                        />
                    </View>
                    {/* <View style={venueStyles.venueDiv}>
                        <Text style={venueStyles.venueInfoText}>
                            {venueInfo.Info}
                        </Text>
                    </View> */}
                    <View style={{flex: 2, padding: '3%'}}>

                    {performances.map((performance)=><Performance
                        navigation={navigation}
                        performance={performance}
                        key={performance.Id}
                    />)}
                    </View>
                </View>
            </ScrollView>
        </ScreenWrapper>
    )
}