import React from 'react';
import {Box, Grid, Typography} from "@mui/material";

const CARD_MODEL_1 = {
    backgroundColor: "#F9C336",
    width: "100%",
    height: "150px",
    borderRadius: "18px",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    animation: "bounce",
    color: "#14213D",
}

const ICON = {
    fontSize: "22px"
}

const TEXT = {
    fontFamily: "Karla",
}
export const StatisticsCardOne = ({icon, title, count, price}: { icon: string, title: string, count: number, price?:boolean }) => {

    const splitTitle = title.split(" ");
    console.log(splitTitle)
    return (
        <Grid sx={{p: 2}} display={"flex"} justifyContent={"center"} item lg={4} md={4} sm={12} xs={12}>
            <Box sx={CARD_MODEL_1}>
                <Box>
                    <i style={ICON} className={icon}></i>
                    <Typography sx={{...TEXT, fontSize: "32px"}}>{count}</Typography>
                    <Typography sx={{...TEXT, fontWeight: "900", fontSize: "17px"}}>
                        {
                            price &&
                          <>
                              {price && splitTitle[0]}
                            <br/>
                              {price && splitTitle[1]}
                          </>
                        }
                        {
                            price ?? title
                        }
                    </Typography>
                </Box>
            </Box>
        </Grid>
    );
};
