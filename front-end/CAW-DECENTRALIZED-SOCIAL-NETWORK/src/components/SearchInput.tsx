import React from 'react';
import {Box} from "@mui/material";

const SEARCH_INPUT = {
    width: "100%",
    background: "rgba(217, 217, 217, 0.34)",
    border: "none",
    height: '42px',
    borderRadius: '8px',
    fontSize: "17px",
    paddingLeft: '56px',
    fontFamily: 'Karla !important',
}

const SEARCH_INPUT_ICON = {
    position: "absolute",
    fontSize: "18px",
    marginTop: "12px",
    marginLeft: "17px"
}

export const SearchInput = ({plate, location}: { plate?: any, location: "header" | "drawer" }) => {

    if (location === "header") {
        return (
            <Box sx={(theme) => ({[theme.breakpoints.down('md')]: {display: "none"}})}>
                <Box component={"i"} sx={{...SEARCH_INPUT_ICON, color: "krmrPlate.mainTextColor"}}
                     className="fa-solid fa-magnifying-glass"></Box>
                <Box component={"input"} placeholder={"Search CAW"} sx={
                    {
                        ...SEARCH_INPUT,
                        "::placeholder ": {
                            color: "krmrPlate.placeholder",
                            opacity: 1,
                        }
                    }}/>
            </Box>
        );
    }

    if(location === "drawer") {
        return (
            <Box>
                <Box component={"i"} sx={{...SEARCH_INPUT_ICON, color: "krmrPlate.mainTextColor"}}
                     className="fa-solid fa-magnifying-glass"></Box>
                <Box component={"input"} placeholder={"Search CAW"} sx={
                    {
                        ...SEARCH_INPUT,
                        "::placeholder ": {
                            color: "krmrPlate.placeholder",
                            opacity: 1,
                        }
                    }}/>
            </Box>
        )
    }

    return (<></>)

};
