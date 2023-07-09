import {Breakpoint, Container, Grid} from "@mui/material";
import React from "react";
import {SxProp} from "../styles/theme";

const FULL_HEIGHT = {
    height: "100%",
}

const FULL_WIDTH = {
    maxWidth: "100% !important",
    width: "100%"
}

const ROOT = {
    zIndex: -10,
    paddingTop: "64px",
    ...FULL_HEIGHT
}

function MainLayout({sx = {}, fixed = true, maxWidth = undefined, fullWidth = false, disableGutters = false, children, ...props}: {
    sx?: SxProp | any,
    fixed?: boolean,
    maxWidth?: false | Breakpoint | undefined,
    fullWidth?: boolean,
    disableGutters?: boolean,
    children?: React.ReactNode,
    [key: string]: any
}) {
    return (
        <Container
            sx={[
                ROOT,
                fullWidth && FULL_WIDTH,
                sx
            ]}
            disableGutters={disableGutters}
            fixed={fixed} maxWidth={maxWidth} {...props}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={FULL_HEIGHT}
            >
                {children}
            </Grid>
        </Container>
    );
}

export default MainLayout;
