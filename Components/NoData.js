import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NoData() {
    return (
        <SafeAreaView>
            <Text>
                App needs to connect to the internet to retrieve the latest Outer Town data. Please try again when you have a connection.
            </Text>
        </SafeAreaView>
    )
}