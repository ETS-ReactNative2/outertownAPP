// import dependencies
import React from 'react';
import { Text, View } from 'react-native';
// import components
import ScreenWrapper from './ScreenWrapper';
import OTLogo from './OTLogo';
import { baseStyles } from '../../Styles/baseStyles';

/**
 * @function NoData : 
 * React Native component for displaying content when there is no internet connection and no locally stored data
 * @returns {Component}
 */
export default function NoData() {
    return (
        <ScreenWrapper
            innerPage={true}
        >
            <View style={baseStyles.contentContainer}>
                <OTLogo />
                <View style={baseStyles.textContainer}>
                    <Text style={baseStyles.stdTitle}>
                        App needs to connect to the internet to retrieve the latest Outer Town data. Please try again when you have a connection.
                    </Text>
                </View>
            </View>
        </ScreenWrapper>
    )
}