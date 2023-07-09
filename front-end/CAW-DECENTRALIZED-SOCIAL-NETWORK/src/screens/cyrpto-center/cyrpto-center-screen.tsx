import React, {useEffect, useState} from 'react';
import {BOOKMARKS_DATA} from "../../config/customData";
import {Box, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {CAW} from "../../components/layout/caw";
import {Chart} from "../../components/layout/Chart";

const MAIN = {
    animation: "fadeInUpBig",
    animationDuration: "1s",
    px: 2,
    marginBottom: "50px"
}

const BOX = {
    width: "100%",
    borderRadius: "20px",
    marginTop: "25px",
    position: "relative",
    backgroundColor: "krmrPlate.postContainer",
    pt: 1
}

const IMAGE = {
    width: "100%",
    borderRadius: "20px",
}

const TEXT = {
    cursor: "pointer"
}

export const CyrptoCenterScreen = ({trendData, accountData}: { trendData: any, accountData?: any }) => {

    const [data, setData] = useState<any[]>()

    useEffect(() => {
        setTimeout(() => setData(BOOKMARKS_DATA), 2000)
    }, [])


    return (
        <Box sx={MAIN}>
            <CAW/>
            <Box sx={{px: 2.5, pt: "75px"}}>
                <Typography sx={{
                    fontSize: "28px",
                    fontFamily: "Karla",
                    fontWeight: "bold",
                    color: "#F9C336"
                }}>Crypto Center</Typography>
            </Box>
            <Box sx={{pt: 1}}>
                <Chart/>
            </Box>
            <Box sx={{...BOX}}>
                <Grid sx={{pb: 2, px: 2}} spacing={2} container>
                    <Grid item alignItems={"center"} lg={3} md={3} sm={12} xs={12}>
                        <Box sx={{...IMAGE, ...TEXT}} component={"img"} src={"/data/CAW-758x426.jpg"}/>
                    </Grid>
                    <Grid item display={"grid"} alignItems={"center"} lg={9} md={9} sm={12} xs={12}>
                        <Typography sx={TEXT} component={"h2"} variant={"h5"}>A Hunters Dream (CAW) token was recently
                            listed on 8 exchanges in total.</Typography>
                        <Typography component={"h2"} sx={{...TEXT, fontSize: "15px"}}>
                            {"There is currently no official social channel and official website " +
                                "behind the project. There are also various rumors on Twitter " +
                                "that the project was created by the same people who were behind " +
                                "the success of the Shiba Inu (SHIB). The meaning of Hunter on social " +
                                "media is also said to be the name of the founder of the Ryoshi (SHIB) " +
                                "cryptocurrency in Japanese."}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{...BOX}}>
                <Grid sx={{pb: 2, px: 2}} spacing={2} container>
                    <Grid item alignItems={"center"} lg={3} md={3} sm={12} xs={12}>
                        <Box sx={{...IMAGE, ...TEXT}} component={"img"} src={"/data/LYNXMPEDB603J_L.jpg"}/>
                    </Grid>
                    <Grid item display={"grid"} alignItems={"center"} lg={9} md={9} sm={12} xs={12}>
                        <Typography sx={TEXT} component={"h2"} variant={"h5"}>Bitcoin’s correlation with S&P 500 falls
                            to a 2-year low.</Typography>
                        <Typography component={"h2"} sx={{...TEXT, fontSize: "15px"}}>
                            {"According to Coin Metrics’ State of the Network report for Q2 2023, " +
                                "there has been a notable reduction in the 90-day " +
                                "correlation between the cryptocurrency market and equities " +
                                "represented by the S&P 500 index. This marks a deviation from " +
                                "the trend observed in 2022. In H1 2023, bitcoin rose 82%, ranking " +
                                "it third in terms of growth among assets with a market capitalization exceeding $1 billion."}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
