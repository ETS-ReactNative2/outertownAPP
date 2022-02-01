import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { performanceStyles } from '../../Styles/performanceStyles';

/**
 * @function HideAllPerformances : 
 * React Native component for displaying a button to close the performances modal
 * @param {Object} props 
 * @returns {Component}
 */
export default function HideAllPerformances(props) {
    const [pressOpacity, setpressOpacity] = useState(1)
    const deactivatePressables = props.deactivatePressables ? props.deactivatePressables : false;
    return (
        <Pressable
                accessible={true}
                disabled={deactivatePressables}
                onPressIn={()=>setpressOpacity(0.2)}
                onPressOut={props.toggleModal}
                style={performanceStyles.hideButton}
            >
            <View style={{opacity: pressOpacity}}>
                <Text style={performanceStyles.hideText}>
                    Hide Giglist
                </Text>
            </View>        
        </Pressable>
    )
}