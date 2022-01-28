// import dependencies
import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import components
import ScreenWrapper from './Common/ScreenWrapper';
import Loading from './Common/Loading';
import LinkWrapper from './Common/LinkWrapper';
import Performance from './Performance/Performance';
// import modules
import { bandImagePath, bandLogoPath, twitterPath } from '../Modules/paths';
import getBandPerformance from '../Modules/getBandPerformance';
import handleLike from '../Modules/handleLike';
// import styles
import { baseStyles } from '../Styles/baseStyles';
import { bandStyles } from '../Styles/bandStyles';

export default function BandInfo({route, navigation}) {
    const [bandInfo, setBandInfo] = useState(false);
    const [bandPerformance, setBandPerformance] = useState(false);

    useEffect(() => {
        (async() => {
            // get local data for venues and performances
            const localBandsData = await AsyncStorage.getItem('@bandsData');
            // get data for just this band
            const bandData = JSON.parse(localBandsData)
                .filter(band=> band.Name === route.params.band);
            setBandInfo(bandData[0]);
            const bandPerformance = await getBandPerformance(route.params.band);
            setBandPerformance(bandPerformance);
        })();
    }, [route.params.band]);

    if (!bandInfo || !bandPerformance) {
        return (
            <Loading />
        )
    }

    let bandImage, bandLogo, bandBio, bandSpotify, bandTwitter, bandWeb, bandLocation;
    // build screen parts where information available
    if (bandInfo.BandImg) {
        bandImage = <Image
        style={bandStyles.image}
        source={{uri: bandImagePath+bandInfo.BandImg}}
        resizeMode='contain'
    />
    }
    if (bandInfo.bandLogo) {
        bandLogo = <Image
        style={bandStyles.bandLogo}
        source={{uri: bandLogoPath+bandInfo.logo}}
        resizeMode='contain'
    />
    } else {
        bandLogo = <View style={bandStyles.logoContainer}>
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
        bandLocation = <View style={bandStyles.location}>
            <Text style={baseStyles.stdText}>
                ({bandInfo.Location})
            </Text>
        </View>
    }

    bandBio = <View style={bandStyles.bio}>
        <Text style={baseStyles.stdText}>
            {bandInfo.Bio ? bandInfo.Bio : '[no bio yet]'}
        </Text>
    </View>

    const performances = <View style={bandStyles.bio}>
        <Text style={baseStyles.stdTitle}>
            Gig Times
        </Text>
        {bandPerformance.map(performance=>{
            return (
                <Performance
                    navigation={navigation}
                    performance={performance}
                    key={performance.Id}
                />
            )
        })}
    </View>

    const like =
    <View style={[baseStyles.callToActionContainer, {backgroundColor: 'rgba(255, 255, 255, 0.8)'}]}>
        <TouchableOpacity
            style={baseStyles.callToActionButton}
            onPress={() => handleLike(bandInfo)}
        >
            <Text style={baseStyles.callToActionText}>
                Like!
            </Text>
        </TouchableOpacity>
        <Text style={baseStyles.stdText}>
            Be notified when their show is about to start.
        </Text>
    </View>

    return (
        <ScreenWrapper
            innerPage={true}
        >
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
                {like}
                {performances}
                <View name='socials' style={bandStyles.socials}>
                    {bandTwitter}
                    {bandSpotify}
                    {bandWeb}
                </View>
            </View>
        </ScrollView>
    </ScreenWrapper>
    )
}