// import dependencies
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

/**
 * @function prepare : 
 * Determines data sources and retrives data on app startup
 * @returns {Object|null}
 */
export default async function prepare() {
  // fetch any necessary information from API on startup
  // if not connected, use local data
  // if not connected and no local data, return null
  // Keep the splash screen visisble while we fetch resources
  await SplashScreen.preventAutoHideAsync();
    try {
			// comment this out for production
			// await AsyncStorage.clear();
      // first, test internet connection / simultaneously see if there is any local data
      let state, localVersion, updateData = true;
      try {
        let statePromise = NetInfo.fetch();
        let versionPromise = AsyncStorage.getItem('@version');
        const promiseResults = await Promise.all([statePromise, versionPromise]);
        state = promiseResults[0];
        localVersion = promiseResults[1];
        // if we have neither return null, App to display default 'no data' screen
        if ((!state.isConnected) && (localVersion === null))
        return null;
      }
      catch (err) {
        return null;
      }
      // if we have a connection, get current version of API data
      if (state.isConnected) {
        const apiVersion = await fetch('https://outertownfest.com/api/version.php', {headers: {
          'Content-type': 'application/json',}
        })
        .then(res=>res.text());
        // if we have the same version locally as on the API or if connection is expensive use local data
        if ((localVersion === apiVersion) || state.details.isConnectionExpensive)
          updateData = false;
        // otherwise update from API, set local version to api version
        else
          AsyncStorage.setItem('@version', apiVersion);
      }
      // prepare some variables for our data
      let venuesData = null, bandsData = null, performancesData = null;
			// check if we have local data saved
      console.log('Retrieving data from local storage...');
      let localVenuesPromise = AsyncStorage.getItem('@venuesData');
      let localBandsPromise = AsyncStorage.getItem('@bandsData');
      let localPerformancesPromise = AsyncStorage.getItem('@performancesData');
      const localData = await Promise.all([localVenuesPromise, localBandsPromise, localPerformancesPromise]);
      let localVenuesData       = localData[0];
      let localBandsData        = localData[1];
      let localPerformancesData = localData[2];
      // if we do then use it
      if (localVenuesData !== null)
      venuesData = JSON.parse(localVenuesData);
      if (localBandsData !== null)
      bandsData = JSON.parse(localBandsData);
      if (localPerformancesData !== null)
      performancesData = JSON.parse(localPerformancesData);
      // Get festival info from API if no local data
      if (venuesData === null || updateData) {
        console.log('Retrieving data from API...');
        venuesData = fetch('https://outertownfest.com/api/venues.php', {headers: {
          'Content-type': 'application/json',}
        })
        .then((res)=>res.json())
				.then((data)=>{
					AsyncStorage.setItem('@venuesData', JSON.stringify(data));
					return data;
				})
        .catch((err)=>{
          // return null if there's an error getting the data and there's no local version
          if (!localVersion) return null;
        })
      }
      if (bandsData === null || updateData) {
				bandsData = fetch('https://outertownfest.com/api/bands.php', {headers: {
          'Content-type': 'application/json',}
        })
        .then((res)=>res.json())
				.then((data)=>{
					AsyncStorage.setItem('@bandsData', JSON.stringify(data));
					return data;
				})
        .catch((err)=>{
          // return null if there's an error getting the data and there's no local version
          if (!localVersion) return null;
        })
      }
      if (performancesData === null || updateData) {
				performancesData    = fetch('https://outertownfest.com/api/performances.php', {headers: {
          'Content-type': 'application/json',}
        })
        .then((res)=>res.json())
				.then((data)=>{
          data.map(performance=>performance.Start = new Date(performance.Start.replace(' ', 'T')));
          data.map(performance=>performance.End = new Date(performance.End.replace(' ', 'T')));
          AsyncStorage.setItem('@performancesData', JSON.stringify(data));
					return data;
				})
        .catch((err)=>{
          // return null if there's an error getting the data and there's no local version
          if (!localVersion) return null;
        })
      }
      const appData = await Promise.all([venuesData, bandsData, performancesData]);
      return appData;
    }
    catch (e) {
      console.warn(e);
      return null;
    }
  }
  