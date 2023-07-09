import React from "react";
import {HelmetProvider} from "react-helmet-async";
import GlobalDndContext from "./GlobalDndContext";
import {BrowserRouter} from "react-router-dom";
import {MstProvider, MuiProvider, Web3ServicesProvider} from "./providers";
import {Box} from "@mui/material";

interface ProvidersProps {
    children: any
}

export const AppProviders = ({children}: ProvidersProps) => {

    return (
        <MstProvider>
            <Web3ServicesProvider>
                    <HelmetProvider>
                        <GlobalDndContext>
                            <BrowserRouter>
                                {children}
                            </BrowserRouter>
                        </GlobalDndContext>
                    </HelmetProvider>
            </Web3ServicesProvider>
        </MstProvider>
    )
}
