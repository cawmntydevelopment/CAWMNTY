import React from "react";
import {Paper} from "@mui/material";

export function Card({children}: { children: JSX.Element | JSX.Element[] }) {
    return (
        <Paper
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '20rem',
                padding: '1rem',
                margin: '1rem',
                overflow: 'auto',
            }}
            elevation={8}
        >
            {children}
        </Paper>
    )
}
