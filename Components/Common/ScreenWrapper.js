// import dependencies
import React, { useState } from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PanGestureHandler } from 'react-native-gesture-handler';
// import components
import AllPerformances from '../Performance/AllPerformances';
// import modules
import handleSwipe from '../../Modules/handleSwipe.js';
// import styles
import { baseStyles } from '../../Styles/baseStyles.js';

export default function ScreenWrapper(props) {
	const [showAllPerformances, setShowAllPerformances] = useState(false);
    return (
        <PanGestureHandler
			onHandlerStateChange={(e)=>handleSwipe(e, setShowAllPerformances)}
		>
            <ScrollView
                style={baseStyles.content}
            >
            <SafeAreaView
                style={baseStyles.container}
            >
                <ImageBackground
                    source={require('../../assets/graphics/road-bg-long.png')}
                    resizeMode='contain'
                    style={baseStyles.imageBackgroundStyle}
                    imageStyle={baseStyles.imageBackgroundImageStyle}
                >
                    <View style={baseStyles.header}>
                        <Text style={baseStyles.headerText}>
                            Swipe left to to see full gig schedule &lt;&lt;&lt;
                        </Text>
                    </View>
                    <AllPerformances
                        showAllPerformances={showAllPerformances}
                        setShowAllPerformances={setShowAllPerformances}
                    />
                    {props.children}
                </ImageBackground>
            </SafeAreaView>
            </ScrollView>
        </PanGestureHandler>
    )
}