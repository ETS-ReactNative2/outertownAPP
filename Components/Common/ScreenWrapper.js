// import dependencies
import React, { useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
// import components
import AllPerformances from '../Performance/AllPerformances';
import SwipeHeader from './SwipeHeader';
import PrivacyFooter from './PrivacyFooter';
// import modules
import handleSwipe from '../../Modules/handleSwipe.js';
// import styles
import { baseStyles } from '../../Styles/baseStyles.js';

/**
 * @function PageContainer : 
 * React Native component to provide a container appropriate to the current page
 * @param {Object} props 
 * @returns {Component}
 */
function PageContainer(props) {
    if (props.innerPage === true) {
        return (
            <View
                style={baseStyles.container}
            >
                {props.children}
            </View>
        )
    } else {
        return (
            <SafeAreaView
                style={baseStyles.container}
            >
                {props.children}
            </SafeAreaView>
        )
    }
}

/**
 * @function ScreenWrapper : 
 * React Native component providing a template wrapper for each screen
 * @param {Object} props 
 * @returns {Component}
 */
export default function ScreenWrapper(props) {
    const navigation = props.navigation ? props.navigation : null;
	const [showAllPerformances, setShowAllPerformances] = useState(false);
    return (
        <PanGestureHandler
			onHandlerStateChange={(e)=>handleSwipe(e, setShowAllPerformances)}
		>
            <ScrollView
                style={baseStyles.content}
            >
                <PageContainer
                    innerPage={props.innerPage}
                >
                    <ImageBackground
                        source={require('../../assets/graphics/road-bg-long.png')}
                        resizeMode='contain'
                        style={baseStyles.imageBackgroundStyle}
                        imageStyle={baseStyles.imageBackgroundImageStyle}
                    >
                        <SwipeHeader />
                        <AllPerformances
                            showAllPerformances={showAllPerformances}
                            setShowAllPerformances={setShowAllPerformances}
                        />
                        {props.children}
                        <PrivacyFooter
                            navigation={navigation}
                        />
                    </ImageBackground>
                </PageContainer>
            </ScrollView>
        </PanGestureHandler>
    )
}