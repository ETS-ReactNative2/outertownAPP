import AsyncStorage from '@react-native-async-storage/async-storage';
import parsePerformances from './parsePerformances';

export async function getBandInfo(band) {
    // get local data for venues and performances
    const localBandsData = await AsyncStorage.getItem('@bandsData');
    // get data for just this band
    const bandData = JSON.parse(localBandsData)
        .filter(bandDatum => bandDatum.Name === band);
    return bandData[0];
}

export async function getBandPerformance(band) {
    let allPerformances = await AsyncStorage.getItem('@performancesData');
    allPerformances = parsePerformances(allPerformances);
    const bandPerformances = allPerformances.filter(performance=>performance.Band===band);
    return bandPerformances;
}

export async function getLiked(band) {
    let likes = await AsyncStorage.getItem('@likes');
    if (likes === null) return false;
    likes = JSON.parse(likes);
    const liked = likes.filter(likedBand=>likedBand===band);
    if (liked.length === 0) return false;
    return true;
}