import type { Car, ValidatedCar } from "~/types/car";
import { DataGrid } from '@mui/x-data-grid';
import { Stack, Typography } from "@mui/material";

const columns = [
    { field: "licensePlate", headerName: "License plate" },
    { field: "make", headerName: "Make" },
    { field: "model", headerName: "Model" },
    { field: "year", headerName: "Year" },
    { field: "mileage", headerName: "Mileage" },
    { field: "emojis", headerName: "" },
] as { field: keyof Car, headerName: string }[];


export function CarTable({ cars }: { cars: ValidatedCar[] }) {
    return <Stack gap={2} flexDirection="column">
        <Typography variant="h5">Cars</Typography>
        <DataGrid
            sx={{ flexGrow: 2 }}
            rows={cars}
            columns={columns}
            getRowId={car => car.id ?? car.licensePlate}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 10,
                    },
                },
            }}
        />
    </Stack>;
}
