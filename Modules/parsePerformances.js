export default function parsePerformances(performancesData, filterVenue) {
    let performanceData = JSON.parse(performancesData)
    if (filterVenue)
        performanceData = performanceData.filter(performance=>performance.Venue===filterVenue);
    performanceData.map(performance=>performance.Start = new Date(performance.Start));
    performanceData.map(performance=>performance.End = new Date(performance.End));
    performanceData = performanceData.sort((a, b)=>Date.parse(a.Start) - Date.parse(b.Start));
    return performanceData;
}