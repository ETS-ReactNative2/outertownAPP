import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Performance(props) {
    let stageTitle = null;
    if (props.performance.Stage !== props.performance.Venue) {
        stageTitle = <Text>{props.performance.Stage}</Text>
    }
    return (
        <View>
            {stageTitle}
            <TouchableOpacity
                onPress={props.action}
            >
                <Text>{props.performance.Band}</Text>
            </TouchableOpacity>
            <Text>{String(props.performance.Start.getHours()).padStart(2, '0')}:{String(props.performance.Start.getMinutes()).padStart(2, '0')}</Text>
        </View>
    )
}