import { test, describe, expect } from "vitest";
import { validateCar } from "./car";

describe("Car Validation", () => {

    const batmobile = {
        "licensePlate": "DKNT-01",
        "make": "Batmobile",
        "model": "Tumbler",
        "year": 2005,
        "mileage": 5400,
        "owner": "Bruce Wayne",
        "color": "Matte Black",
        "streetLegal": false,
    };

    test("a car with correct values should pass", () => {
        const copy = { ...batmobile };
        const { valid, errors } = validateCar(batmobile, copy);

        expect(valid).toBe(true);
        expect(errors).toEqual({});
    });

    test("each field with different values should be marked as errors", () => {
        const copy = { ...batmobile, make: "Ford", mileage: 100000, streetLegal: true, licensePlate: "abc-123" };
        const { valid, errors } = validateCar(batmobile, copy);

        expect(valid).toBe(false);

        expect(Object.keys(errors)).toHaveLength(4);
        expect(Object.keys(errors)).toContain("make");
        expect(Object.keys(errors)).toContain("mileage");
        expect(Object.keys(errors)).toContain("streetLegal");
        expect(Object.keys(errors)).toContain("licensePlate");
    });

});
