import * as Location from 'expo-location';
import haversineDistance from './haversine';
// const haversine = require ('haversine');

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
 * Get the location of the nearest venue, if closer than the given
 * @returns {Object|Boolean}
 */
export async function getLocation() {
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
                console.log('promise rejected')
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