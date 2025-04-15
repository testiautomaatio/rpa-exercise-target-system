import { z } from "zod";

export const carSchema = z.object({
    licensePlate: z.string().nonempty(),
    make: z.string().nonempty(),
    model: z.string().nonempty(),
    year: z.coerce.number().int().gte(1886),
    mileage: z.coerce.number().int().min(0),
    owner: z.string().nonempty(),
    color: z.string(),
    streetLegal: z.boolean(),
});

export type Car = z.infer<typeof carSchema>;

export const emptyCar: Car = {
    licensePlate: "",
    make: "",
    model: "",
    year: new Date().getFullYear(),
    mileage: 0,
    owner: "",
    color: "",
    streetLegal: false,
} as const;

export type ValidatedCar = Car & { errors?: string[] };

const checkFields: Array<keyof Car> = ["licensePlate", "make", "model", "year", "mileage", "owner", "color", "streetLegal"] as const;


/**
 * Checks if the car object is valid by comparing it to the given correct car object.
 */
export function validateCar(correct: Car | undefined, test: Car): { valid: boolean, errors: Record<string, string> } {
    if (!correct) {
        return { valid: false, errors: { licensePlate: "Car not found", } }
    }

    const errors: Record<string, string> = {};
    checkFields.forEach(k => {
        const key = k as keyof Car;
        const expected = correct[key];
        const actual = test[key];

        if (expected !== actual) {
            errors[key] = `"${key}" should have value "${expected}" but it was "${actual}"`;
        }
    });

    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
}

