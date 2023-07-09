import React from 'react';
import {Box, Grid, Typography} from "@mui/material";


const CARD_MODEL_1 = {
    background: "url(/assets/img/bg.png), linear-gradient(255.21deg, #2A3B5F -19.55%, #7D809E 45.95%, #F9C336 90.73%)",
    width: "100%",
    height: "150px",
    borderRadius: "18px",
    display: "grid",
    justifyContent: "start",
    alignItems: "center",
    textAlign: "start",
    backgroundSize:"cover",
    px:"25px"
}

const ICON = {
    fontSize: "22px"
}

const TEXT = {
    fontFamily: "Karla",
    color:"#14213D",
    textShadow: "1px 0 #fff, -1px 0 #fff, 0 1px #fff, 0 -1px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff"
}

export const StatisticsCardTwo = ({title, count,col}: {title: string, count: number, col:number }) => {

    return (
        <Grid sx={{p: 2}} display={"flex"} justifyContent={"start"} item lg={col} md={col} sm={12} xs={12}>
            <Box sx={CARD_MODEL_1}>
                <Box>
                    <Typography sx={{...TEXT, fontWeight: "900", fontSize:"18px"}}>{title}</Typography>
                    <Typography sx={{...TEXT, fontSize: "32px"}}>{count} CAW</Typography>
                </Box>
            </Box>
        </Grid>
    );
};
