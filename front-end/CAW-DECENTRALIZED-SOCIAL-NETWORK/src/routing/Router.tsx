import React, {useEffect, useMemo, useState} from "react";
import {Route, Routes} from "react-router-dom";
import {getPaths} from "../utils/routing";
import {Header} from "../components/layout/Header";
import {AnimatePresence} from "framer-motion";
import {Box, createTheme, CssBaseline, Grid, ThemeProvider} from "@mui/material";
import {krmrBreakpoints, krmrPlateDark, krmrPlateLight, theme} from "../styles/theme";
import {LeftBar} from "../components/layout/LeftBar";
import {load, remove, save} from "../utils/storage";
import {HomeScreen, TestScreen} from "../screens";
import {BottomBar} from "../components/layout/BottomBar";
import {NotificationScreen} from "../screens/notifications/notifications-screen";
import {ExploreScreen} from "../screens/explore/explore-screen";
import {SettingsScreen} from "../screens/settings/settings-screen";
import {CyrptoCenterScreen} from "../screens/cyrpto-center/cyrpto-center-screen";
import {CawDirectScreen} from "../screens/caw-direct/caw-direct-screen";
import {ProfileScreen} from "../screens/profile/profile-screen";
import 'animate.css';
import {ACCOUNT, TAGS} from "../config/customData";
import Moralis from "moralis";
import {EvmChain} from "@moralisweb3/common-evm-utils";
import axios from "axios";
import {useAccount} from "wagmi";

export const paths = getPaths();

function Main() {

    const strogeMode = load("mode");
    const [mode, setMode] = useState<'light' | 'dark'>(strogeMode ?? 'light');
    const [bottomMenuValue, setbottomMenuValue] = React.useState('recents');
    const [trendTagData, setTrendTagData] = useState<any>();
    const [trendAccountData, setTrendAccountData] = useState<any>();
    const krmrPlate = mode === "dark" ? {...krmrPlateDark} : {...krmrPlateLight};
    const {address: account} = useAccount();


    // modal
    const [mintModalOpenn, setMintModalOpenn] = React.useState(false);
    const handleModalOpen = () => setMintModalOpenn(true);
    const handleModalClose = () => setMintModalOpenn(false);


    const bottomChange = (event: React.SyntheticEvent, newValue: string) => {
        setbottomMenuValue(newValue);
    };


    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );


    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    // @ts-ignore
                    krmrPlate,
                    // @ts-ignore
                    krmrBreakpoints,
                    ...(mode === 'dark' && {
                        background: {
                            default: "#14213D",
                        },
                    }),
                },
            }),
        [mode],
    );


    useEffect(() => {
        save("mode", mode)
    }, [mode])

    useEffect(() => {
        setTimeout(() => setTrendTagData(TAGS), 2000)
        setTimeout(() => setTrendAccountData(ACCOUNT), 2000)
    }, [])

    useEffect(() => {

        remove("access_token")

    }, [account])


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>

            <Box display={"flex"} justifyContent={"center"}>
                <Header handleModalOpen={handleModalOpen} colorMode={colorMode} theme={theme}/>
                <Grid maxWidth={"lg"} container>
                    <Grid item lg={2.2} md={2.2} sm={12} xs={12} sx={(theme) => (
                        {
                            [theme.breakpoints.down('md')]: {
                                display: "none",
                            },
                        }
                    )}>
                        <LeftBar handleModalOpen={handleModalOpen} handleModalClose={handleModalClose}
                                 mintModalOpenn={mintModalOpenn} theme={theme}/>
                    </Grid>
                    <Grid item lg={9.8} md={9.8} sm={12} xs={12}>
                        <AnimatePresence exitBeforeEnter>
                            <Routes>
                                <Route path="/"
                                       element={<HomeScreen trendData={trendTagData} accountData={trendAccountData}/>}/>
                                <Route path="/notifications" element={<NotificationScreen/>}/>
                                <Route path="/explore" element={<ExploreScreen trendData={trendTagData}
                                                                               accountData={trendAccountData}/>}/>
                                <Route path="/settings" element={<SettingsScreen/>}/>
                                <Route path="/settings/:id" element={<SettingsScreen/>}/>
                                <Route path="/crypto-center" element={<CyrptoCenterScreen trendData={trendTagData}
                                                                                          accountData={trendAccountData}/>}/>
                                <Route path="/caw-direct" element={<CawDirectScreen/>}/>
                                <Route path="/profile" element={<ProfileScreen trendData={trendTagData}
                                                                               accountData={trendAccountData}/>}/>
                                <Route path="/test" element={<TestScreen/>}/>
                            </Routes>
                        </AnimatePresence>
                    </Grid>
                    <Box sx={(theme) => (
                        {
                            display: "none",
                            [theme.breakpoints.down('md')]: {
                                display: "block",
                                position: "fixed", bottom: 0, width: "100%",
                            },
                        }
                    )}>
                        <BottomBar theme={theme} bottomMenuValue={bottomMenuValue} bottomChange={bottomChange}/>
                    </Box>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}

export default Main;
