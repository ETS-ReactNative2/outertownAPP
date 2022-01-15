import React, { useState } from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

import handleSwipe from '../Modules/handleSwipe';


export default function AllPerformances(props) {
    return (
        <PanGestureHandler
			onHandlerStateChange={(e)=>handleSwipe(e, props.setShowAllPerformances)}        
        >
            <Modal
                animationType="slide"
                visible={props.showAllPerformances}
                transparent={false}
                onRequestClose={()=>props.setShowAllPerformances(false)}
            >
                <View
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                >
                    <Text>
                        All Performances
                    </Text>
                    <Pressable
                        onPress = {() => props.setShowAllPerformances(false)}
                    >
                        <Text>Hide Modal</Text>
                    </Pressable>
                </View>
            </Modal>
        </PanGestureHandler>
    )
}