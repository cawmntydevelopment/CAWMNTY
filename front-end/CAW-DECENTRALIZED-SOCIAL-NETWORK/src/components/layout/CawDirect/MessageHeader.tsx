import React, {useEffect, useState} from 'react';
import {Avatar, Box, IconButton} from "@mui/material";
import {shuffleColor} from "../../../services/functions";
import {Link} from "react-router-dom";
import {useBalance} from "wagmi";
import {load} from "../../../utils/storage";

const random = shuffleColor;

const AVATAR = {
    background: random,
    width: "40px",
    height: "40px",
}

const INPUT = {
    width: "100%",
    height: "35px",
    backgroundColor: "krmrPlate.msgSearchBg",
    border: "none",
    borderRadius: "7px",
    pr: "10px",
    pl: "35px",
    fontSize: "17px",
    fontFamily: "Karla",
    "::placeholder ": {
        color: "krmrPlate.mainTextColor"
    }
}

const SEARCH_ICON = {
    left: "10px",
    color: "krmrPlate.mainTextColor"
}


export const MessageHeader = () => {

    const [profileHash, setProfileHash] = useState("");


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
        <Box sx={{mb: "21px"}} display={"flex"}>
            <Box display={"flex"} justifyContent={"start"} sx={{width: "12%"}}>
                {
                    decodeProfile() ?
                        <Box sx={{...AVATAR, borderRadius:"100px"}} component={"img"} src={decodeProfile()?.image.replaceAll("ipfs://","https://ipfs.io/ipfs/")}/>
                        :
                        <Avatar sx={AVATAR}>0x</Avatar>
                }
            </Box>
            <Box position={"relative"} display={"flex"} justifyContent={"center"} alignItems={"center"}
                 sx={{width: "76%"}}>
                <Box component={"input"} placeholder={"Search"} sx={INPUT}/>
                <Box component={"i"} className={"fa-solid fa-magnifying-glass"} sx={SEARCH_ICON} position={"absolute"}/>
            </Box>
            <Box display={"flex"} justifyContent={"end"} sx={{width: "12%"}}>
                <Link to={"/settings/settings-7"}>
                    <IconButton color="inherit">
                        <Box component={"i"} sx={{color: "krmrPlate.mainTextColor"}} className="fa-solid fa-gear"></Box>
                    </IconButton>
                </Link>
            </Box>
        </Box>
    );
};
