import React from 'react';
import {Box} from "@mui/material";
import {randomNumber} from "../../../../services/functions";

const BOX = {
    width: "100%",
    display: "flex",
    justifyContent: "start",
    mt:"10px"
}

const MESSAGE_BOX = {
    width: "auto",
    backgroundColor:"#F9C336",
    px:"18px",
    py:"11px",
    ml:"20px",
    mr:"40px",
    borderRadius: " 0px 11px 11px 11px",
    color:"black"
}

export const You = ({message}: { message: string }) => {
    return (
        <Box key={"message-" + randomNumber} sx={BOX}>
            <Box sx={MESSAGE_BOX}>
                {message}
            </Box>
        </Box>
    );
};
