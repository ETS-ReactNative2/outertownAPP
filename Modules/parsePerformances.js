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
    // performanceData.map(performance=>performance.Start = new Date(performance.Start));
    // performanceData.map(performance=>performance.End = new Date(performance.End));
    // performanceData.map(performance=>performance.StartSting = String(performance.Start.getHours()).padStart(2, '0')+':'+String(performance.Start.getMinutes()).padStart(2, '0'));
    performanceData = performanceData.sort((a, b)=>Date.parse(a.Start) - Date.parse(b.Start));
    return performanceData;
}