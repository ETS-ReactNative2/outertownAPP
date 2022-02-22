import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPerformances } from './getPerformances';

/**
 * @function getBandInfo : 
 * Retrieve band info from local storage
 * @param {String} band 
 * @returns {Promise} - resolves to Object
 */
export async function getBandInfo(band) {
    try {
        // get local data for venues and performances
        const localBandsData = await AsyncStorage.getItem('@bandsData');
        // get data for just this band
        const bandData = JSON.parse(localBandsData)
        .filter(bandDatum => bandDatum.Name === band);
        return bandData[0];
    }
    catch (e) {
        return false;
    }
}

/**
 * @function getBandPerformance : 
 * Retrieve performance(s) by a band from local storage
 * @param {String} band 
 * @returns {Promise} - resolves to Object
 */
export async function getBandPerformance(band) {
    let allPerformances = await getPerformances();
    const bandPerformances = allPerformances.filter(performance=>performance.Band===band);
    return bandPerformances;
}

/**
 * @function getLiked : 
 * Retrieve liked status of band from local storage
 * @param {String} band 
 * @returns {Promise}  - resolves to Boolean
 */
export async function getLiked(band) {
    try {
        let likes = await AsyncStorage.getItem('@likes');
        if (likes === null) return false;
        likes = JSON.parse(likes);
        const liked = likes.filter(likedBand=>likedBand===band);
        if (liked.length === 0) return false;
        return true;
    }
    catch (e) {
        return false;
    }
}