"use client";
import { muiTheme } from "@/styles/mui.theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider
            theme={muiTheme}
            defaultMode="light"
            disableTransitionOnChange
        >
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default AppThemeProvider;
