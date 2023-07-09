import React, {useEffect, useState} from 'react';
import {custom_3, POST_DATA, TAGS} from "../../config/customData";
import {IPOSTDATA} from "../../services/types";
import {Post} from "../../components/layout/Post";
import {Box, Grid} from "@mui/material";
import {RightBar} from "../../components/layout/RightBar";
import {CAW} from "../../components/layout/caw";
import {LoadPost} from "../../components/layout/Loader/LoadPost";
import {TrendCard} from "../../components/layout/RightBar/TrendCard";
import {SearchInput} from "../../components/SearchInput";

const MAIN = {
    animation: "fadeInUpBig",
    animationDuration: "1s"
}

const SWIPPER = {
    p: 2.5,
    pt: "25px",
    fontFamily: "Karla",
}

export const ExploreScreen = ({trendData, accountData}: { trendData: any, accountData?: any }) => {

    const [data, setData] = useState<any[]>()
    const [trendTagData, setTrendTagData] = useState<any[]>()

    useEffect(() => {
        setTimeout(() => setData(POST_DATA), 2000)
        setTimeout(() => setTrendTagData(TAGS), 2000)
    }, [])

    return (
        <Box sx={MAIN}>
            <CAW/>
            <Box sx={{pt: "40px"}}>
                <Box sx={(theme) => (
                    {
                        display:"none",
                        [theme.breakpoints.down('md')]: {
                            display: "block",
                            px: 2,
                            pt: "40px"
                        },
                    }
                )}>
                    <SearchInput location={"drawer"}/>
                </Box>
                <Box sx={SWIPPER}>
                    <Box sx={(theme) => (
                        {
                            display: "none",
                            [theme.breakpoints.down('md')]: {
                                display: "block",
                            },
                        }
                    )}>
                        <TrendCard data={trendTagData}/>
                    </Box>
                </Box>
                <Grid container spacing={0}>
                    <Grid sx={{px: 2.5, marginBottom: "85px"}} item lg={8} md={8} sm={12} xs={12}>
                        {
                            data ?
                                data.map((data: IPOSTDATA, count: number) => {
                                    return <Post key={count} data={data}/>
                                })
                                :
                                custom_3.map(() => <LoadPost/>)
                        }

                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12} sx={(theme) => (
                        {
                            [theme.breakpoints.down('md')]: {
                                display: "none",
                            },
                        }
                    )}>
                        <RightBar trendData={trendData} accountData={accountData}/>
                    </Grid>

                </Grid>
            </Box>
        </Box>

    );
};
