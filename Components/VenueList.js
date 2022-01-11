import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, Image } from 'react-native';
import { Touchable } from 'react-native-web';

export default function VenueList(props) {
    return (
        <TouchableOpacity
            onPress={props.action}
        >
            <Text>
                {props.name}
            </Text>
            <Text>
                {props.image}
            </Text>
        </TouchableOpacity>
    );
}