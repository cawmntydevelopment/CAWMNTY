import React from 'react';
import {Avatar, Box} from "@mui/material";
import Typography from "@mui/material/Typography";

const BOX = {
    marginTop: "13px"
}

const AVATAR = {
    width: "55px",
    height: "55px",
    border: "3px solid #F9C336"
}

const AVATAR_POST = {
    position: "relative",
    width: "55px",
    height: "55px",
}

const ICON = {
    position: "absolute",
    bottom: "0",
    right: "0",
    width: "25px",
    height: "25px",
    background: "#F9C336",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "6px",
    "i": {
        fontSize: "15px",
        color:"#14213D"
    }
}

const INFO_BOX = {
    height: "55px",
    display: "grid",
    alignItems: "center",
    marginLeft: "14px"
}

const TITLE = {
    fontSize: "16px",
    fontWeight: "bold",
    fontFamily: "Karla"
}

const DESC = {
    fontFamily: "Karla",
    fontSize: "16px",
    marginTop: "-8px"
}


export const NotificationCard = ({ type, username, userImage}: {type: string, username: string, userImage:any }) => {

    const selected = () => {
        if (type === "like") {
            return {
                title: "Liked your CAW!",
                description: "User " + username + " liked your CAW!",
                icon: "fa-solid fa-heart"
            }
        }

        if (type === "recaw") {
            return {

                title: "ReCAWed your post!",
                description: "User " + username + " reCAWed your post!",
                icon: "fa-solid fa-retweet"
            }
        }

        if (type === "comment") {
            return {

                title: "Commented your CAW!",
                description: "User " + username + " commented your CAW!",
                icon: "fa-solid fa-comment"
            }
        }

        if (type === "follow") {
            return {
                title: "Followed you!",
                description: "User " + username + " followed you!",
                icon: "fa-solid fa-user-plus"
            }
        }

        return {
            title: "",
            description: "",
            icon: ""
        }
    }


    return (
        <Box display={"flex"} sx={BOX}>
            <Box sx={AVATAR_POST}>
                <Box component={"img"} src={userImage} sx={{...AVATAR, borderRadius:"100px"}}/>
                <Box sx={ICON}>
                    <i className={selected().icon}></i>
                </Box>
            </Box>
            <Box sx={INFO_BOX}>
                <Typography sx={{...TITLE, color: "#F9C336"}}>{selected().title}</Typography>
                <Typography sx={{...DESC, color: "#707070"}}>{selected().description}</Typography>
            </Box>
        </Box>
    );
};
