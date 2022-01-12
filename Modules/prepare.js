import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function prepare(setVenuesInfo, setBandsInfo, setPerformancesInfo, setAppIsReady) {
    try {
			// comment this out for production
			// await AsyncStorage.clear();
      // Keep the splash screen visisble while we fetch resources
      await SplashScreen.preventAutoHideAsync();
      // prepare some variables for our data
      let venuesData = null, bandsData = null, performancesData = null;
			// check if we have local data saved
      try {
        console.log('Retrieving data from local storage...');
        let localVenuesData = await AsyncStorage.getItem('@venuesData');
        let localBandsData = await AsyncStorage.getItem('@bandsData');
        let localPerformancesData = await AsyncStorage.getItem('@performancesData');
				await Promise.all([localVenuesData, localBandsData, localPerformancesData]);
				// if we do then use it
				if (localVenuesData !== null)
					venuesData = JSON.parse(localVenuesData);
				if (localBandsData !== null)
					bandsData = JSON.parse(localBandsData);
				if (localPerformancesData !== null)
					performancesData = JSON.parse(localPerformancesData);

      }
      catch (err) {
        console.log(`Error retrieving local data: ${err} - loading from API`);
      }
      // Get festival info from API
      if (venuesData === null) {
        venuesData = await fetch('https://outertownfest.com/api/venues.php')
        .then((res)=>res.json())
				.then((data)=>{
					AsyncStorage.setItem('@venuesData', JSON.stringify(data));
					return data;
				})
      }
      if (bandsData === null) {
				bandsData = await fetch('https://outertownfest.com/api/bands.php')
        .then((res)=>res.json())
				.then((data)=>{
					AsyncStorage.setItem('@bandsData', JSON.stringify(data));
					return data;
				})
      }
      if (performancesData === null) {
				performancesData    = await fetch('https://outertownfest.com/api/performances.php')
        .then((res)=>res.json())
				.then((data)=>{
					AsyncStorage.setItem('@performancesData', JSON.stringify(data));
					return data;
				})
      }
      await Promise.all([venuesData, bandsData, performancesData]);
      // set data
      setVenuesInfo(venuesData);
      setBandsInfo(bandsData);
      setPerformancesInfo(performancesData);
    }
    catch (e) {
      console.warn(e);
    }
    finally {
        setAppIsReady(true);
    }

  }