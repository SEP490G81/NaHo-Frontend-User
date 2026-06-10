import TextField, { TextFieldProps } from "@mui/material/TextField";
import { SxProps, Theme } from "@mui/material/styles";

export function TextFieldCustom({
    sx,
    slotProps,
    ...restProps
}: TextFieldProps) {
    const isFilled = restProps.variant === "filled";

    const defaultInputSx: SxProps<Theme> = isFilled
        ? {
              borderRadius: "6px",
              backgroundColor: "var(--color-bgc-modal)",
              border: "1px solid transparent",
              outline: "none",
              "&::before": {
                  borderBottom: "none !important",
              },
              "&::after": {
                  borderBottom: "none !important",
              },
              "&:hover": {
                  backgroundColor: "var(--color-bgc-modal)",
                  borderColor: "var(--color-bdc-muted)",
              },
              "&.Mui-focused": {
                  backgroundColor: "var(--color-bgc-modal)",
                  borderColor: "var(--color-bdc-muted)",
              },
              "& .MuiInputBase-input": {
                  paddingTop: "8px",
                  paddingBottom: "8px",
              },
              "& .MuiInputAdornment-root": {
                  marginTop: "0 !important",
                  marginBottom: "0 !important",
              },
              "input::placeholder": {
                  fontSize: "15.2px",
              },
          }
        : {
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
