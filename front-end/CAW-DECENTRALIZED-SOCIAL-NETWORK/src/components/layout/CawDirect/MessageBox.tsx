import React from 'react';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {messageSubstr, randomNumber} from "../../../services/functions";

const USER_IMAGE = {
    width: "50px",
    borderRadius: "100px",
}

const USERNAME = {
    fontSize: "16px",
    fontWeight: "bold",
    color:"krmrPlate.mainTextColor"
}

const MESSAGE = {
    fontSize: "16px",
    color: "#979797"
}

export const MessageBox = ({
                               view,
                               username,
                               image,
                               message,
                               id,
                               setActive
                           }: { view: string, username: string, image: string, message: string, id: string, setActive: any }) => {

    const view_type = () => {
        if (view === "view") return "fa-solid fa-check-double";
        if (view === "mynotview") return "fa-solid fa-check-circle";

        return ""
    }

    return (
        <Box key={"chat-" + randomNumber} onClick={() => setActive(id)} sx={{cursor: "pointer", mb: 2}} display={"flex"}>
            <Box display={"flex"} alignItems={"center"} sx={{mr: "10px"}}>
                <Box sx={USER_IMAGE} component={"img"} src={image}/>
            </Box>
            <Box>
                <Box display={"flex"} alignItems={"center"}>
                    <Typography sx={USERNAME}>@{username}</Typography>
                    <Box sx={{ml:"5px", fontSize:"13px", color:"#F9C336"}} component={"i"} className={view_type()}></Box>
                </Box>
                <Typography sx={MESSAGE}>
                    {messageSubstr(message)}
                </Typography>
            </Box>
        </Box>
    );
};
