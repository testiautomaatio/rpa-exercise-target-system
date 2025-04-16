import { useState } from "react";
import { validateCar, type Car, type ValidatedCar } from "~/types/car";
import { AddCarForm } from "./AddCarForm";
import { Alert, Box, LinearProgress, Link, Paper, Snackbar, Stack, Typography } from "@mui/material";
import { CarTable } from "./CarTable";
import exampleCarsJson from '../../data/exampleCars.json';
import carsJson from '../../data/cars.json';
import TrophyImage from '../../trophy.png';
import Confetti from 'react-confetti';

type SnackbarMessage = {
    message: string;
    severity: "success" | "warning";
}

export function Index() {
    const [cars, setCars] = useState<ValidatedCar[]>(exampleCarsJson);
    const [snackMessage, setSnackMessage] = useState<SnackbarMessage | null>(null);

    const addCar = (submitted: Car) => {
        const { valid, errors, emojis } = validateCar(submitted);

        if (valid) {
            setSnackMessage({ severity: "success", message: "The car was added successfully" });
        } else {
            Object.values(errors).forEach((error) => console.error(error));
            setSnackMessage({ severity: "warning", message: "This car did not match the legacy system. Please check the console for details." });
        }

        setCars([...cars, { ...submitted, valid, emojis, errors: Object.values(errors) }]);
    }

    const correctPlates = carsJson.map(c => c.licensePlate);
    const validPlatesAdded = cars.filter(c => c.valid).map(c => c.licensePlate);

    const uniquePlates = correctPlates.filter(p => validPlatesAdded.includes(p));
    const progress: [number, number] = [uniquePlates.length, correctPlates.length];
    const done = correctPlates.every(p => validPlatesAdded.includes(p));

    return (
        <div>
            <h1>Car registry 2.0</h1>

            <Instructions />

            <ExerciseProgress done={done} progress={progress} />

            <Stack gap={2} my={2} alignItems={{ md: "stretch", xs: "stretch" }} justifyContent="flex-start" flexDirection={{ xs: "column", md: "row" }}>
                <Paper sx={{ p: 2, flexGrow: 0, flexShrink: 0 }} elevation={4}>
                    <AddCarForm addCar={addCar} />
                </Paper>

                <Paper sx={{ p: 2, flexGrow: 1 }} elevation={4}>
                    <CarTable cars={cars} />
                </Paper>
            </Stack>
            <Snackbar
                open={Boolean(snackMessage)}
                key={snackMessage?.message}
                autoHideDuration={6_000}
                onClose={() => setSnackMessage(null)}>
                <Alert
                    severity={snackMessage?.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackMessage?.message}
                </Alert>
            </Snackbar>
        </div>

    );
};

function Instructions() {
    return <Stack gap={2} mb={4}>
        <Typography>
            This is a simple car registry app. You can add cars to the registry by filling out the form and the table shows all the cars in the registry.
            The app stores the cars in memory, so when you refresh the page, the table will reset. There are a few cars already in the registry, which
            you do not need to worry about.
        </Typography>
        <Typography>
            Your task is to write an automation script that will read cars from a legacy registry system and add them to this app. The legacy
            system can be accessed at <Link href="https://rpa-exercise-legacy-system.pages.dev/" target="_blank">https://rpa-exercise-legacy-system.pages.dev/</Link>.
            Use screen scraping and web automation to read the data from the legacy system and add it to this app.
        </Typography>
        <Typography>
            Each car you add will be validated against the legacy system. <strong>Each field in the form needs to be filled with the exact same values as in the legacy system.</strong>
            You are also not allowed to add duplicates or modify cars that have already been added. If you need to, you can refresh the page to get a clean slate.
        </Typography>
        <Typography>
            If the data that you enter is not accepted as equal to the legacy system, there will be errors logged in the browser's console. You can check the console for errors.
            Also, remember to investigate the console in test automation traces if there are any errors.
        </Typography>
    </Stack>
}

function ExerciseProgress({ done, progress }: { done: boolean, progress: [number, number] }) {
    return <Stack gap={2} mb={4}>

        <Typography>Cars added: {progress[0]} / {progress[1]}</Typography>

        <LinearProgress variant="determinate" value={100 * progress[0] / progress[1]} sx={{ height: 10, borderRadius: 5 }} />

        {done && <Alert variant="filled" severity="success">Congratulations! You have completed the exercise!</Alert>}

        {done && <Trophy />}

        {done && <Confetti width={document.body.clientWidth} height={document.body.clientHeight} />}

    </Stack>;

}

function Trophy() {
    return <Box sx={{ maxWidth: 350 }} mx="auto">
        <img src={TrophyImage} style={{ maxWidth: "100%" }} />
    </Box>;
}