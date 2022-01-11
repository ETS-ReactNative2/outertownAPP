import React, { useCallback, useEffect, useState }  from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, KoHo_400Regular } from '@expo-google-fonts/koho';
import HomeScreen from './Components/HomeScreen';

const Stack = createStackNavigator();


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [venueInfo, setVenueInfo] = useState(null);
  let [fontsLoaded] = useFonts({
    KoHo_400Regular,
  });
  // const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visisble while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Get venue info from API
        const res = await fetch('https://outertownfest.com/api/venues.php')
        const data = await res.json();
        setVenueInfo(data);
      }
      catch (e) {
        console.warn(e);
      }
      finally {
          setAppIsReady(true);
      }
    }
    prepare();
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
            venueInfo: venueInfo,
            appIsReady: appIsReady
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // <HomeScreen
    //   appIsReady={appIsReady}
    //   venueInfo={venueInfo}
    // />
  );
}