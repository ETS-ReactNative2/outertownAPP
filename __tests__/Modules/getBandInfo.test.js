import { getBandInfo, getBandPerformance, getLiked } from '../../Modules/getBandInfo';
import parsePerformances from '../../Modules/parsePerformances';
import AsyncStorage from '@react-native-async-storage/async-storage';

const bandsInfo = [
    {
        Name: 'Band Name 1',
        Bio: 'Band 1 Bio',
        BandImg: 'bandImg1.jpg',
        BandLogo: 'bandLogo1.jpg',
        Spotify: 'Band1Spotify,',
        Twitter: 'Band1Twitter',
        Web: 'Band1Web',
        Location: 'Band1 Location',
        Secret: false,
        Likes: 0
    },
    {
        Name: 'Band Name 2',
        Bio: 'Band 2 Bio',
        BandImg: 'bandImg2.jpg',
        BandLogo: 'bandLogo2.jpg',
        Spotify: 'Band2Spotify,',
        Twitter: 'Band2Twitter',
        Web: 'Band2Web',
        Location: 'Band2 Location',
        Secret: false,
        Likes: 0
    },
]

const performances = [
    {
        Id: 1,
        Venue: 'Performance Venue',
        Stage: 'Performance Stage',
        Band: 'Band Name 1',
        Start: '2022-04-10 00:00:00',
        End: '2022-04-10 00:10:00',
        Note: '',
        Secret: false
    },
    {
        Id: 2,
        Venue: 'Performance Venue',
        Stage: 'Performance Stage',
        Band: 'Band Name 1',
        Start: '2022-04-10 00:00:00',
        End: '2022-04-10 00:10:00',
        Note: '',
        Secret: false
    },
    {
        Id: 3,
        Venue: 'Performance Venue',
        Stage: 'Performance Stage',
        Band: 'Band Name 2',
        Start: '2022-04-10 00:00:00',
        End: '2022-04-10 00:10:00',
        Note: '',
        Secret: false
    },
]

const likes = ['Band Name 1'];

beforeAll(async () => {
    await AsyncStorage.clear();
    await AsyncStorage.setItem('@bandsData', JSON.stringify(bandsInfo));
    await AsyncStorage.setItem('@performancesData', JSON.stringify(performances));
    await AsyncStorage.setItem('@likes', JSON.stringify(likes));
});

afterAll(async () => {
    await AsyncStorage.clear();
})

describe("getBandInfo", () => {
    test('should return false if no band name argument', async () => {
        const result = await getBandInfo();
        expect(result).toBeFalsy();
    })
    test('should return false if band does not exist', async () => {
        const result = await getBandInfo('testBand');
        expect(result).toBeFalsy();
    })
    test('should return object if correct band name', async () => {
        const result = await getBandInfo('Band Name 1');
        expect(typeof(result)).toBe('object');
    })
    test('should return object for Band Name 1 when Band Name 1 passed', async() => {
        const result = await getBandInfo('Band Name 1');
        expect(result).toMatchObject(bandsInfo[0]);
    })
    test('should return object for Band Name 2 when Band Name 2 passed', async() => {
        const result = await getBandInfo('Band Name 2');
        expect(result).toMatchObject(bandsInfo[1]);
    })
    test('should not return object for Band Name 1 when Band Name 2 passed', async() => {
        const result = await getBandInfo('Band Name 2');
        expect(result).not.toMatchObject(bandsInfo[0]);
    })
})

describe('getBandPerformance', () => {
    test('should return empty array if no band name argument', async () => {
        const result = await getBandPerformance();
        expect(result.length).toBe(0);
    })
    test('should return array if correct band name', async() => {
        const result = await getBandPerformance('Band Name 1');
        expect(Array.isArray(result)).toBe(true);
    })
    test('should return non-empty array if correct band name', async() => {
        const result = await getBandPerformance('Band Name 1');
        expect(result.length).toBeGreaterThan(0);
    })
    test('should return 2 performances for Band Name 1', async() => {
        const result = await getBandPerformance('Band Name 1');
        expect(result.length).toBe(2);
    })
    test('should return 1 performance for Band Name 2', async() => {
        const result = await getBandPerformance('Band Name 2');
        expect(result.length).toBe(1);
    })
    test('should return matching object for Band Name 2', async() => {
        const result = await getBandPerformance('Band Name 2');
        expect(result[0]).toMatchObject(parsePerformances(JSON.stringify(performances))[2]);
    })
})

describe('getLikes', () => {
    test('should return false if no band name', async () => {
        const result = await getLiked();
        expect(result).toBe(false);
    })
    test('should return true if Band Name 1 passed', async () => {
        const result = await getLiked('Band Name 1');
        expect(result).toBe(true);
    })
    test('should return false if Band Name 2 passed', async () => {
        const result = await getLiked('Band Name 2');
        expect(result).toBe(false);
    })
})