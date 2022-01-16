// import dependencies
import React, { useEffect, useState } from 'react';
import { Text, FlatList, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import components
import ScreenWrapper from './ScreenWrapper.js';
import Loading from './Loading.js';
import VenueList from './VenueList.js'
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

    // if we haven't got all the data yet, show the loading screen
    if (!venuesInfo) {
        return (
            <Loading />
        )
    }
    return (
        <ScreenWrapper>
        <View style={baseStyles.upperContent}>
            <Text style={baseStyles.stdTitle}>
                Outer Town 2021
            </Text>
            <View style={baseStyles.contentContainer}>
            <FlatList
                data={venuesInfo}
                renderItem={({ item })=>VenueList(item, navigation)}
                keyExtractor={item=>item.Name}
            />
            </View>
        </View>
        </ScreenWrapper>
    )
}