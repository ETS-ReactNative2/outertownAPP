// import dependencies
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PanGestureHandler } from 'react-native-gesture-handler';
// import components
import AllPerformances from './AllPerformances.js';
// import modules
import handleSwipe from '../Modules/handleSwipe.js';

export default function ScreenWrapper(props) {
	const [showAllPerformances, setShowAllPerformances] = useState(false);
    return (
        <PanGestureHandler
			onHandlerStateChange={(e)=>handleSwipe(e, setShowAllPerformances)}
		>
            <SafeAreaView
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
				<AllPerformances
					showAllPerformances={showAllPerformances}
					setShowAllPerformances={setShowAllPerformances}
				/>
                {props.children}
                <View style={{flex:1, width:'100%', backgroundColor:'#5509e3', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#e9f8ff'}}>
                        Swipe up to to see gig schedule
                    </Text>
                    <Text style={{color: '#e9f8ff'}}>
                        ^^^
                    </Text>
                </View>
            </SafeAreaView>
        </PanGestureHandler>
    )
}