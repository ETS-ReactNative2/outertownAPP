// import dependencies
import React, { useEffect, useState }  from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
// import used google fonts
import { useFonts, KoHo_400Regular as KoHo, KoHo_600SemiBold as KoHoBold } from '@expo-google-fonts/koho';
import { Inter_400Regular as Inter, Inter_800ExtraBold as InterBold } from '@expo-google-fonts/inter';
import { Bellefair_400Regular as Bellefair } from '@expo-google-fonts/bellefair';
import { JacquesFrancoisShadow_400Regular as JacquesFrancoisShadow } from '@expo-google-fonts/jacques-francois-shadow';
import { InriaSerif_700Bold as InriaSerif } from '@expo-google-fonts/inria-serif';
import { KaiseiTokumin_800ExtraBold as KaiseiTokumin } from '@expo-google-fonts/kaisei-tokumin';
// import components
import HomeScreen from './Components/HomeScreen';
import BandInfo from './Components/BandInfo';
import VenueInfo from './Components/VenueInfo';
import NoData from './Components/NoData';
// import functional modules
import prepare from './Modules/prepare';

const Stack = createStackNavigator();

// TODO Setup global store for info

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(false);
  let [fontsLoaded] = useFonts({
    KoHo, KoHoBold,
    Inter, InterBold,
    Bellefair,
    JacquesFrancoisShadow,
    InriaSerif,
    KaiseiTokumin
  });
  useEffect(async() => {
    const prepareResult = await prepare();
    if (prepareResult === null) {
      setAppIsReady(true);
    } else {
      setDataAvailable(true);
      setAppIsReady(true);
      await SplashScreen.hideAsync();
    }
  }, []);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  if (!dataAvailable) {
    return (
      <NoData />
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home Screen"
          options={{headerShown: false}}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Venue Info"
          component={VenueInfo}
        />
        <Stack.Screen
          name="Band Info"
          component={BandInfo}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}