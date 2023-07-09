import React from 'react';
import {Avatar, Box, IconButton, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import {avatar, shuffleColor} from "../../../services/functions";

const BOX = {
    marginLeft: "10px",
    display:"grid",
    alignItems:"center"
}

const USERNAME = {
    fontSize:"16px",
    fontWeight:"bold"
}

const DESC = {
    fontSize:"14px",
    color:"#898989",
    fontWeight: "bold",
}
export const AccountBox = ({username,count,bg} : {username:string,count:number, bg:string}) => {

    const userAvatar = avatar(username);


    return (
        <Box sx={{width: "300px"}} display={"flex"} alignItems={"center"}>
            <Avatar sx={{background:bg, color:"white"}}>{userAvatar}</Avatar>
            <Box sx={BOX}>
                <Typography sx={USERNAME}>@{username}</Typography>
                <Typography sx={DESC}>{count} followers</Typography>
            </Box>
        </Box>
    );
};
