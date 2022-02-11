import React from 'react';
import { View, Text } from 'react-native'
import { baseStyles } from '../../Styles/baseStyles';

/**
 * @function SwipeHeader : 
 * React Native component to display informational screen header
 * @param {Object} props 
 * @returns {Component}
 */
export default function SwipeHeader(props) {
    return (
        <View style={baseStyles.header}>
            <Text style={baseStyles.headerText}>
                Swipe left to to see full gig schedule
            </Text>
        </View>
    )
}