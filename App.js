import React, { useEffect, useState }  from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, KoHo_400Regular } from '@expo-google-fonts/koho';
import HomeScreen from './Components/HomeScreen';
import BandInfo from './Components/BandInfo';
import { VenueInfo } from './Components/VenueInfo';
import prepare from './Modules/prepare';

const Stack = createStackNavigator();

// TODO Setup global store for info

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [venuesInfo, setVenuesInfo] = useState(null);
  const [bandsInfo, setbandsInfo] = useState(null);
  const [performancesInfo, setPerformancesInfo] = useState(null);
  let [fontsLoaded] = useFonts({
    KoHo_400Regular,
  });
  useEffect(() => {
    prepare(setVenuesInfo, setbandsInfo, setPerformancesInfo, setAppIsReady);
  }, []);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home Screen"
          options={{headerShown: false}}
          component={HomeScreen}
          initialParams={{
            venuesInfo: venuesInfo,
            performancesInfo: performancesInfo,
            bandsInfo: bandsInfo,
            appIsReady: appIsReady
          }}
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