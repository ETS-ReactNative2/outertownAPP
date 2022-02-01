/**
 * @function handleSwipe : 
 * Opens modal when left screen swipe detected
 * https://dev.to/nrymarz/creating-a-tinder-style-swiping-component-with-react-native-part-1-2-h45
 * @param {Event} param0 - triggering gesture event
 * @param {Function} setShowAllPerformances - setState for showAllPerformances
 * @returns {null}
 */
export default function handleSwipe({ nativeEvent }, setShowAllPerformances) {
    if (nativeEvent.translationX < -155) {
        setShowAllPerformances(true);
    } else {
        return;
    }
}