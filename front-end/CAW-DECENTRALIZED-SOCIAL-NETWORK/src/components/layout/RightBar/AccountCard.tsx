import React from 'react';
import {Avatar, Box, IconButton, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ACCOUNT, custom_3} from "../../../config/customData";
import {LoadTrendAccoutCard} from "../Loader/LoadTrendAccoutCard";


const BOX = {
    width: "100%",
    background: "rgba(217, 217, 217, 0.17)",
    height: "auto",
    borderRadius: "29px",
    fontFamily: "Karla !important",
    marginTop: "20px"
}

const BOX_HEAD = {
    fontSize: "21px",
    borderRadius: "29px 29px 0px 0px",
    background: "#F9C336",
    color: "#14213D",
    pt: "13px",
    pb: "13px",
    fontWeight: "bold",
    pl: "21px",
    display: "flex",
    alignItems: "center",
    overflow: "auto",
    whiteSpace: "nowrap"
}

const CONTENT = {
    p: "14px"
}


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

export const AccountCard = ({data}: { data: any }) => {

    return (
        <Box sx={BOX}>
            <Box sx={BOX_HEAD}>
                <i style={{fontSize: "23px", marginRight: "8px"}} className="fa-solid fa-user"></i> Who to follow
            </Box>

            <Box sx={CONTENT}>
                {
                    data ?
                        data.map((item:any, count:number) => {
                            return (
                                <Box key={count ?? (Math.random() * 10000)} sx={(theme) => (
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
                                        <Box component={"img"} sx={{...AVATAR,borderRadius:"100px"}} src={item?.image}/>
                                    </Box>
                                    <Box display={"block"} justifyContent={"start"}>
                                        <Typography sx={{
                                            ...WALLET_TEXT,
                                            fontSize: "17px",
                                            color: "krmrPlate.connectorText"
                                        }}>@{item.username}</Typography>
                                        <Typography sx={{
                                            ...WALLET_TEXT
                                        }}>{item.count} follower</Typography>
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
                                        </Tooltip>
                                    </Box>
                                </Box>
                            )
                        })
                        :
                        custom_3.map(() => <LoadTrendAccoutCard/>)
                }
            </Box>

        </Box>
    );
};
