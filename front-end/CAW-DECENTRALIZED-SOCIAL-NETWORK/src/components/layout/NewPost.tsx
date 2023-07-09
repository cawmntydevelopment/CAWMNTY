import React, {useEffect, useState} from 'react';
import {Avatar, Box, Grid, IconButton, LinearProgress, linearProgressClasses} from "@mui/material";
import Typography from "@mui/material/Typography";
import {BigNumber} from "ethers";
import {usePrepareSendTransaction, useSendTransaction} from "wagmi";
import {load} from "../../utils/storage";

const BOX = {
    width: "100%",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.12)",
    borderRadius: "14px",
    marginTop: "21px",
    paddingTop: "12px",
    px: 1.5,
    backgroundColor: "krmrPlate.newPostContainer",
}

const AVATAR = {
    width: "40px",
    height: "40px",
}

const INPUT = {
    width: "100%",
    height: "100px",
    border: "none",
    fontFamily: "Karla",
    fontSize: "18px",
    fontWeight: "bold",
    backgroundColor: "krmrPlate.newPostContainer",
    maxWidth: "100%",
    minWidth: "100%",
    "&:focus-visible": {
        "outline": "-webkit-focus-ring-color auto 0px"
    },
    maxHeight: "300px",
    minHeight: "100px"
}

const ICON = {
    fontSize: "18px",
    color: "krmrPlate.mainTextColor"
}

const BUTTON = {
    background: "#F9C336",
    px: 4,
    display: "flex",
    alignItems: "center",
    borderRadius: "100px",
    fontFamily: "Karla",
    border: "none",
    color: "#14213D"
}

const MESSAGE_LENGHT = {
    mr: 1.5,
    fontSize: "15px",
    fontFamily: "Karla"
}

export const NewPost = ({notImage}: { notImage?: boolean }) => {
    const widthDiv = notImage ? {width: "100%"} : {width: "90%"};


    const [message, sendMessage] = useState("")
    const [profileHash, setProfileHash] = useState("");


    const handleChangeInput = (event: any) => {
        if (event.target.value.length <= 420) {
            sendMessage(event.target.value)
        }
    }

    const decodeProfile = () => {
        if (profileHash?.length > 0) {
            return JSON.parse(atob(profileHash))
        }
    }

    useEffect(() => {
        setInterval(() => {
            if (profileHash !== load("access_token")) {
                setProfileHash(load("access_token"))
            }
        }, 900)
    }, [])

    return (
        <Box sx={BOX}>
            <Box display={"flex"} sx={{width: "100%"}}>
                {
                    notImage ?? (
                        decodeProfile() ?
                            <Box display={"flex"} justifyContent={"center"} sx={{width: "10%"}}>
                                <Box
                                    sx={{...AVATAR, borderRadius: "100px"}} component={"img"}
                                    src={decodeProfile()?.image.replaceAll("ipfs://", "https://ipfs.io/ipfs/")}/>
                            </Box>
                            :
                            <Box display={"flex"} justifyContent={"center"} sx={{width: "10%"}}><Avatar>OP</Avatar></Box>
                    )
                }

                <Box sx={{...widthDiv, pr: 2}}>
                    <Box sx={INPUT} value={message} onChange={handleChangeInput}
                         placeholder={"How's your day going?"} component={"textarea"}/>
                    <Box sx={{marginBottom: "10px"}} display={"flex"}>
                        <Box sx={{overflow: "auto", whiteSpace: "nowrap", width: "50%"}}>
                            <IconButton color="inherit">
                                <Box component={"i"} sx={ICON} className="fa-solid fa-image"></Box>
                            </IconButton>
                            <IconButton color="inherit">
                                <Box component={"i"} sx={ICON} className="fa-solid fa-face-smile"></Box>
                            </IconButton>
                            {/*<IconButton color="inherit">*/}
                            {/*    <Box component={"i"} sx={ICON} className="fa-solid fa-user-tag"></Box>*/}
                            {/*</IconButton>*/}
                            {/*<IconButton color="inherit">*/}
                            {/*    <Box component={"i"} sx={ICON} className="fa-solid fa-hashtag"></Box>*/}
                            {/*</IconButton>*/}
                            <IconButton color="inherit">
                                <Box component={"i"} sx={ICON} className="fa-solid fa-bold"></Box>
                            </IconButton>
                            <IconButton color="inherit">
                                <Box component={"i"} sx={ICON} className="fa-solid fa-italic"></Box>
                            </IconButton>
                        </Box>
                        <Box sx={{width: "50%"}} display={"flex"} justifyContent={"end"}
                             alignItems={"center"}>
                            <Typography sx={MESSAGE_LENGHT}><span
                                style={{fontWeight: "bold"}}>{message?.length}</span>/420</Typography>
                            <Box sx={BUTTON} component={"button"}>
                                <i style={{...ICON, fontSize: "16px"}}
                                   className="fa-solid fa-paper-plane"></i>
                                <Typography sx={{
                                    fontSize: "18px",
                                    marginLeft: "10px",
                                    fontFamily: "Karla",
                                    fontWeight: "bold"
                                }}>CAW</Typography>
                            </Box>
                        </Box>
                    </Box>

                </Box>
            </Box>


        </Box>
    );
};

