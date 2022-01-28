import React from 'react';
import { View, Text } from 'react-native';
import { baseStyles } from '../../Styles/baseStyles';

export default function AllPerformanceHeader() {
    return (
        <View style={baseStyles.header}>
            <Text style={baseStyles.headerText}>
                Full Gig Schedule
            </Text>
        </View>
    )
}