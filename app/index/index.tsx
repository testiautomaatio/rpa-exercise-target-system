import { useState } from "react";
import { validateCar, type Car, type ValidatedCar } from "~/types/car";
import { AddCarForm } from "./AddCarForm";
import { Paper, Stack } from "@mui/material";
import carsJson from '../../data/cars.json';
import { CarTable } from "./CarTable";


export function Index() {
    const [cars, setCars] = useState<ValidatedCar[]>(carsJson);

    function addCar(submitted: Car) {
        const found = carsJson.find(c => c.licensePlate.toLowerCase() === submitted.licensePlate.toLowerCase());
        const { valid, errors } = validateCar(found, submitted);

        console.error(errors);
        setCars((prev) => [...prev, { ...submitted, errors: Object.values(errors) }]);

        // TODO: display a message if the car was successfully added or if there were errors
    }

    return (
        <div>
            <h1>Car registry 2.0</h1>
            <Stack gap={2} my={2} alignItems={{ md: "flex-start", xs: "stretch" }} flexDirection={{ xs: "column", md: "row" }}>
                <Paper sx={{ p: 2, flexGrow: 1 }}>
                    <AddCarForm addCar={addCar} />
                </Paper>


                <CarTable cars={cars} />
            </Stack>
        </div>
    );
};
