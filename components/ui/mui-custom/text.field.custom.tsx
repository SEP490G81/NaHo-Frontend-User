import TextField, { TextFieldProps } from "@mui/material/TextField";

export function TextFieldCustom(props: TextFieldProps) {
    const defaultInputSx = {
        borderRadius: "6px",
        fieldset: { border: "1px solid var(--color-bdc-muted)" },
        "input::placeholder": { fontSize: "15.2px" },
    };

    return (
        <TextField
            {...props}
            slotProps={{
                ...props.slotProps,
                input: {
                    ...props.slotProps?.input,
                    sx: {
                        ...defaultInputSx,
                        ...(props.slotProps?.input as any)?.sx,
                    },
                },
            }}
        />
    );
}
