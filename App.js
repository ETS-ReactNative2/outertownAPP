import React from 'react';
import { View, Text } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, KoHo_400Regular } from '@expo-google-fonts/koho';

export default function App() {
  let [fontsLoaded] = useFonts({
    KoHo_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'KoHo_400Regular', fontSize: 40 }}>Outer Town 2021</Text>
      </View>
    );
  }
}