import { getLocation } from "../../Modules/getLocation";

describe ('getLocation - can only test for false', () => {
    test('should return false when not run on a device', async() => {
        const result = await getLocation();
        expect(result).toBe(false);
    })
})