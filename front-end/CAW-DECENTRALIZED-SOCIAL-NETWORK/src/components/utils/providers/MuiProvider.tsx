import {CssBaseline, ThemeProvider} from "@mui/material";
import React from "react";
import {theme} from "../../../styles/theme";

export function MuiProvider({children}: { children: any }) {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>
            {children}
        </ThemeProvider>
    )
}
