import React, {useEffect, useState} from 'react';
import {Box, Grid} from "@mui/material";
import {Settings} from "../../components/layout/Settings";
import {Settings1} from "../../components/layout/Settings/Settings1";
import {Settings2} from "../../components/layout/Settings/Settings2";
import {Settings3} from "../../components/layout/Settings/Settings3";
import {Settings4} from '../../components/layout/Settings/Settings4';
import {Settings5} from "../../components/layout/Settings/Settings5";
import {Settings6} from "../../components/layout/Settings/Settings6";
import {isActiveSettings} from "../../services/functions";
import {CAW} from "../../components/layout/caw";
import {Settings7} from "../../components/layout/Settings/Settings7";
import {useLocation} from "react-router-dom";

const MAIN = {
    animation: "fadeInUpBig",
    animationDuration: "1s"
}

const SETTING_TOP_BAR = {
    height: "35px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom:"15px"
}

const BACK = {
    width:"35px",
    height:"35px",
    display:"flex",
    justifyContent:"center",
    borderRadius:"100px",
    alignItems:"center",
    fontSize:"20px",
    backgroundColor:"#F9C336",
    color:"#14213D",
    cursor:"pointer"
}

export const SettingsScreen = () => {

    const location = useLocation();
    const key = location.pathname.split("/")?.[2] ?? "";
    const [active, setActive] = useState(key);
    const [hiddenAllSettings, setHiddenAllSettings] = useState("block");
    const [hiddenSettings, setHiddenSettings] = useState("none");

    const ActivePage = () => {
        if (active === "settings-1") {
            return <Settings1/>
        }

        if (active === "settings-2") {
            return <Settings2/>
        }

        if (active === "settings-3") {
            return <Settings3/>
        }

        if (active === "settings-4") {
            return <Settings4/>
        }

        if (active === "settings-5") {
            return <Settings5/>
        }

        if (active === "settings-6") {
            return <Settings6/>
        }

        if (active === "settings-7") {
            return <Settings7/>
        }

        return <></>
    }

    const isActive = isActiveSettings(active);



    useEffect(() => {
        if (isActive === "active") {
            setHiddenAllSettings("none");
        } else {
            setHiddenAllSettings("block")
        }
    }, [isActive])

    useEffect(() => {
        if (isActive === "active") {
            setHiddenSettings("block");
        } else {
            setHiddenSettings("none")
        }
    }, [hiddenAllSettings])


    return (
        <Box sx={MAIN}>
            <CAW/>
            <Grid sx={{pt:"45px"}} container spacing={0}>
                <Grid sx={(theme) => (
                    {
                        p: 2.5, pt: "33px", pl: "25px", marginBottom: "85px",
                        [theme.breakpoints.down('md')]: {
                            display: hiddenAllSettings,
                        },
                    }
                )} item lg={6} md={6} sm={12} xs={12}>
                    <Settings active={active} setActive={setActive} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={(theme) => (
                    {
                        borderLeft: "1px solid #00000014",
                        p: 2.5, pt: "33px", pl: "25px",
                        height:"93vh",
                        [theme.breakpoints.down('md')]: {
                            display: hiddenSettings,
                        },
                    }
                )}>
                    {isActive === "active" &&
											<Box sx={SETTING_TOP_BAR}>
												<Box onClick={() => setActive("")} sx={BACK} component={"i"} className={"fa-solid fa-xmark"}></Box>
											</Box>
                    }
                    <ActivePage/>
                </Grid>

            </Grid>

        </Box>)
};
