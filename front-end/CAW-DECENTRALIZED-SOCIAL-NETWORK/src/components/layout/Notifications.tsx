import React from 'react';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {NotificationCard} from "./Notifications/NotificationCard";
import {COMMENT} from "../../config/customData";

const TITLE = {
    fontSize: "25px",
    fontFamily: "Karla",
    fontWeight: "bold",
    color: "#F9C336",
}

export const Notifications = () => {
    return (
        <Box>

            <Typography sx={(theme) => (
                {
                    ...TITLE,
                    [theme.breakpoints.down('md')]: {
                        display: "none",
                    },
                }
            )} >Notifications</Typography>
            <Box sx={{mt: "0px"}}>
                {COMMENT.map((comment) => {
                    return <NotificationCard userImage={comment.userImage} username={comment.username} type={comment.type}/>
                })}
            </Box>
        </Box>
    );
};

