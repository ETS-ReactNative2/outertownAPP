import { getBandInfo } from '../../Modules/getBandInfo';
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

beforeAll(async () => {
    await AsyncStorage.clear();
    await AsyncStorage.setItem('@bandsData', JSON.stringify(bandsInfo));
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