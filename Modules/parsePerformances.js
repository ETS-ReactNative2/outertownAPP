/**
 * @function parsePerformances : 
 * Takes input json string, parses it into object for use in components
 * @param {String} performancesData - in json format
 * @param {String} filterVenue - soecific venue
 * @returns {Object}
 */
export default function parsePerformances(performancesData, filterVenue) {
    let performanceData = JSON.parse(performancesData)
    if (filterVenue)
        performanceData = performanceData.filter(performance=>performance.Venue===filterVenue);
    for (const performance of performanceData) {
        performance.Start = new Date(performance.Start);
        performance.End = new Date(performance.End);
        performance.StartSting = String(performance.Start.getHours()).padStart(2, '0')+':'+String(performance.Start.getMinutes()).padStart(2, '0');
        performance.EndString = String(performance.End.getHours()).padStart(2, '0')+':'+String(performance.End.getMinutes()).padStart(2, '0');
    }
    performanceData = performanceData.sort((a, b)=>Date.parse(a.Start) - Date.parse(b.Start));
    return performanceData;
}