import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import VenueList from './VenueList.js'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeScreen({route, navigation}) {
    const appIsReady = route.params.appIsReady;
    const onLayoutRootView = useCallback( async () => {
        if (appIsReady) {
          await SplashScreen.hideAsync();
        }
      }, [appIsReady]);    
    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            onLayout={onLayoutRootView}
        >
            <Text style={{ fontFamily: 'KoHo_400Regular', fontSize: 40 }}>
                Outer Town 2021
            </Text>
            {route.params.venueInfo.map((venue, id)=>{
                return (
                    <VenueList
                        key={id}
                        name={venue.Name}
                        image={venue.VenueImg}
                        action={() => navigation.navigate('Venue Info', {
                            venue: venue
                        })}
                    />
                )
            })}
        </SafeAreaView>
    )
}