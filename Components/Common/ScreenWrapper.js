// import dependencies
import React, { useState } from 'react';
import { View, Text } from 'react-native';
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
            <SafeAreaView
                style={baseStyles.container}
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
            </SafeAreaView>
        </PanGestureHandler>
    )
}