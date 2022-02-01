import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { performanceStyles } from '../../Styles/performanceStyles';

/**
 * @function HideAllPerformances : 
 * React Native component for displaying a button to close the performances modal
 * @param {Object} props 
 * @returns {Component}
 */
export default function HideAllPerformances(props) {
    return (
        <TouchableOpacity
                accessible={true}
                onPress={props.toggleModal}
                style={performanceStyles.hideButton}
            >
            <View>
                <Text style={performanceStyles.hideText}>
                    Hide Giglist
                </Text>
            </View>        
        </TouchableOpacity>
    )
}