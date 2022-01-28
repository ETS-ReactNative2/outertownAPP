import AsyncStorage from '@react-native-async-storage/async-storage';
import parsePerformances from './parsePerformances';

export default async function getBandPerformance(band) {
    let allPerformances = await AsyncStorage.getItem('@performancesData');
    allPerformances = parsePerformances(allPerformances);
    const bandPerformances = allPerformances.filter(performance=>performance.Band===band);
    return bandPerformances;
}