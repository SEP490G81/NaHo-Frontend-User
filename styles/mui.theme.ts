import { createTheme } from "@mui/material";

export const muiTheme = createTheme({
    colorSchemes: {
        dark: {
            palette: {
                primary: {
                    main: "#ff99ac",
                },
                error: {
                    main: "#f87171",
                    light: "#fca5a5",
                    dark: "#ef233c",
                },
                warning: {
                    main: "#fbbf24",
                    light: "#fcd34d",
                    dark: "#d97706",
                },
                divider: "#242424",
                text: {
                    primary: "#fdfffc",
                },
            },
        },
        light: {
            palette: {
                primary: {
                    main: "#ff99ac",
                },
                text: {
                    primary: "#333533",
                },
            },
        },
    },
    cssVariables: {
        colorSchemeSelector: "class",
    },
    typography: {
        fontFamily: "var(--app-font)",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: "6px",
                    height: "40px",
                    minWidth: "max-content",
                    fontWeight: 500,
                },
                contained: {
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "none",
                    },
                },
            },
        },
    },
});
