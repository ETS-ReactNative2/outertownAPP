import parsePerformances from "../../Modules/parsePerformances";

const performances = [
    {
        Id: 1,
        Venue: 'Venue 1',
        Stage: 'Stage 1',
        Band: 'Band Name 1',
        Start: '2022-04-10 00:00:00',
        End: '2022-04-10 00:10:00',
        Note: '',
        Secret: false
    },
    {
        Id: 2,
        Venue: 'Venue 1',
        Stage: 'Stage 2',
        Band: 'Band Name 1',
        Start: '2022-04-10 00:00:00',
        End: '2022-04-10 00:10:00',
        Note: '',
        Secret: false
    },
    {
        Id: 3,
        Venue: 'Venue 2',
        Stage: 'Stage 1',
        Band: 'Band Name 2',
        Start: '2022-04-10 01:00:00',
        End: '2022-04-10 01:10:00',
        Note: '',
        Secret: false
    },
]

const performancesJson = JSON.stringify(performances);

const venue2ExpectedPerformance = {
    Id: 3,
    Venue: 'Venue 2',
    Stage: 'Stage 1',
    Band: 'Band Name 2',
    Start: new Date(performances[2].Start),
    End: new Date(performances[2].End),
    StartString: '01:00',
    EndString: '01:10',
    Note: '',
    Secret: false    
}

describe('parsePerformances', () => {
    test('should return null if no performance data passed in', () => {
        expect(parsePerformances()).toBe(null);
    })
    test('should return an array if valid performance data passed as argument', () => {
        const result = parsePerformances(performancesJson);
        expect(result).not.toBe(null);
        expect(Array.isArray(result)).toBe(true);
    })
    test('should return an array of the same length as passed performances data if no venue filter passed as argument', () => {
        expect(parsePerformances(performancesJson).length).toEqual(performances.length);
    })
    test('should return an array of length 2 when Venue 1 is passed as argument', () => {
        const result = parsePerformances(performancesJson, 'Venue 1');
        expect(result.length).toEqual(2);
    })
    test('should return an array of length 1 when Venue 2 is passed as argument', () => {
        const result = parsePerformances(performancesJson, 'Venue 2');
        expect(result.length).toEqual(1);
    })
    test('should return object with formatted time and start and end strings', () => {
        const result = parsePerformances(performancesJson, 'Venue 2');
        console.log(result[0])
        expect(result[0]).toMatchObject(venue2ExpectedPerformance);

    })
})