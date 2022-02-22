import haversine from "../../Modules/haversine";

const testCoords1 = {
    latitude: 52,
    longitude: -2,
}

const testCoords2 = {
    latitude: 52.001,
    longitude: -2,
}

describe("haversine function tests", () => {
    it("should return false when no arguments are passed", () => {
        expect(haversine()).toBeFalsy()
    })
    it("should return false when one argument is missing", () => {
        expect(haversine(testCoords1)).toBeFalsy()
    })
    it("should return false when argument objects do not include latitude and longitude fields", () => {
        expect(haversine({}, {})).toBeFalsy()
    })
    it("should return something", () => {
        expect(haversine(testCoords1, testCoords2)).toBeDefined()
    })
    it("should return a number", () => {
        expect(typeof(haversine(testCoords1, testCoords2))).toBe("number")
    })
    it("should return 111 metres when testCoords are passed", () => {
        expect(haversine(testCoords1, testCoords2)).toBeCloseTo(111.194);
    })
})