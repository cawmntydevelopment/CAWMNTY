import React from 'react';
import {Box} from "@mui/material";
import {randomNumber} from "../../../../services/functions";

const BOX = {
    width: "100%",
    display: "flex",
    justifyContent: "end",
    mt:"10px"
}

const MESSAGE_BOX = {
    width: "auto",
    backgroundColor:"#EBEBEB",
    px:"18px",
    py:"11px",
    mr:"20px",
    ml:"50px",
    borderRadius: "11px 0px 11px 11px",
    color:"black"
}

export const Me = ({message}: { message: string }) => {
    return (
        <Box key={"message-" + randomNumber} sx={BOX}>
            <Box sx={MESSAGE_BOX}>
                {message}
            </Box>
        </Box>
    );
};
