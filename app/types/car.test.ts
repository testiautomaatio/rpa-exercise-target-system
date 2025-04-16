import { test, describe, expect } from "vitest";
import { validateCar } from "./car";
import carJson from "../../data/cars.json";

describe("Car Validation", () => {

    const testCar = carJson.at(0)!;

    test("a car with correct values should pass", () => {
        const copy = { ...testCar };
        const { valid, errors } = validateCar(copy);

        expect(valid).toBe(true);
        expect(errors).toEqual({});
    });

    test("unknown license plate should be marked as the only error", () => {
        const copy = { ...testCar, make: "Ford", mileage: 100000, streetLegal: true, licensePlate: "UNKNOWN" };
        const { valid, errors } = validateCar(copy);

        expect(valid).toBe(false);

        expect(Object.keys(errors)).toEqual(["licensePlate"]);
    });

    test("each field with different values should be marked as errors", () => {
        const copy = { ...testCar, make: "Ford", mileage: 100000, streetLegal: true };
        const { valid, errors } = validateCar(copy);

        expect(valid).toBe(false);

        expect(Object.keys(errors)).toHaveLength(3);
        expect(Object.keys(errors)).toContain("make");
        expect(Object.keys(errors)).toContain("mileage");
        expect(Object.keys(errors)).toContain("streetLegal");
    });

});
