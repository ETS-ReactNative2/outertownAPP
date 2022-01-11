import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

export default function HomeScreen({route, navigation}) {
    const appIsReady = route.params.appIsReady;
    const onLayoutRootView = useCallback( async () => {
        if (appIsReady) {
          await SplashScreen.hideAsync();
        }
      }, [appIsReady]);    
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            onLayout={onLayoutRootView}
        >
            <Text style={{ fontFamily: 'KoHo_400Regular', fontSize: 40 }}>
                Outer Town 2021
            </Text>
        </View>
    )
}