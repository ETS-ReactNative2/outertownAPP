import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// TODO - add try catch throughout to catch storage errors
export default async function handleLike(bandInfo, bandLiked, setBandLiked, bandPerformance) {
      let token;
      // check if device or simulator
      if (Device.isDevice) {
        // see if access already granted
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted')
          return alert("Notifications won't be sent, permission not granted.");
        token = (await Notifications.getExpoPushTokenAsync()).data;
      } else {
        return alert ('You are running this app on a simulator, you must use a real device to use push notifications');
      }

      // make modifications to Android
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      if (token === undefined) {
        return alert("Notifications won't be sent, couldn't confirm notification permissions.");
      }

  let apiSuccess = false, localSuccess = false;
  // if bandLiked is false, you want to set the band to having been liked in the database and API
    const body = bandLiked ? JSON.stringify({
      unlike: bandInfo.Name,
      pushToken: token,
    }) : JSON.stringify({
      like: bandInfo.Name,
      pushToken: token,
      bandPerformance: bandPerformance,
    });
    await fetch('https://outertownfest.com/api/like.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body
    }).then(response => response.json())
    .then((out) => {
      apiSuccess = out.result;
    })
    let bandsLiked = [];
    let likes = await AsyncStorage.getItem('@likes');
    likes = JSON.parse(likes);
    if (likes === null) { // no likes stored yet
      switch (bandLiked) {
        case true:
          // edge case - shouldn't be possible - do nothing
          return;
          break;
        case false:
          bandsLiked.push(bandInfo.Name);
          break;
      }
    } else { // some likes already stored
      bandsLiked = likes;
      switch (bandLiked) {
        case true:
          // remove band from list of likes
          bandsLiked = bandsLiked.filter(likedBand => likedBand === bandInfo.Name);
          break;
        case false:
          // add band to list of likes, making sure there's no duplicates
          bandsLiked = bandsLiked.filter(likedBand => likedBand !== bandInfo.Name);
          bandsLiked.push(bandInfo.Name);
          break;
      }
    }
    await AsyncStorage.setItem('@likes', JSON.stringify(bandsLiked));
    localSuccess = true;
    if (apiSuccess && localSuccess) return setBandLiked(!bandLiked);
    else {
      bandsLiked = bandsLiked.filter(likedBand => likedBand === bandInfo.Name);
      AsyncStorage.setItem('@likes', JSON.stringify(bandsLiked));
    }
    return setBandLiked(bandLiked);
}