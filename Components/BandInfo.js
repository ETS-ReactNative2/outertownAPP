// import dependencies
import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import components
import ScreenWrapper from './Common/ScreenWrapper';
import Loading from './Common/Loading';
import { baseStyles } from '../Styles/baseStyles';
import LinkWrapper from './Common/LinkWrapper';
// import modules
import { bandImagePath, bandLogoPath, twitterPath } from '../Modules/paths';

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
    }, [route.params.band]);

    if (!bandInfo) {
        return (
            <Loading />
        )
    }

    let bandImage, bandLogo, bandBio, bandSpotify, bandTwitter, bandWeb, bandLocation;
    // build screen parts where information available
    if (bandInfo.BandImg) {
        bandImage = <Image
        style={{width: '100%', height: 250}}
        source={{uri: bandImagePath+bandInfo.BandImg}}
        resizeMode='contain'
    />
    }
    if (bandInfo.bandLogo) {
        console.log('Here')
        bandLogo = <Image
        style={{width: 100, height: 30}}
        source={{uri: bandLogoPath+bandInfo.BandLogo}}
        resizeMode='contain'
    />
    } else {
        bandLogo = <View style={{flex: 4, justifyContent: 'center', alignItems: 'flex-start'}}>
            <Text style={baseStyles.stdTitle}>
                {bandInfo.Name}
            </Text>
        </View>
    }

    if (bandInfo.Twitter) {
        const twitComp = <View>
            <Image
                resizeMode='cover'
                source={require('../assets/graphics/socials/tw.png')}
            />
        </View>;
        bandTwitter = <LinkWrapper
            url={twitterPath+bandInfo.Twitter}
            linkComponent={twitComp}
        />
    }
    
    if (bandInfo.Spotify) {
        const spotComp = <View>
            <Image
                resizeMode='cover'
                source={require('../assets/graphics/socials/sp.png')}
            />
        </View>;
        bandTwitter = <LinkWrapper
            url={bandInfo.Spotify}
            linkComponent={spotComp}
        />
    }

    if (bandInfo.Location) {
        bandLocation = <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-end'}}>
            <Text style={baseStyles.stdText}>
                ({bandInfo.Location})
            </Text>
        </View>
    }

    bandBio = <View style={{margin: '5%', padding: '2%', backgroundColor: 'white'}}>
        <Text style={baseStyles.stdText}>
            {bandInfo.Bio ? bandInfo.Bio : '[no bio yet]'}
        </Text>
    </View>

    return (
        <ScreenWrapper>
        <ScrollView style={baseStyles.content}>
            <View style={baseStyles.contentContainer}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', padding: '3%',}}>
                    {bandLogo}
                    {bandLocation}
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center', width: '100%',}}>
                    {bandImage}
                </View>
                {bandBio}
                <View name='socials' style={{padding: '2%', justifyContent: 'center', alignItems: 'center'}}>
                    {bandTwitter}
                    {bandSpotify}
                    {bandWeb}
                </View>
            </View>
        </ScrollView>
    </ScreenWrapper>
    )
}