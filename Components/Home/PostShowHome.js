import React from 'react';
import { Text, View } from 'react-native';
import ScreenWrapper from '../Common/ScreenWrapper';
import OTLogo from '../Common/OTLogo';
import LinkWrapper from '../Common/LinkWrapper';
import { baseStyles } from '../../Styles/baseStyles';

const PostShowHome = () => {
    return (
        <ScreenWrapper>
        <View style={baseStyles.contentContainer}>
            <OTLogo />
            <View style={baseStyles.textContainer}>
                <Text style={baseStyles.stdText}>
                    Outer Town 2022 has already gone! Sign up to our mailing list to make sure you get all the news about our bigger and better plans for the 2023 festival the moment they happen. Thanks for supporting a small indie festival like us, it means a lot!
                </Text>
                <Text style={baseStyles.callToActionText}>
                    Cluny and Harry
                </Text>
                <LinkWrapper
                url={"https://mailchi.mp/cf59187e2145/outer-town"}
                linkComponent={
                    <View style = {{width: '100%', marginTop: '5%'}}>
                        <View style={baseStyles.callToActionButton}>
                            <Text style={baseStyles.callToActionText}>
                                Sign up for the mailing list! &gt;&gt;&gt;
                            </Text>
                        </View>
                    </View>
                }
                />
            </View>
        </View>
        </ScreenWrapper>
    )
}

export default PostShowHome;