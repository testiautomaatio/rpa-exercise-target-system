import type { Car, ValidatedCar } from "~/types/car";
import { DataGrid, type GridRenderCellParams } from '@mui/x-data-grid';

const columns = [
    { field: "licensePlate", headerName: "License plate" },
    { field: "make", headerName: "Make" },
    { field: "model", headerName: "Model" },
    {
        field: "errors",
        headerName: "Errors",
        renderCell: (params: GridRenderCellParams<any, Record<string, string>>) => {
            const errors = params.value;
            if (errors && Object.values(errors).length > 0) {
                return `${Object.values(errors).length} errors`;
            }
            return "valid"
        },
    },

] as { field: keyof Car, headerName: string }[];


export function CarTable({ cars }: { cars: ValidatedCar[] }) {
    return <DataGrid
        sx={{ flexGrow: 2 }}
        rows={cars}
        columns={columns}
        checkboxSelection
        getRowId={car => car.licensePlate}
        initialState={{
            pagination: {
                paginationModel: {
                    pageSize: 10,
                },
            },
        }}
    />;
}
