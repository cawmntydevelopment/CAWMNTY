import {Box, Grid, Typography} from '@mui/material';
import React, {useRef} from 'react';
import {StatisticsCardOne} from "./Notifications/StatisticsCardOne";
import {StatisticsCardTwo} from "./Notifications/StatisticsCardTwo";

const MINI_TITLE = {ml: 1.8, fontSize: "17px", fontWeight: "bold"}

export const Statistics = () => {


    return (
        <Box>
            <Box sx={{pt: "33px"}}>
                <Typography sx={MINI_TITLE}>Content Statistics</Typography>
                <Grid container>
                    <StatisticsCardOne icon={"fa-solid fa-heart"} price={true} title={"Total Likes"} count={26.6}/>
                    <StatisticsCardOne icon={"fa-solid fa-retweet"} price={true} title={"Total ReCAWs"} count={1552}/>
                    <StatisticsCardOne icon={"fa-solid fa-comment"} price={true} title={"Total Comments"} count={816}/>
                </Grid>
            </Box>

            <Box sx={{marginTop: "24px"}}>
                <Typography sx={MINI_TITLE}>Earnings Reports</Typography>
                <Grid container>
                    <StatisticsCardTwo title={"Daily Earned"} count={16204754} col={6}/>
                    <StatisticsCardTwo title={"Earned Monthly"} count={83958323} col={6}/>
                    <StatisticsCardTwo title={"Annual Earned"} count={108394823} col={12}/>
                </Grid>
            </Box>

            <Box sx={{marginTop: "24px", marginBottom:"33px"}}>
                <Typography sx={MINI_TITLE}>Spending Reports</Typography>
                <Grid container>
                    <StatisticsCardTwo title={"Daily Spent"} count={14829456} col={6}/>
                    <StatisticsCardTwo title={"Monthly Spent"} count={73294503} col={6}/>
                    <StatisticsCardTwo title={"Annual Spent"} count={903491543} col={12}/>
                </Grid>
            </Box>

        </Box>
    );
};

