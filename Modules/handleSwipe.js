// https://dev.to/nrymarz/creating-a-tinder-style-swiping-component-with-react-native-part-1-2-h45
export default function handleSwipe({ nativeEvent }, setShowAllPerformances) {
    if (nativeEvent.translationY < -255) {
        setShowAllPerformances(true);
    }
    if (nativeEvent.translationY > 255) {
        setShowAllPerformances(false);
    }
}