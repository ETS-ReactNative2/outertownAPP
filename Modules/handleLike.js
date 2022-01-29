import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO - add try catch throughout to catch storage errors
export default async function handleLike(bandInfo, bandLiked, setBandLiked) {
  let apiSuccess = false, localSuccess = false;
  // if bandLiked is false, you want to set the band to having been liked in the database and API
    const body = bandLiked ? JSON.stringify({unlike: bandInfo.Name}) : JSON.stringify({like: bandInfo.Name});
    await fetch('https://outertownfest.com/api/like.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body
    }).then(response => response.json())
    .then((out) => apiSuccess = JSON.parse(out).result)
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
          bandsLiked = bandsLiked.filter(likedBand => likedBand !== bandInfo.Name);
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
    return setBandLiked(bandLiked);
}