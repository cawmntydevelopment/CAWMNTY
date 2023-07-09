import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, IconButton, Modal, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useAccount, useBalance, useDisconnect} from "wagmi";
import {MintUsernameModal} from "../MintUsernameModal";
import {humanReadableAmount} from "../../../services/web3";
import {load} from "../../../utils/storage";


const AVATAR = {
    width: "40px",
    height: "40px",
    bgcolor: "black"
}

const WALLET_TEXT = {
    ml: "10px",
    fontSize: "15px",
    fontWeight: "700",
    fontFamily: "Karla",
}

const ICON_BUTTON = {
    width: "40px",
    height: "40px",
}

const WALLET_BOX_DISPLAY = {
    display: "flex",
    justifyContent: "center"
}

export const WalletConnectorBox = ({plate, account, handleOpen}: { plate: any, account?: string, handleOpen: any }) => {

    // WAGMI
    const {disconnect} = useDisconnect()
    const [profileHash, setProfileHash] = useState("");
    const addressSubstr = account?.substring(0, 5) + "..." + account?.substring((account?.length - 5), account?.length);
    const addressAvatar = account?.substring((account?.length - 4), account?.length);



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
        <>

            <Box sx={(theme) => (
                {
                    ...WALLET_BOX_DISPLAY, width: "100%",
                    [theme.breakpoints.down(1220)]: {
                        display: "block",
                        textAlign: "center"
                    },
                }
            )}>
                <Box sx={(theme) => (
                    {
                        textAlign: "-webkit-center",
                        [theme.breakpoints.down('md')]: {
                            textAlign: "-webkit-center",
                            marginBottom: "230px"
                        },
                    }
                )}>
                    {
                    profileHash?.length > 0 ?
                        <Box sx={{...AVATAR, borderRadius:"100px"}} component={"img"} src={decodeProfile()?.image.replaceAll("ipfs://","https://ipfs.io/ipfs/")}/>
                        :
                        <Avatar sx={AVATAR}>{addressAvatar}</Avatar>
                    }
                </Box>
                <Box display={"block"} justifyContent={"start"}>
                    <Typography sx={{
                        ...WALLET_TEXT,
                        color: plate.connectorText
                    }}>{addressSubstr}</Typography>
                    {
                        profileHash?.length > 0 ?
                            <Typography sx={{
                                ...WALLET_TEXT,
                                color: plate.connectorText
                            }}>@{decodeProfile()?.name}</Typography>
                            :
                            <Typography sx={{
                                ...WALLET_TEXT,
                                color: plate.connectorText,
                            }}>NOT SELECTED</Typography>
                    }

                </Box>
            </Box>
            <Box sx={(theme) => (
                {
                    ...WALLET_BOX_DISPLAY, alignItems: "center",
                    [theme.breakpoints.down(1220)]: {
                        display: "block",
                        textAlign: "center"
                    },
                }
            )}>
                <Tooltip title={"ADD USER"}>
                    <IconButton onClick={handleOpen} sx={{...ICON_BUTTON, marginLeft: "15px"}}>
                        <i style={{fontSize: "20px", color: plate.connectorText}} className="fa-solid fa-plus"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"DISCONNECT"}>
                    <IconButton onClick={() => disconnect()} sx={ICON_BUTTON}>
                        <i style={{fontSize: "20px", color: plate.connectorText}}
                           className="fa-solid fa-arrow-right-from-bracket"></i>
                    </IconButton>
                </Tooltip>
            </Box>
        </>
    );
};
