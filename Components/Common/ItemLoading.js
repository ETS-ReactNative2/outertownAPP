import React from 'react';
import { Text, View } from 'react-native';
// import styles
import { giglistStyles } from '../../Styles/giglistStyles';

/**
 * @function ItemLoading : 
 * React Native component for displaying animated screen while data is loading asynchronously
 * @returns {Component}
 */
export default function ItemLoading() {

    return (
        <View
            accessible={true}
            accessibilityLabel={`Details of a performance`}
            style={giglistStyles.gigRow}
        >
            <Text style={giglistStyles.textVenue}>
                ... loading data
            </Text>
        </View>
    )
}