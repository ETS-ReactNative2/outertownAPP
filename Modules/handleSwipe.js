// https://dev.to/nrymarz/creating-a-tinder-style-swiping-component-with-react-native-part-1-2-h45
export default function handleSwipe({ nativeEvent }, setShowAllPerformances) {
    if (nativeEvent.translationX < -155) {
        setShowAllPerformances(true);
    } else {
        return;
    }
}