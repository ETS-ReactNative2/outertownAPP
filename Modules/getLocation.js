import * as Location from 'expo-location';
import haversineDistance from './haversine';

const LOCATION_THRESHOLD = 30;

/**
 * Get the location of the nearest venue, if closer than the given
 * @returns {Object|Boolean}
 */
export async function getLocation(venuesInfo) {
    try {
        const VENUE_LOCATIONS = [];
        venuesInfo.map(venueInfo => {
            VENUE_LOCATIONS.push({
                name: venueInfo.Name,
                latitude: venueInfo.Latitude,
                longitude: venueInfo.Longitude,
            })
        })
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            let androidStatus = true;
            let geoloc;
            await Location.enableNetworkProviderAsync()
            .then(res => {if (res === null) androidStatus = false})
            .catch(e => androidStatus = false);
            if (androidStatus) {
                geoloc = await Location.getCurrentPositionAsync({accuracy: 2})
                .catch((e) => {
                    // location not totally necessary, so handle promise rejection gracefully and silently
                    return false;
                });
            }
            let minDist = LOCATION_THRESHOLD;
            let minDistVenue = false;
            if (geoloc && androidStatus) {
                for (const venueLocation of VENUE_LOCATIONS) {
                    const distToVenue = haversineDistance(geoloc.coords, venueLocation)
                    if (distToVenue < LOCATION_THRESHOLD && distToVenue < minDist) {
                        minDistVenue = venueLocation;
                    }
                }
            }
            return minDistVenue;
        }
        return false; 
    }
    catch (e) {
        return false;
    }
}