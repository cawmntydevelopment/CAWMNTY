import React from 'react';
import {Avatar, Box, Skeleton, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";


const AVATAR = {
    width: "50px",
    height: "50px",
    bgcolor: "krmrPlate.mainBg",
    color: "krmrPlate.bottomItemColor"
}

const WALLET_TEXT = {
    ml: "10px",
    fontSize: "14px",
    color: "#898989",
    fontWeight: "700",
    fontFamily: "Karla",
}

const WALLET_BOX_DISPLAY = {
    display: "flex",
    justifyContent: "center"
}

export const LoadTrendAccoutCard = () => {
    return (
        <Box key={(Math.random() * 10000)} sx={(theme) => (
            {
                ...WALLET_BOX_DISPLAY, width: "100%",
                marginTop: "10px",
                marginBottom: "10px",
                [theme.breakpoints.down(1429)]: {
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
                <Skeleton variant={"circular"}>
                    <Avatar
                        sx={AVATAR}>CU</Avatar>
                </Skeleton>
            </Box>
            <Box display={"block"} justifyContent={"start"}>
                <Skeleton sx={{ml: 1}}>
                    <Typography sx={{
                        ...WALLET_TEXT,
                        fontSize: "17px",
                        color: "krmrPlate.connectorText"
                    }}>@cawuserame</Typography>
                </Skeleton>
                <Skeleton sx={{ml: 1}}>
                    <Typography sx={{
                        ...WALLET_TEXT
                    }}>{12345} follower</Typography>
                </Skeleton>
            </Box>
            <Box sx={(theme) => (
                {
                    ...WALLET_BOX_DISPLAY, alignItems: "center",
                    [theme.breakpoints.down(1429)]: {
                        display: "block",
                        textAlign: "center"
                    },
                }
            )}>

                <Tooltip title={"Follow"}>
                    <Skeleton sx={{ml: 1}} height={30} width={40}>
                        <Box sx={(theme) => (
                            {
                                marginLeft: 4,
                                backgroundColor: "#F9C336",
                                border: "none", p: 0.5,
                                borderRadius: "6px",
                                fontFamily: "Karla",
                                fontWeight: "bold",
                                [theme.breakpoints.down(1429)]: {
                                    marginLeft: 0,
                                },
                            }
                        )} component={"button"}> FOLLOW </Box>
                    </Skeleton>
                </Tooltip>
            </Box>
        </Box>
    );
};
