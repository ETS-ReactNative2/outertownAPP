import React from 'react';
import { View, Text } from 'react-native';
import { baseStyles } from '../../Styles/baseStyles';

/**
 * @function AllPerformanceHeader : 
 * React Native component for displaying an information header for the performances modal
 * @returns {Component}
 */
export default function AllPerformanceHeader() {
    return (
        <View style={baseStyles.header}>
            <Text style={baseStyles.headerText}>
                Full Gig Schedule
            </Text>
        </View>
    )
}