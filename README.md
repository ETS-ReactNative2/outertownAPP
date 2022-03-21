![Image](./assets/graphics/icon.png)
# Outer Town Festival App
## Final Assignment for UoL CM3050 by Nigel Powell
An information app for the first year of a new independent festival in Bristol, Outer Town taking place 10th April 2022.
If you're looking at this on GitHub this readme might be baffling and unhelpful, but it's a requirement for the project submission.
## Installation
There are a number of ways to access the application:
- unzip the provided codebase, from the unzipped folder run ```npm install --legacy-peer-deps``` [legacy-peer-deps is required to resolve a dependency issue between React and react-native-testing-library], followed by ```expo start```. The app may then be opened in an Android AVD or iPhone simulator, or on your device
- using the Expo Snack at [Expo.dev](https://snack.expo.dev/@sadsongco/github.com-sadsongco-outertownapp)
- downloading and installing from the [Apple App Store](https://apps.apple.com/gb/app/outer-town-fest/id1610397294) or [Google Play](https://play.google.com/store/apps/details?id=com.nigelpowell.outertownapp)
## Use
Use of the app should be intuitive. It provides information on venues participating in the festival, and what bands are performing where, and at what time. The band liking / notifications functionality is not available on a simulated device. Please note that notifications are sent 10 minutes before the band's start time on the day of the festival (10th April 2022).
## Tests
run ```npm test``` from the app directory.