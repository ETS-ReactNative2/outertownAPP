import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Loading() {
    return (
        <SafeAreaView>
            <Text>
                Loading data...
            </Text>
        </SafeAreaView>
    )
}