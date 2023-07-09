import React, {useEffect, useState} from "react";
import MainLayout from "../../layouts/MainLayout";
import {observer} from "mobx-react-lite";
import {Button, Grid, Typography, Box, Paper, Modal} from "@mui/material";
import {Notifications} from "../../components/layout/Notifications";
import {Statistics} from "../../components/layout/Statistics";
import {CAW} from "../../components/layout/caw";

const MAIN = {
    animation: "fadeInUpBig",
    animationDuration: "1s"
}

const BUTTON = {
    fontFamily: "Karla",
    fontSize: "23px",
    background: "none",
    border: "none",
    color:"#979797",
    fontWeight: "bold"
}

const ACTIVE = {
    color: "#F9C336",
}

export const NotificationScreen = observer(() => {

    const [hiddenNotifications, setHiddenNotifications] = useState<"none" | "block">("block")
    const [hiddenStatic, setHiddenStatic] = useState<"none" | "block">("none")


    useEffect(() => {
        setHiddenStatic(hiddenNotifications === "none" ? "block" : "none")
    }, [hiddenNotifications])

    return (
        <Box sx={MAIN}>
            <CAW/>
            <Box sx={{pt: "45px"}}>
                <Box sx={(theme) => (
                    {
                        display: "none",
                        [theme.breakpoints.down('md')]: {
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            marginTop: "25px"
                        },
                    }
                )}>
                    <Box component={"button"} sx={
                        hiddenNotifications === "block" ? {...BUTTON, ...ACTIVE} : {...BUTTON}
                    } onClick={() => setHiddenNotifications("block")}>Notifications</Box>

                    <Box component={"button"} sx={
                        hiddenNotifications === "none" ? {...BUTTON, ...ACTIVE} : {...BUTTON}
                    } onClick={() => setHiddenNotifications("none")}>Statistics</Box>

                </Box>
                <Grid container spacing={0}>
                    <Grid sx={(theme) => (
                        {
                            pt: "33px", pl: "25px",pr: "25px", marginBottom: "85px",
                            [theme.breakpoints.down('md')]: {
                                display: hiddenNotifications,
                            },
                        }
                    )} item lg={6} md={6} sm={12} xs={12}>
                        <Notifications/>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={(theme) => (
                        {
                            borderLeft: "1px solid #00000014",

                            // animation-duration: 2s;
                            [theme.breakpoints.down('md')]: {
                                display: hiddenStatic,
                            },
                        }
                    )}>
                        <Statistics/>
                    </Grid>

                </Grid>

            </Box>
        </Box>

    )
});
