import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { baseStyles } from '../../Styles/baseStyles';

export default function SwipeHeader(props) {
    return (
        <View style={baseStyles.header}>
            <Text style={baseStyles.headerText}>
                Swipe left to to see full gig schedule &lt;&lt;&lt;
            </Text>
        </View>
    )
}