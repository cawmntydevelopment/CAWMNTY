import React, {useEffect, useState} from 'react';
import {Avatar, Box, IconButton, Skeleton, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import {custom_5, TAGS} from "../../../config/customData";
import {LoadTrendCard} from "../Loader/LoadTrendCard";

const BOX = {
    width: "100%",
    background: "rgba(217, 217, 217, 0.17)",
    height: "auto",
    borderRadius: "29px",
    fontFamily: "Karla !important"
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

const CARD = {
    marginTop:"10px",
    marginBottom: "10px",
    fontSize: "18px",
    cursor:"pointer",
    position:"relative"
}


export const TrendCard = ({data}: { data: any }) => {

    return (
        <Box sx={BOX}>
            <Box sx={BOX_HEAD}>
                <i style={{fontSize: "23px", marginRight: "8px"}} className="fa-solid fa-hashtag"></i> Trends
            </Box>
            
            <Box sx={CONTENT}>
                {
                    data ?
                        data.map((item: any, count: number) => {
                            return (
                                <Box key={count ?? (Math.random() * 10000)}
                                     sx={CARD}
                                     display={"block"}>
                                    <Box sx={{justifyContent: "start", fontWeight: "bold"}}>{item.tags}</Box>
                                    <Box sx={{justifyContent: "start",}}>{item.category}</Box>
                                    <Box sx={{justifyContent: "start", fontWeight: "bold", position:"absolute", left:"100%", top:"50%", transform:"translate(-100%,-50%)"}}>{item.count}</Box>
                                </Box>
                            )
                        })
                        :
                        custom_5.map(() => <LoadTrendCard/>)
                }
            </Box>
        </Box>
    );
};
