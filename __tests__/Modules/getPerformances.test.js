import { getPerformances } from "../../Modules/getPerformances";
import parsePerformances from "../../Modules/parsePerformances";
import AsyncStorage from "@react-native-async-storage/async-storage";

const performances = [
    {
        Id: 1,
        Venue: 'Performance Venue 1',
        Stage: 'Performance Stage 1',
        Band: 'Band Name 1',
        Start: '2022-04-10 00:00:00',
        End: '2022-04-10 00:10:00',
        Note: '',
        Secret: false
    },
    {
        Id: 2,
        Venue: 'Performance Venue 1',
        Stage: 'Performance Stage 2',
        Band: 'Band Name 2',
        Start: '2022-04-10 00:00:00',
        End: '2022-04-10 00:10:00',
        Note: '',
        Secret: false
    },
    {
        Id: 3,
        Venue: 'Performance Venue 2',
        Stage: 'Performance Stage 1',
        Band: 'Band Name 3',
        Start: '2022-04-10 00:00:00',
        End: '2022-04-10 00:10:00',
        Note: '',
        Secret: false
    },
]

let result;

beforeAll(async () => {
    await AsyncStorage.clear();
    await AsyncStorage.setItem('@performancesData', JSON.stringify(performances));
});

afterAll(async () => {
    await AsyncStorage.clear();
});

describe("getPerformances", () => {
    test('should return something', async () => {
        const result = await getPerformances();
        expect(result).not.toBeNull();
    })
    test('should return an array', async () => {
        const result = await getPerformances();
        expect(Array.isArray(result)).toBe(true);
    })
    test('should return array of length 3 when no arguments passed', async () =>{
        const result = await getPerformances();
        expect(result.length).toEqual(3);
    })
    test('should return array of length 2 when Performance Venue 1 is passed as argument', async () => {
        const result = await getPerformances('Performance Venue 1');
        expect(result.length).toEqual(2);
    })
    test('should return array of length 1 when Performance Venue 2 is passed as argument', async () => {
        const result = await getPerformances('Performance Venue 2');
        expect(result.length).toEqual(1);
    })
    test('should return correct object when Performance Venue 2 is passed as argument', async () => {
        const result = await getPerformances('Performance Venue 2');
        const parsedSource = parsePerformances(JSON.stringify(performances), 'Performance Venue 2');
        expect (result[0]).toMatchObject(parsedSource[0]);
    })
})