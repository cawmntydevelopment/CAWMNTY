import React from 'react';
import {Box} from "@mui/material";
import {TrendCard} from "./RightBar/TrendCard";
import {AccountCard} from "./RightBar/AccountCard";
import {Footer} from "./RightBar/Footer";

const BOX = {
    p: 2.5
}

export const RightBar = ({trendData,accountData} : {trendData?:any,accountData?:any}) => {
    return (
        <Box sx={BOX}>
            <TrendCard data={trendData}/>
            <AccountCard data={accountData}/>
            <Footer/>
        </Box>
    );
};
