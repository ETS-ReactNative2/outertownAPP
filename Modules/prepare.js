import * as SplashScreen from 'expo-splash-screen';

export default async function prepare(setVenuesInfo, setBandsInfo, setPerformancesInfo, setAppIsReady) {
    try {
      // Keep the splash screen visisble while we fetch resources
      await SplashScreen.preventAutoHideAsync();
      // Get festival info from API
      const venuesData          = await fetch('https://outertownfest.com/api/venues.php').then((res)=>res.json());
      const bandsData           = await fetch('https://outertownfest.com/api/bands.php').then((res)=>res.json());
      const performancesData    = await fetch('https://outertownfest.com/api/performances.php').then((res)=>res.json());
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