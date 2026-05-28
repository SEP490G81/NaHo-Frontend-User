import TextField, { TextFieldProps } from "@mui/material/TextField";
import { SxProps, Theme } from "@mui/material/styles";

export function TextFieldCustom({
    sx,
    slotProps,
    ...restProps
}: TextFieldProps) {
    const defaultInputSx: SxProps<Theme> = {
        borderRadius: "6px",
        fieldset: {
            border: "1px solid var(--color-bdc-muted)",
        },
        "input::placeholder": {
            fontSize: "15.2px",
        },
    };

    const defaultTextFieldSx: SxProps<Theme> = {
        ".MuiFormHelperText-root": {
            marginLeft: 0,
            marginRight: 0,
        },
    };

    const inputSlotProps = slotProps?.input;

    return (
        <TextField
            {...restProps}
            sx={[
                defaultTextFieldSx,
                ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
            ]}
            slotProps={{
                ...slotProps,
                input:
                    typeof inputSlotProps === "function"
                        ? inputSlotProps
                        : {
                              ...inputSlotProps,
                              sx: [
                                  defaultInputSx,
                                  ...(Array.isArray(inputSlotProps?.sx)
                                      ? inputSlotProps.sx
                                      : inputSlotProps?.sx
                                        ? [inputSlotProps.sx]
                                        : []),
                              ],
                          },
            }}
        />
    );
}
