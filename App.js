// import dependencies
import React, { useEffect, useState }  from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
const haversine = require ('haversine');
// import used google fonts
import { useFonts, KoHo_400Regular as KoHo, KoHo_600SemiBold as KoHoBold } from '@expo-google-fonts/koho';
import { Inter_400Regular as Inter, Inter_800ExtraBold as InterBold } from '@expo-google-fonts/inter';
import { Bellefair_400Regular as Bellefair } from '@expo-google-fonts/bellefair';
import { JacquesFrancoisShadow_400Regular as JacquesFrancoisShadow } from '@expo-google-fonts/jacques-francois-shadow';
import { InriaSerif_700Bold as InriaSerif } from '@expo-google-fonts/inria-serif';
import { KaiseiTokumin_800ExtraBold as KaiseiTokumin } from '@expo-google-fonts/kaisei-tokumin';
// import components
import HomeScreen from './Components/Home/HomeScreen';
import BandInfo from './Components/BandInfo';
import VenueInfo from './Components/Venue/VenueInfo';
import NoData from './Components/Common/NoData';
import PrivacyPolicy from './Components/Privacy';
// import functional modules
import prepare from './Modules/prepare';

const Stack = createStackNavigator();

// setup for like notifications if required
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const VENUE_LOCATIONS = [
  {
    name: "Exchange",
    latitude: 51.45570370065201,
    longitude: -2.5828368474797
  },
  {
    name: "Glitch",
    latitude: 51.456646324818784,
    longitude: -2.580444317070724
  },
  {
    name: "Elmer's Arms",
    latitude: 51.456264496739244,
    longitude: -2.5807564710397517
  },
  {
    name: "Ill Repute",
    latitude: 51.456626928265315,
    longitude: -2.579172959398873
  },
  {
    name: "Old Market Assembly",
    latitude: 51.45694781729385,
    longitude: -2.579044213367897
  },
]

const LOCATION_THRESHOLD = 30;

/**
 * @function App : 
 * Main react native app
 * @returns {Component}
 */
const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [location, setLocation] = useState(null);

  let [fontsLoaded] = useFonts({
    KoHo, KoHoBold,
    Inter, InterBold,
    Bellefair,
    JacquesFrancoisShadow,
    InriaSerif,
    KaiseiTokumin
  });
  useEffect(async() => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    let { status } = await Location.requestForegroundPermissionsAsync();
    
    let geoloc = await Location.getLastKnownPositionAsync({requiredAccuracy: LOCATION_THRESHOLD});
    if (geoloc) {
      for (const venue_location of VENUE_LOCATIONS) {
        if (status === 'granted') {
          if (haversine(geoloc.coords, venue_location, {threshold: LOCATION_THRESHOLD, unit: 'meter'})) {
            setLocation(venue_location);
          }
        }
      }
    }
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
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="No Data"
            options={{headerShow: false}}
            component={NoData}
            cardStyle={{height:'100%'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home Screen"
          options={{headerShown: false}}
          component={HomeScreen}
          cardStyle={{height:'100%'}}
          initialParams={{ location: location }}
        />
        <Stack.Screen
          name="Venue Info"
          component={VenueInfo}
          cardStyle={{height:'100%'}}
        />
        <Stack.Screen
          name="Band Info"
          component={BandInfo}
          cardStyle={{height:'100%'}}
        />
        <Stack.Screen
          name="Privacy Policy"
          component={PrivacyPolicy}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;