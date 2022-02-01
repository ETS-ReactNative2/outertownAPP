// import dependencies
import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
// import components
import ScreenWrapper from './Common/ScreenWrapper';
import Loading from './Common/Loading';
import LinkWrapper from './Common/LinkWrapper';
import Performance from './Performance/Performance';
// import modules
import { bandImagePath, bandLogoPath, twitterPath } from '../Modules/paths';
import { getBandInfo, getBandPerformance, getLiked } from '../Modules/getBandInfo';
import { cacheImages } from '../Modules/prepare';
import handleLike from '../Modules/handleLike';
// import styles
import { baseStyles } from '../Styles/baseStyles';
import { bandStyles } from '../Styles/bandStyles';

export default function BandInfo({route, navigation}) {
    const [bandInfo, setBandInfo] = useState(false);
    const [bandPerformance, setBandPerformance] = useState(false);
    const [bandLiked, setBandLiked] = useState(false);
    const [buttonBusy, setButtonBusy] = useState(false);

    useEffect(() => {
        (async() => {
            const bandInfo = await getBandInfo(route.params.band);
            const images = [];
            setBandInfo(bandInfo);
            if (bandInfo.BandImg)
                images.push(`${bandImagePath}${bandInfo.BandImg}`);
            if (bandInfo.BandLogo)
                images.push(`${bandLogoPath}${bandInfo.BandLogo}`);
            await cacheImages(images);
            setBandPerformance(await getBandPerformance(route.params.band));
            setBandLiked(await getLiked(route.params.band));
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
                    performance={performance}
                    key={performance.Id}
                />
            )
        })}
    </View>

    let likeButtonStyle = null;
    let likeButtonText = 'Like!';
    let likeInfoText = 'Be notified when their show is about to start.';

    if (bandLiked) {
        likeButtonStyle = bandStyles.unlike;
        likeButtonText = 'Unlike';
        likeInfoText = "Don't be notified about this band's shows.";
    }

    let buttonBusyStyle = null;
    if (buttonBusy) {
        buttonBusyStyle = bandStyles.buttonBusy;
        likeButtonText = '...';
    }
    

    const like =
    <View style={[baseStyles.callToActionContainer, {backgroundColor: 'rgba(255, 255, 255, 0.8)'}]}>
        <TouchableOpacity
            style={[baseStyles.callToActionButton, likeButtonStyle, buttonBusyStyle]}
            onPress={() => {
                setButtonBusy(true);
                handleLike(bandInfo, bandLiked, setBandLiked, bandPerformance, setButtonBusy);
                }
            }
        >
            <Text style={baseStyles.callToActionText}>
                {likeButtonText}
            </Text>
        </TouchableOpacity>
        <Text style={baseStyles.stdText}>
            {likeInfoText}
        </Text>
    </View>

    return (
        <ScreenWrapper
            innerPage={true}
        >
            <View style={baseStyles.contentContainer}>
                <View style={bandStyles.bandHeader}>
                    {bandLogo}
                    {bandLocation}
                </View>
                <View style={bandStyles.bandImageContainer}>
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
                {/* spacer - padding on content container not working? */}
                <View style={{height: 80}}></View>
            </View>
        </ScreenWrapper>
    )
}