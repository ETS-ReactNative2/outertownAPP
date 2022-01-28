import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { performanceStyles } from '../../Styles/performanceStyles';

export default function HideAllPerformances(props) {
    return (
        <TouchableOpacity
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