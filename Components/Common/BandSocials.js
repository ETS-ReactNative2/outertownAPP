import React from 'react';
import {View, Image} from 'react-native';
import LinkWrapper from './LinkWrapper';
import { bandStyles } from '../../Styles/bandStyles';
import { twitterPath, spotifyPath, instagramPath } from '../../Modules/paths';


const socialIconPath = '../../assets/graphics/socials/';

export default function bandSocials(bandInfo) {
    let bandSpotify, bandTwitter, bandWeb, bandInsta;
    if (bandInfo.Twitter) {
        const twitComp = <View
            style={bandStyles.socialIcon}
            accessible={true}
            accessibilityLabel={`Link to Twitter account of ${bandInfo.Name}`}
        >
            <Image
                resizeMode='cover'
                source={require(socialIconPath + 'tw.png')}
            />
        </View>;
        bandTwitter = <LinkWrapper
            url={twitterPath+bandInfo.Twitter}
            linkComponent={twitComp}
        />;
    }
    
    if (bandInfo.Spotify) {
        const spotComp = <View
            style={bandStyles.socialIcon}
            accessible={true}
            accessibilityLabel={`Link to Spotify account of ${bandInfo.Name}`}
        >
            <Image
                resizeMode='cover'
                source={require(socialIconPath + 'sp.png')}
            />
        </View>;
        bandSpotify = <LinkWrapper
            url={spotifyPath+bandInfo.Spotify}
            linkComponent={spotComp}
        />;
    } 

    if (bandInfo.Insta) {
        const instaComp = <View
            style={bandStyles.socialIcon}
            accessible={true}
            accessibilityLabel={`Link to Instagram account of ${bandInfo.Name}`}
        >
            <Image
                resizeMode='cover'
                source={require(socialIconPath + 'ig.png')}
            />
        </View>;
        bandInsta = <LinkWrapper
            url={instagramPath+bandInfo.Insta}
            linkComponent={instaComp}
        />;
    }

    if (bandInfo.Web) {
        const webComp = <View
            style={bandStyles.socialIcon}
            accessible={true}
            accessibilityLabel={`Link to website of ${bandInfo.Name}`}
        >
            <Image
                resizeMode='cover'
                source={require(socialIconPath + 'web.png')}
            />
        </View>;
        bandWeb = <LinkWrapper
            url={bandInfo.Web}
            linkComponent={webComp}
        />;
    }
    let socials = null;
    if (bandTwitter || bandSpotify || bandWeb) {
        socials = <View name='socials' style={bandStyles.socials}>
        {bandTwitter}
        {bandSpotify}
        {bandInsta}
        {bandWeb}
    </View>
    }
    return socials;
}