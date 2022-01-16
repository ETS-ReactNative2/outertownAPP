import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Performance(performance, navigation, toggleModal=false) {
    let stageTitle = null;
    if (performance.Stage !== performance.Venue) {
        stageTitle = <Text>{performance.Stage}</Text>
    }
    return (
        <View>
            {stageTitle}
            <TouchableOpacity
                onPress={() => {
                    if (toggleModal)
                        toggleModal();
                    navigation.navigate('Band Info', {
                            band: performance.Band
                        })}
                }
            >
                <Text>{performance.Band}</Text>
            </TouchableOpacity>
            <Text>{String(performance.Start.getHours()).padStart(2, '0')}:{String(performance.Start.getMinutes()).padStart(2, '0')}</Text>
        </View>
    )
}