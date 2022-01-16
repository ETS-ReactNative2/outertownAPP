// import dependencies
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PanGestureHandler } from 'react-native-gesture-handler';
// import components
import AllPerformances from './AllPerformances.js';
// import modules
import handleSwipe from '../Modules/handleSwipe.js';
// import styles
import { baseStyles } from '../Styles/baseStyles.js';

export default function ScreenWrapper(props) {
	const [showAllPerformances, setShowAllPerformances] = useState(false);
    return (
        <PanGestureHandler
			onHandlerStateChange={(e)=>handleSwipe(e, setShowAllPerformances)}
		>
            <SafeAreaView
                style={baseStyles.container}
            >
                <View style={baseStyles.footer}>
                    <Text style={baseStyles.footerText}>
                        Swipe down to to see gig schedule
                    </Text>
                </View>
				<AllPerformances
					showAllPerformances={showAllPerformances}
					setShowAllPerformances={setShowAllPerformances}
				/>
                {props.children}
            </SafeAreaView>
        </PanGestureHandler>
    )
}