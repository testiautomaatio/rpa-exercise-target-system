import { useForm, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carSchema, emptyCar, type Car } from "~/types/car";
import { Button, ButtonGroup, Checkbox, FormControlLabel, Stack, TextField, Typography } from "@mui/material";


type AddCarFormProps = {
    addCar: (car: Car) => void,
}
export function AddCarForm({ addCar }: AddCarFormProps) {

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<Car>({
        resolver: zodResolver(carSchema),
        defaultValues: emptyCar,
    });

    const streetLegal = watch("streetLegal");

    const onSubmit = (data: Car) => {
        addCar(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" spacing={2} mb={2}>
                <Typography variant="h5">Add a new car</Typography>

                <Input label="License plate" attr="licensePlate" register={register} errors={errors} />

                <Input label="Make" attr="make" register={register} errors={errors} />

                <Input label="Model" attr="model" register={register} errors={errors} />

                <Input label="Year" attr="year" register={register} errors={errors} />

                <Input label="Mileage" attr="mileage" register={register} errors={errors} />

                <Input label="Owner name" attr="owner" register={register} errors={errors} />

                <Input label="Color" attr="color" register={register} errors={errors} />

                <FormControlLabel
                    control={
                        <Checkbox
                            id="streetLegal"
                            checked={streetLegal}
                            onChange={(e) => setValue("streetLegal", e.target.checked)}
                        />
                    }
                    label="Street Legal"
                />

                <ButtonGroup fullWidth>
                    <Button type="submit" variant="contained" color="success">💾 Save</Button>
                </ButtonGroup>
            </Stack>
        </form>
    );
};

type InputProps = {
    attr: keyof Car,
    label: string,
    register: UseFormRegister<Car>,
    errors: FieldErrors<Car>,
}
function Input({ attr: attr, label, register, errors }: InputProps) {
    return <>
        <TextField
            label={label}
            variant="outlined"
            {...register(attr)}
            aria-invalid={errors[attr] ? "true" : "false"}
            error={Boolean(errors[attr])}
            helperText={errors[attr]?.message}
        />
    </>

}