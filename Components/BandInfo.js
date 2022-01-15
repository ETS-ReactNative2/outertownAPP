// import dependencies
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import components
import Loading from './Loading';

export default function BandInfo({route, navigation}) {
    const [bandInfo, setBandInfo] = useState(false);
    useEffect(() => {
        (async() => {
            // get local data for venues and performances
            const localBandsData = await AsyncStorage.getItem('@bandsData');
            // get data for just this band
            const bandData = JSON.parse(localBandsData)
                .filter(band=> band.Name === route.params.band);
            setBandInfo(bandData[0]);
        })();
    }, []);

    if (!bandInfo) {
        return (
            <Loading />
        )
    }

    return (
        <View>
            <Text>{bandInfo.Name}</Text>
            <Text>from {bandInfo.Location}</Text>
        </View>
    )
}